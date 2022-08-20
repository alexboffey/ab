import { Pokemon } from "@prisma/client";
import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../index";

const withImages = (p: Pokemon) => {
  return {
    ...p,
    img: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${p.num}.png`,
    thumbnail: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${p.num}.png`,
    sprite: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/sprites/${p.num}MS.png`,
  };
};

export const appRouter = trpc
  .router()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("pokemon", {
    resolve: async () => {
      const data = await prisma.pokemon.findMany();

      return data.map((p) => withImages(p));
    },
  });

export type AppRouter = typeof appRouter;
