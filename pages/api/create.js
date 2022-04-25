import { prisma } from "../../lib/prisma";
async function handler(req, res) {
  if (req.method == "POST") {
    const { title, location, description, date } = req.body;

    const editDate = new Date(date).toISOString();
    const event = await prisma.event.create({
      data: { date: editDate, description, title, location },
    });
    console.log(event);
    return res.status(201).json(event);
  }
  res.end();
}

export default handler;
