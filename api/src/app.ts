import { Pokemon } from "@prisma/client";
import * as trpc from "@trpc/server";
// import { z } from "zod";
import { prisma } from "../index";

const imageSrc =
  "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master";

const withImages = (p: Pokemon) => {
  return {
    ...p,
    img: `${imageSrc}/images/${p.num}.png`,
    thumbnail: `${imageSrc}/thumbnails/${p.num}.png`,
    sprite: `${imageSrc}/sprites/${p.num}MS.png`,
  };
};

export const appRouter = trpc
  .router()
  // .query("hello", {
  //   input: z
  //     .object({
  //       text: z.string().nullish(),
  //     })
  //     .nullish(),
  //   resolve({ input }) {
  //     return {
  //       greeting: `hello ${input?.text ?? "world"}`,
  //     };
  //   },
  // })
  .query("pokemon", {
    resolve: async () => {
      const data = await prisma.pokemon.findMany();

      return data
        .map((p) => withImages(p))
        .sort((a, b) => parseInt(a.num) - parseInt(b.num));
    },
  });

export type AppRouter = typeof appRouter;
