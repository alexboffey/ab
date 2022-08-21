import { Pokemon as PokemonType } from "@prisma/client";
import { Icon } from "./Icon";

type PokemonProps = {
  poke: PokemonType;
  stats?: React.ReactNode;
};

export const Pokemon = ({ poke, stats = null }: PokemonProps) => {
  return (
    <main className="min-h-[8rem] flex flex-col flex-wrap items-center relative">
      <article className="relative p-2 bg-white rounded shadow-md">
        {stats}
        <img className="max-w-[3rem]" src={poke.thumbnail} alt={poke.name} />
      </article>
      <footer className="mt-auto">
        <p className="text-sm font-medium leading-loose tracking-wider">
          {poke.name}
        </p>
        <p className="text-xs text-slate-700">
          <span className="inline-flex mr-1">
            <Icon
              name="hash"
              className="text-slate-600 text-xs relative top-[0.13rem]"
            />
          </span>
          {poke.num}
        </p>
        <p className="text-xs font-medium text-slate-700">
          <span className="inline-flex mr-1">
            <Icon
              name="pokecog"
              className="text-slate-600 text-xs relative top-[0.13rem]"
            />
          </span>
          {poke.quantity}
        </p>
      </footer>
    </main>
  );
};
