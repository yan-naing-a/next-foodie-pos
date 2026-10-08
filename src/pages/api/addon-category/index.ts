// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { AddonCategory, MenuAddonCategory } from "../../../../generated/prisma/client";
import { authOptions } from "../auth/[...nextauth]";

type ReturnData = {
  msg: string;
  data?: { addonCategory: AddonCategory; menuAddonCategories: MenuAddonCategory[] };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ReturnData>) => {
  const method = req.method;

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(400).json({ msg: "Bad Request" });
  const user = session.user;
  const email = user?.email as string;
  const dbUser = await prisma.user.findUnique({ where: { email } });
  if (dbUser) {
    // POST //
    if (method === HttpMethod.post) {
      const { name, menuIds, isRequired } = req.body;

      if (!name || !menuIds.length) return res.status(400).json({ msg: "Bad Request" });
      // addon category
      const newAddonCategory = await prisma.addonCategory.create({ data: { name, isRequired } });

      // menu addon categories
      const newMenuAddonCategories = await prisma.$transaction(
        menuIds.map((menuId: number) =>
          prisma.menuAddonCategory.create({
            data: { menuId, addonCategoryId: newAddonCategory.id },
          }),
        ),
      );
      return res.status(200).json({
        msg: "Addon Category Created",
        data: { addonCategory: newAddonCategory, menuAddonCategories: newMenuAddonCategories },
      });
      return res.status(401).json({ msg: "Unauthorized" });
    }
    // PUT //
    else if (method === HttpMethod.put) {
      const { id } = req.query;
      const { name, menuIds: clientMenuIds, isRequired } = req.body;

      const validAddonCategory = await prisma.addonCategory.findFirst({
        where: { id: Number(id) },
      });
      if (!validAddonCategory) return res.status(404).json({ msg: "Addon Category not found" });

      if (!name || !clientMenuIds.length) return res.status(400).json({ msg: "Bad Request" });
      // update addon category
      const updatedAddonCategory = await prisma.addonCategory.update({
        where: { id: Number(id) },
        data: { name, isRequired },
      });
      // updated menu addon categories
      let updatedMenuAddonCategories: MenuAddonCategory[] = [];
      const dbMenuAddonCategories = await prisma.menuAddonCategory.findMany({
        where: { addonCategoryId: Number(id) },
      });
      const dbMenuIds = dbMenuAddonCategories.map((menuAddonCategory) => menuAddonCategory.menuId);
      const sameMenuIds =
        dbMenuIds.length === clientMenuIds.length &&
        dbMenuIds.sort().every((value, index) => value === clientMenuIds.sort()[index]);
      if (sameMenuIds) {
        updatedMenuAddonCategories = dbMenuAddonCategories;
      } else {
        const menuIdsToDelete = dbMenuIds.filter((menuId) => !clientMenuIds.includes(menuId));
        const menuIdsToAdd: number[] = clientMenuIds.filter(
          (menuId: number) => !dbMenuIds.includes(menuId),
        );
        if (menuIdsToDelete.length) {
          // WARNING : this need to change isArchived as TRUE
          await prisma.menuAddonCategory.deleteMany({
            where: { menuId: { in: menuIdsToDelete }, addonCategoryId: Number(id) },
          });
        }
        if (menuIdsToAdd.length) {
          await prisma.menuAddonCategory.createMany({
            data: menuIdsToAdd.map((menuId) => ({ menuId, addonCategoryId: Number(id) })),
          });
        }
        updatedMenuAddonCategories = await prisma.menuAddonCategory.findMany({
          where: { addonCategoryId: Number(id) },
        });
      }
      return res.status(200).json({
        msg: "Addon Category Updated",
        data: {
          addonCategory: updatedAddonCategory,
          menuAddonCategories: updatedMenuAddonCategories,
        },
      });
    }
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  res.status(405).json({ msg: "Invalid Method" });
};

export default handler;
