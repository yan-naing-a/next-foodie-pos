// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Table } from "../../../../generated/prisma/client";
import { authOptions } from "../auth/[...nextauth]";

type ReturnData = {
  msg: string;
  data?: Table;
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
      const { name, locationId } = req.body;
      if (!name || !locationId) return res.status(400).json({ msg: "Bad Request" });
      const existingTable = await prisma.table.findFirst({ where: { name, locationId } });
      if (existingTable) return res.status(400).json({ msg: "Table already exists" });

      const newTable = await prisma.table.create({ data: { name, locationId } });
      return res.status(200).json({ msg: "Table Created", data: newTable });
    }
    // PUT //
    else if (method === HttpMethod.put) {
      const { id } = req.query;
      const { name, locationId } = req.body;
      const validTable = await prisma.table.findFirst({ where: { id: Number(id) } });
      if (!validTable) return res.status(404).json({ msg: "Table not found" });
      if (!name || !locationId) return res.status(400).json({ msg: "Bad Request" });

      const updatedTable = await prisma.table.update({
        where: { id: Number(id) },
        data: { name, locationId },
      });
      return res.status(200).json({ msg: "Table Updated", data: updatedTable });
    }
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  res.status(405).json({ msg: "Invalid Method" });
};

export default handler;
