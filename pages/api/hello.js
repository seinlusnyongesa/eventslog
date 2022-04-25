// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "../../lib/prisma";

async function handler(req, res) {
  const id = parseInt(req.body);
  if ((req.method = "DELETE")) {
    const del = await prisma.event.delete({ where: { id } });
    return res.status(201).json(del);
  }
  res.end();
}
export default handler;
