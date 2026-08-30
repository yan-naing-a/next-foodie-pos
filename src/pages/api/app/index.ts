// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { User } from "../../../../generated/prisma/client";
import { authOptions } from "../auth/[...nextauth]";

type ReturnData = {
  msg: string;
  data?: User;
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
      const newUser = await prisma.user.create({ data: { name, email, assetUrl: image } });
      return res.status(200).json({ msg: "Success", data: newUser });
    } else {
      return res.status(200).json({ msg: "Success", data: dbUser });
    }
  }
  res.status(405).json({ msg: "Invalid Method" });
};

export default handler;
