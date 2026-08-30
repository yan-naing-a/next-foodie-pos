// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { Menu } from "../../../../generated/prisma/client";

type ReturnData = {
  msg: string;
  data?: Menu[];
};

enum HttpMethod {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ReturnData>) => {
  const method = req.method;

  if (method === HttpMethod.get) {
    const menus = await prisma.menu.findMany();
    return res.status(200).json({ msg: "success", data: menus });
  }
  res.status(405).json({ msg: "Invalid Method" });
};

export default handler;
