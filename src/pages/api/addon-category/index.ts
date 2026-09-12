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

  if (method === HttpMethod.post) {
    const { name, menuIds, isRequired } = req.body;

    if (!name || !menuIds.length) {
      return res.status(400).json({ msg: "Bad Request" });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(400).json({ msg: "Bad Request" });
    const user = session.user;
    const email = user?.email as string;
    const dbUser = await prisma.user.findUnique({ where: { email } });
    if (dbUser) {
      const newAddonCategory = await prisma.addonCategory.create({
        data: { name, isRequired },
      });
      const newMenuAddonCategories = await prisma.$transaction(
        menuIds.map((menuId: number) =>
          prisma.menuAddonCategory.create({
            data: { menuId, addonCategoryId: newAddonCategory.id },
          }),
        ),
      );
      return res.status(200).json({
        msg: "Addon Created",
        data: { addonCategory: newAddonCategory, menuAddonCategories: newMenuAddonCategories },
      });
    }
    return res.status(401).json({ msg: "Unauthorized" });
  }
  res.status(405).json({ msg: "Invalid Method" });
};

export default handler;
