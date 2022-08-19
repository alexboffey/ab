import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();
const port = process.env.port || 4444;

app.get("/", async (_, res) => {
  res.json({ hey: "there" });
});

app.get("/pokemon", async (_, res) => {
  const data = await prisma.pokemon.findMany()

  res.json({ data });
});

app.get("/pokemon/:id", async (req, res) => {
  const data = await prisma.pokemon.findFirst({
    where: { id: parseInt(req.params.id, 10) },
  });

  res.json({ data });
});

app.get("/types", async (_, res) => {
  const data = await prisma.type.findMany()

  res.json({ data });
});

app.get("/users", async (_, res) => {
  const [users] = await Promise.all([prisma.user.findMany()]);

  res.json({ users });
});

app.listen(process.env.PORT, () =>
  console.log(`API 🏃‍♂️ http://localhost:${port}`)
);
