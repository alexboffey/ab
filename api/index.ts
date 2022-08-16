import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();
const port = process.env.port || 4444;

app.get("/", async (_, res) => {
  res.json({ hey: "there" });
});

app.get("/pokemon", () => {});

app.get("/users", async (_, res) => {
  const [users] = await Promise.all([prisma.user.findMany()]);

  res.json({ users });
});

app.get("/posts", async (_, res) => {
  const [posts] = await Promise.all([prisma.post.findMany()]);

  res.json({ posts });
});

app.listen(process.env.PORT, () =>
  console.log(`API 🏃‍♂️ http://localhost:${port}`)
);
