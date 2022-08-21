import { Pokemon } from "@prisma/client";
import { createRouter } from "../createRouter";
// import { postRouter } from './post';
// import { Subscription } from '@trpc/server';
// import superjson from 'superjson';
// import { clearInterval } from 'timers';
import { prisma } from "../context";
import { z } from "zod";

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

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  // Add data transformers @link https://trpc.io/docs/data-transformers
  .query("pokemon", {
    resolve: async () => {
      const data = await prisma.pokemon.findMany();

      return data
        .map((p) => withImages(p))
        .sort((a, b) => parseInt(a.num) - parseInt(b.num));
    },
  })
  .query("currentUser", {
    resolve: async ({ ctx }) => {
      const currentUser = await prisma.user.findUnique({
        where: { email: ctx.session?.user?.email },
      });
      if (!currentUser?.id) {
        throw new Error("user doesnt have an id");
      }
      const currentUserPokemon = await prisma.userPokemon.findUnique({
        where: { userId: currentUser.id },
      });
      const p = await prisma.pokemon.findMany({
        where: { UserPokemon: { id: currentUserPokemon?.id ?? "" } },
      });

      return { ...currentUser, pokemon: p.map(withImages) };
    },
  })
  .query("users", {
    resolve: async () => {
      const users = await prisma.user.findMany();

      return users;
    },
  });

/**
 * Optionally do custom error (type safe!) formatting
 * @link https://trpc.io/docs/error-formatting
 */
// .transformer(superjson)
// .formatError(({ shape, error }) => { })
// .query('healthz', {
//   resolve() {
//     return 'yay!';
//   },
// })
// .merge('post.', postRouter)
// .subscription('randomNumber', {
//   resolve() {
//     return new Subscription<number>((emit) => {
//       const int = setInterval(() => {
//         emit.data(Math.random());
//       }, 500);
//       return () => {
//         clearInterval(int);
//       };
//     });
//   },
// })

export type AppRouter = typeof appRouter;
