// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { HttpMethod } from "@/types/backend/httpMethod";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Location } from "../../../../generated/prisma/client";
import { authOptions } from "../auth/[...nextauth]";

type ReturnData = {
  msg: string;
  data?: Location;
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
      const { name, address } = req.body;

      if (!name || !address) return res.status(400).json({ msg: "Bad Request" });
      const newLocation = await prisma.location.create({
        data: { name, address, companyId: dbUser.companyId },
      });
      return res.status(200).json({ msg: "Location Created", data: newLocation });
    }
    // PUT //
    if (method === HttpMethod.put) {
      const { id } = req.query;
      const { name, address } = req.body;

      if (!id || !name || !address) return res.status(400).json({ msg: "Bad Request" });
      const validLocation = await prisma.location.findUnique({ where: { id: Number(id) } });
      if (!validLocation) return res.status(404).json({ msg: "Location Not Found" });

      const updatedLocation = await prisma.location.update({
        where: { id: Number(id) },
        data: { name, address, companyId: dbUser.companyId },
      });
      return res.status(200).json({ msg: "Location Updated", data: updatedLocation });
    }
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  res.status(405).json({ msg: "Invalid Method" });
};

export default handler;
