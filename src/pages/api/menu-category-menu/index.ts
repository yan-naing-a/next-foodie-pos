// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { MenuCategoryMenu } from "../../../../generated/prisma/client";
import { authOptions } from "../auth/[...nextauth]";

type ReturnData = {
  msg: string;
  data?: MenuCategoryMenu[];
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
      const { items } = req.body;
      console.log(items);
      if (!items.length) return res.status(400).json({ msg: "Bad Request" });

      const newMenuCategoryMenus = await prisma.$transaction(
        items.map((item: { menuId: number; menuCategoryId: number }) =>
          prisma.menuCategoryMenu.create({
            data: { menuCategoryId: item.menuCategoryId, menuId: item.menuId },
          }),
        ),
      );
      return res.status(200).json({
        msg: "Update menu category menu successfully",
        data: newMenuCategoryMenus,
      });
    }
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  res.status(405).json({ msg: "Invalid Method" });
};

export default handler;
