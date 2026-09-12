// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Menu, MenuCategoryMenu } from "../../../../generated/prisma/client";
import { authOptions } from "../auth/[...nextauth]";

type ReturnData = {
  msg: string;
  data?: { menu: Menu; menuCategoryMenus: MenuCategoryMenu[] };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ReturnData>) => {
  const method = req.method;

  if (method === HttpMethod.post) {
    const { name, price, description, assetUrl, menuCategoryIds } = req.body;

    if (!name || !menuCategoryIds.length) {
      return res.status(400).json({ msg: "Bad Request" });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(400).json({ msg: "Bad Request" });
    const user = session.user;
    const email = user?.email as string;
    const dbUser = await prisma.user.findUnique({ where: { email } });
    if (dbUser) {
      const newMenu = await prisma.menu.create({
        data: { name, price, description, assetUrl },
      });
      const newMenuCategoryMenus = await prisma.$transaction(
        menuCategoryIds.map((menuCategoryId: number) =>
          prisma.menuCategoryMenu.create({
            data: { menuCategoryId, menuId: newMenu.id },
          }),
        ),
      );

      return res.status(200).json({
        msg: "Menu Created",
        data: { menu: newMenu, menuCategoryMenus: newMenuCategoryMenus },
      });
    }
    return res.status(401).json({ msg: "Unauthorized" });
  }
  res.status(405).json({ msg: "Invalid Method" });
};

export default handler;
