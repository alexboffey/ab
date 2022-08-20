import { PrismaClient, Pokemon } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();
const port = process.env.port || 4444;

export type PokemonWithImages = Pokemon & {
  img: string;
  sprite: string;
  thumbnail: string;
};

app.get("/pokemon", async (_, res) => {
  const data = await (
    await prisma.pokemon.findMany()
  )
    .sort((a, b) => parseInt(a.num, 10) - parseInt(b.num, 10))
    .map((p) => {
      return {
        ...p,
        img: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${p.num}.png`,
        thumbnail: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${p.num}.png`,
        sprite: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/sprites/${p.num}MS.png`,
      };
    });

  res.status(200).json({ data });
});

app.get("/pokemon/:id", async (req, res) => {
  const data = await prisma.pokemon.findFirst({ where: { id: req.params.id } });

  res.status(200).json({ data });
});

app.get("/types", async (_, res) => {
  const data = await prisma.type.findMany();

  res.json({ data });
});

app.get("/pokemon/types/:id", async (req, res) => {
  const data = await prisma.type.findFirst({
    where: { pokemonId: req.params.id },
  });

  res.status(200).json({ data });
});

app.get("/users", async (_, res) => {
  const [users] = await Promise.all([prisma.user.findMany()]);

  res.json({ users });
});

app.listen(process.env.PORT, () =>
  console.log(`API 🏃‍♂️ http://localhost:${port}`)
);
