import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();

app.get("/users", async (_, res) => {
  const [users] = await Promise.all([prisma.user.findMany()]);

  res.send({ users });
});

app.get("/posts", async (_, res) => {
  const [posts] = await Promise.all([prisma.post.findMany()]);

  res.send({ posts });
});

app.listen(process.env.PORT, () =>
  console.log(`🏃‍♂️ http://localhost:${process.env.PORT}`)
);
