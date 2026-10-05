// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { MenuCategory, MenuCategoryMenu } from "../../../../generated/prisma/client";
import { authOptions } from "../auth/[...nextauth]";

type ReturnData = {
  msg: string;
  data?: { menuCategory: MenuCategory; menuCategoryMenus: MenuCategoryMenu[] };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ReturnData>) => {
  const method = req.method;

  //authenticate user
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(400).json({ msg: "Bad Request" });
  const user = session.user;
  const email = user?.email as string;
  const dbUser = await prisma.user.findUnique({ where: { email } });

  if (dbUser) {
    // POST //
    if (method === HttpMethod.post) {
      const { name, menuIds } = req.body;
      if (!name) return res.status(400).json({ msg: "Bad Request" });

      const newMenuCategory = await prisma.menuCategory.create({
        data: { name, companyId: dbUser.companyId },
      });
      //menuIds is optional
      let newMenuCategoryMenus: MenuCategoryMenu[] = [];
      if (menuIds.length) {
        newMenuCategoryMenus = await prisma.$transaction(
          menuIds.map((menuId: number) =>
            prisma.menuCategoryMenu.create({
              data: { menuCategoryId: newMenuCategory.id, menuId },
            }),
          ),
        );
      }
      return res.status(200).json({
        msg: "Menu Created",
        data: { menuCategory: newMenuCategory, menuCategoryMenus: newMenuCategoryMenus },
      });
    }
    // PUT //
    else if (method === HttpMethod.put) {
      const { id } = req.query;
      const { name, menuIds: clientMenuIds } = req.body;

      const validMenuCategory = await prisma.menuCategory.findFirst({ where: { id: Number(id) } });
      if (!validMenuCategory) return res.status(404).json({ msg: "Menu Category not found" });

      if (!name) return res.status(400).json({ msg: "Bad Request" });
      const updatedMenuCategory = await prisma.menuCategory.update({
        where: { id: Number(id) },
        data: { name },
      });
      //menuIds is optional
      let updatedMenuCategoryMenus: MenuCategoryMenu[] = [];
      if (clientMenuIds.length) {
        const dbMenuCategoryMenus = await prisma.menuCategoryMenu.findMany({
          where: { menuCategoryId: Number(id) },
        });
        const dbMenuIds = dbMenuCategoryMenus.map((menuCategoryMenu) => menuCategoryMenu.menuId);
        const sameMenuIds =
          dbMenuIds.length === clientMenuIds.length &&
          dbMenuIds.sort().every((value, index) => value === clientMenuIds.sort()[index]);
        if (sameMenuIds) {
          updatedMenuCategoryMenus = dbMenuCategoryMenus;
        } else {
          const menuIdsToDelete = dbMenuIds.filter((menuId) => !clientMenuIds.includes(menuId));
          const menuIdsToAdd: number[] = clientMenuIds.filter(
            (menuId: number) => !dbMenuIds.includes(menuId),
          );
          if (menuIdsToDelete.length) {
            // WARNING : this need to change isArchived as TRUE
            await prisma.menuCategoryMenu.deleteMany({
              where: { menuId: { in: menuIdsToDelete }, menuCategoryId: Number(id) },
            });
          }
          if (menuIdsToAdd.length) {
            await prisma.menuCategoryMenu.createMany({
              data: menuIdsToAdd.map((menuId) => ({ menuId, menuCategoryId: Number(id) })),
            });
          }
          updatedMenuCategoryMenus = await prisma.menuCategoryMenu.findMany({
            where: { menuCategoryId: Number(id) },
          });
        }
      } else {
        // WARNING : this need to change isArchived as TRUE
        await prisma.menuCategoryMenu.deleteMany({ where: { menuCategoryId: Number(id) } });
      }

      return res.status(200).json({
        msg: "Menu Updated",
        data: { menuCategory: updatedMenuCategory, menuCategoryMenus: updatedMenuCategoryMenus },
      });
    }
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  res.status(405).json({ msg: "Invalid Method" });
};

export default handler;
