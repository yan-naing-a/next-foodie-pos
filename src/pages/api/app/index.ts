// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import {
  Addon,
  AddonCategory,
  Company,
  Location,
  Menu,
  MenuAddonCategory,
  MenuCategory,
  MenuCategoryMenu,
  Table,
} from "../../../../generated/prisma/client";
import { authOptions } from "../auth/[...nextauth]";

type ReturnData = {
  msg: string;
  data?: {
    companies: Company[];
    locations: Location[];
    tables: Table[];
    menuCategories: MenuCategory[];
    menus: Menu[];
    menuCategoryMenus: MenuCategoryMenu[];
    addonCategories: AddonCategory[];
    menuAddonCategories: MenuAddonCategory[];
    addons: Addon[];
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ReturnData>) => {
  const method = req.method;

  if (method === HttpMethod.get) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(400).json({ msg: "Bad Request" });
    const user = session.user;
    const name = user?.name as string;
    const email = user?.email as string;
    const image = user?.image as string;

    const dbUser = await prisma.user.findUnique({ where: { email } });
    if (!dbUser) {
      //1. create new company
      const newCompanyName = "Ah Wa-sarr";
      const newCompanyAddress = "No. 1, Strand Road, Kyauktada Township, Yangon, Myanmar";
      const newCompany = await prisma.company.create({
        data: { name: newCompanyName, address: newCompanyAddress },
      });
      //2. create new user
      await prisma.user.create({
        data: { name, email, assetUrl: image, companyId: newCompany.id },
      });
      //3. create new location
      const newLocationName = "Ah Wa-sarr 1";
      const newLocationAddress = "No. 1, Strand Road, Kyauktada Township, Yangon, Myanmar";
      const newLocation = await prisma.location.create({
        data: { name: newLocationName, address: newLocationAddress, companyId: newCompany.id },
      });
      //4. create new table
      const newTableName = "Table 1";
      const newTable = await prisma.table.create({
        data: { name: newTableName, locationId: newLocation.id },
      });
      //5. create new menuCategory
      const newMenuCategoryName = "Default Menu Category";
      const newMenuCategory = await prisma.menuCategory.create({
        data: { name: newMenuCategoryName, companyId: newCompany.id },
      });
      //6. create new menu
      const newMenuName = "Default Menu";
      const newMenuPrice = 1000;
      const newMenu = await prisma.menu.create({
        data: { name: newMenuName, price: newMenuPrice },
      });
      //7. create join table menuCategoryMenu
      const newMenuCategoryMenu = await prisma.menuCategoryMenu.create({
        data: { menuCategoryId: newMenuCategory.id, menuId: newMenu.id },
      });
      //8. create new addonCategory
      const newAddonCategoryName = "Default Addon Category";
      const newAddonCategory = await prisma.addonCategory.create({
        data: { name: newAddonCategoryName },
      });
      //9. create join table menuAddonCategory
      const newMenuAddonCategory = await prisma.menuAddonCategory.create({
        data: { menuId: newMenu.id, addonCategoryId: newAddonCategory.id },
      });
      //10. create new addon
      const defaultAddons = [
        { name: "Addon one", price: 0, addonCategoryId: newAddonCategory.id },
        { name: "Addon two", price: 0, addonCategoryId: newAddonCategory.id },
        { name: "Addon three", price: 0, addonCategoryId: newAddonCategory.id },
      ];
      const newAddons = await prisma.$transaction(
        defaultAddons.map((addon) => prisma.addon.create({ data: addon })),
      );
      return res.status(200).json({
        msg: "Success",
        data: {
          companies: [newCompany],
          locations: [newLocation],
          tables: [newTable],
          menuCategories: [newMenuCategory],
          menus: [newMenu],
          menuCategoryMenus: [newMenuCategoryMenu],
          addonCategories: [newAddonCategory],
          menuAddonCategories: [newMenuAddonCategory],
          addons: [...newAddons],
        },
      });
    } else {
      //1. company
      const company = await prisma.company.findFirst({ where: { id: dbUser.companyId } });
      if (!company) {
        return res.status(400).json({ msg: "Bad Request" });
      }
      //2. location
      const locations = await prisma.location.findMany({ where: { companyId: company.id } });
      const locationIds = locations.map((location) => location.id);
      //3. table
      const tables = await prisma.table.findMany({ where: { locationId: { in: locationIds } } });
      //4. menuCategory
      const menuCategories = await prisma.menuCategory.findMany({
        where: { companyId: company.id },
      });
      const menuCategoryIds = menuCategories.map((menuCategory) => menuCategory.id);
      //5. menuCategoryMenu
      const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
        where: { menuCategoryId: { in: menuCategoryIds } },
      });
      const menuIds = menuCategoryMenus.map((menuCategoryMenu) => menuCategoryMenu.menuId);
      //5. menu
      const menus = await prisma.menu.findMany({ where: { id: { in: menuIds } } });
      //6. menuAddonCategory
      const menuAddonCategories = await prisma.menuAddonCategory.findMany({
        where: { menuId: { in: menuIds } },
      });
      const addonCategoryIds = menuAddonCategories.map((MenuAddonCategory) => MenuAddonCategory.id);
      //7. addonCategory
      const addonCategories = await prisma.addonCategory.findMany({
        where: { id: { in: addonCategoryIds } },
      });
      //8. addon
      const addons = await prisma.addon.findMany({
        where: { addonCategoryId: { in: addonCategoryIds } },
      });
      return res.status(200).json({
        msg: "Success",
        data: {
          companies: [company],
          locations,
          tables,
          menuCategories,
          menus,
          menuCategoryMenus,
          addonCategories,
          menuAddonCategories,
          addons,
        },
      });
    }
  }
  res.status(405).json({ msg: "Invalid Method" });
};

export default handler;
