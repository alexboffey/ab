import { PrismaClient } from "@prisma/client";
import express from "express";
import { uniq } from "lodash";
// import { uniq } from "lodash";
import { pokemon } from "./data/mock";
// import { Type } from "./data/schema";

const app = express();
const prisma = new PrismaClient();
const port = process.env.port || 4444;

app.get("/", async (_, res) => {
  res.json({ hey: "there" });
});

app.get("/pokemon", (_, res) => {
  // console.log(pokemonData);
  res.json({ data: pokemon });
});

app.get("/pokemon/:id", (req, res) => {
  const data = pokemon.pokemon.find((p) => p.id === parseInt(req.params.id));

  res.json({ data });
});

app.get("/types", (_, res) => {
  const data = uniq(pokemon.pokemon.map((p) => p.type).flat());

  res.json({ data });
});

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
