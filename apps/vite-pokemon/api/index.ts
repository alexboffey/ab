import { Pokemon, PrismaClient } from "@prisma/client";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./src/app";
import cors from "cors";

const app = express();
export const prisma = new PrismaClient();
const port = process.env.port || 4444;

const createContext = () => ({}); // no context
// type Context = trpc.inferAsyncReturnType<typeof createContext>;

app.use(cors({ origin: "http://127.0.0.1:3333" }));

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const withImages = (p: Pokemon) => {
  return {
    ...p,
    img: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${p.num}.png`,
    thumbnail: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${p.num}.png`,
    sprite: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/sprites/${p.num}MS.png`,
  };
};

app.get("/pokemon", async (_, res) => {
  const data = await (
    await prisma.pokemon.findMany()
  )
    .sort((a, b) => parseInt(a.num, 10) - parseInt(b.num, 10))
    .map((p) => {
      return withImages(p);
    });

  res.status(200).json({ data });
});

app.listen(process.env.PORT, () =>
  console.log(`API 🏃‍♂️ http://localhost:${port}`)
);
