// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Menu, MenuAddonCategory, MenuCategoryMenu } from "../../../../generated/prisma/client";
import { authOptions } from "../auth/[...nextauth]";

type ReturnData = {
  msg: string;
  data?: {
    menu: Menu;
    menuCategoryMenus: MenuCategoryMenu[];
    menuAddonCategories?: MenuAddonCategory[];
  };
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
      const { name, price, description, assetUrl, menuCategoryIds, addonCategoryIds } = req.body;
      if (!name || !menuCategoryIds.length) return res.status(400).json({ msg: "Bad Request" });

      const newMenu = await prisma.menu.create({ data: { name, price, description, assetUrl } });
      const newMenuCategoryMenus = await prisma.$transaction(
        menuCategoryIds.map((menuCategoryId: number) =>
          prisma.menuCategoryMenu.create({ data: { menuId: newMenu.id, menuCategoryId } }),
        ),
      );
      let newMenuAddonCategories: MenuAddonCategory[] = [];
      if (!!addonCategoryIds && addonCategoryIds.length) {
        newMenuAddonCategories = await prisma.$transaction(
          addonCategoryIds.map((addonCategoryId: number) =>
            prisma.menuAddonCategory.create({ data: { menuId: newMenu.id, addonCategoryId } }),
          ),
        );
      }
      return res.status(200).json({
        msg: "Menu Created",
        data: {
          menu: newMenu,
          menuCategoryMenus: newMenuCategoryMenus,
          menuAddonCategories: newMenuAddonCategories,
        },
      });
    }
    // PUT //
    else if (method === HttpMethod.put) {
      const { id } = req.query;
      const {
        name,
        price,
        description,
        assetUrl,
        menuCategoryIds: clientMenuCategoryIds,
        addonCategoryIds: clientAddonCategoryIds,
      } = req.body;
      if (!name || !clientMenuCategoryIds.length)
        return res.status(400).json({ msg: "Bad Request" });

      const validMenu = await prisma.menu.findFirst({ where: { id: Number(id) } });
      if (!validMenu) return res.status(404).json({ msg: "Menu not found" });

      // menu
      const updateMenu = await prisma.menu.update({
        where: { id: Number(id) },
        data: { name, price, description, assetUrl },
      });

      // menuCategoryMenus
      const dbMenuCategoryMenus = await prisma.menuCategoryMenu.findMany({
        where: { menuId: Number(id) },
      });
      const dbMenuCategoryIds = dbMenuCategoryMenus.map(
        (menuCategoryMenu) => menuCategoryMenu.menuCategoryId,
      );
      const sameMenuCategoryIds =
        dbMenuCategoryIds.length === clientMenuCategoryIds.length &&
        dbMenuCategoryIds
          .sort()
          .every((value, index) => value === clientMenuCategoryIds.sort()[index]);
      let updatedMenuCategoryMenus: MenuCategoryMenu[] = [];
      if (sameMenuCategoryIds) {
        updatedMenuCategoryMenus = dbMenuCategoryMenus;
      } else {
        const menuCategoryIdsToDelete = dbMenuCategoryIds.filter(
          (menuCategoryId) => !clientMenuCategoryIds.includes(menuCategoryId),
        );
        const menuCategoryIdsToAdd: number[] = clientMenuCategoryIds.filter(
          (menuCategoryId: number) => !dbMenuCategoryIds.includes(menuCategoryId),
        );
        if (menuCategoryIdsToDelete.length) {
          // WARNING : this need to change isArchived as TRUE
          await prisma.menuCategoryMenu.deleteMany({
            where: { menuCategoryId: { in: menuCategoryIdsToDelete }, menuId: Number(id) },
          });
        }
        if (menuCategoryIdsToAdd.length) {
          await prisma.menuCategoryMenu.createMany({
            data: menuCategoryIdsToAdd.map((menuCategoryId) => ({
              menuId: Number(id),
              menuCategoryId,
            })),
          });
        }
        updatedMenuCategoryMenus = await prisma.menuCategoryMenu.findMany({
          where: { menuId: Number(id) },
        });
      }
      // menuAddonCategories
      let updatedMenuAddonCategories: MenuAddonCategory[] = [];
      if (!!clientAddonCategoryIds && clientAddonCategoryIds.length) {
        const dbMenuAddonCategories = await prisma.menuAddonCategory.findMany({
          where: { menuId: Number(id) },
        });
        const dbAddonCategoryIds = dbMenuAddonCategories.map(
          (menuAddonCategory) => menuAddonCategory.addonCategoryId,
        );
        const sameAddonCategoryIds =
          dbAddonCategoryIds.length === clientAddonCategoryIds.length &&
          dbAddonCategoryIds
            .sort()
            .every((value, index) => value === clientAddonCategoryIds.sort()[index]);
        if (sameAddonCategoryIds) {
          updatedMenuAddonCategories = dbMenuAddonCategories;
        } else {
          const addonCategoryIdsToDelete = dbAddonCategoryIds.filter(
            (addonCategoryId) => !clientAddonCategoryIds.includes(addonCategoryId),
          );
          const addonCategoryIdsToAdd: number[] = clientAddonCategoryIds.filter(
            (addonCategoryId: number) => !dbAddonCategoryIds.includes(addonCategoryId),
          );
          if (addonCategoryIdsToDelete.length) {
            // WARNING : this need to change isArchived as TRUE
            await prisma.menuAddonCategory.deleteMany({
              where: { addonCategoryId: { in: addonCategoryIdsToDelete }, menuId: Number(id) },
            });
          }
          if (addonCategoryIdsToAdd.length) {
            await prisma.menuAddonCategory.createMany({
              data: addonCategoryIdsToAdd.map((addonCategoryId) => ({
                menuId: Number(id),
                addonCategoryId,
              })),
            });
          }
          updatedMenuAddonCategories = await prisma.menuAddonCategory.findMany({
            where: { menuId: Number(id) },
          });
        }
      }
      return res.status(200).json({
        msg: "Menu Updated",
        data: {
          menu: updateMenu,
          menuCategoryMenus: updatedMenuCategoryMenus,
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
