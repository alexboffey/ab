import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { Icon } from "components/Icon";
import { Pokemon } from "components/Pokemon";
import { Header } from "components/Header";

function App() {
  const pokemon = trpc.useQuery(["pokemon"]);
  const userPokemon = trpc.useQuery(["userPokemon"]);

  return (
    <main>
      <header className="py-8">
        Showing {(pokemon.data ?? []).length} Pokemon
      </header>
      <main className="grid grid-flow-row grid-cols-10 items-stretch">
        {pokemon.data &&
          pokemon.data.map((poke) => {
            const qty =
              userPokemon.data.userPokemon.find((p) => p.pokemonId === poke.id)
                ?.quantity ?? 0;

            return (
              <Pokemon
                key={poke.id}
                poke={poke}
                stats={
                  <>
                    {userPokemon.data && (
                      <>
                        {!qty && (
                          <p className="absolute -top-2 -left-3 text-xs shadow font-medium leading-loose bg-red-700 text-white flex items-center px-2 rounded-xl">
                            <Icon className="mr-1" name="qty" />
                            <span>{qty}</span>
                          </p>
                        )}
                        {!!qty && (
                          <p className="absolute -top-2 -left-3 text-xs shadow font-medium leading-loose bg-emerald-600 text-white flex items-center px-2 rounded-xl">
                            <Icon className="mr-1" name="qty" />
                            <span>{qty}</span>
                          </p>
                        )}
                      </>
                    )}
                    {(pokemon.data ?? []).map((p) => p.id).includes(poke.id) ? (
                      <span className="absolute -bottom-1 -right-2 bg-slate-100 p-1 rounded-full shadow-lg">
                        <Icon className="text-green-600" name="pokeball" />
                      </span>
                    ) : (
                      <span className="absolute -bottom-1 -right-2 bg-slate-100 p-1 rounded-full shadow-lg">
                        <Icon className="text-slate-900" name="pokeball" />
                      </span>
                    )}
                  </>
                }
              />
            );
          })}
        {/* {(pokemon.data ?? []).map((poke) => {
          return (
            <Pokemon
              poke={poke}
              stats={
                <>
                  {currentUser.data?.userPokemon &&
                    currentUser.data.userPokemon.find(
                      (p) => p.pokemonId === poke.id,
                    )?.quantity && (
                      <p className="absolute -top-2 -left-3 text-xs shadow font-medium  leading-loose bg-emerald-600 text-white flex items-center px-2 rounded-xl">
                        <Icon className="mr-1" name="qty" />
                        <span>
                          {
                            currentUser.data.userPokemon.find(
                              (p) => p.pokemonId === poke.id,
                            )?.quantity
                          }
                        </span>
                      </p>
                    )}
                  {(currentUser.data?.pokemon ?? [])
                    .map((p) => p.id)
                    .includes(poke.id) ? (
                    <span className="absolute -bottom-1 -right-2 bg-slate-100 p-1 rounded-full shadow-lg">
                      <Icon className="text-green-600" name="pokeball" />
                    </span>
                  ) : (
                    <span className="absolute -bottom-1 -right-2 bg-slate-100 p-1 rounded-full shadow-lg">
                      <Icon className="text-slate-900" name="pokeball" />
                    </span>
                  )}
                </>
              }
            />
          );
        })} */}
      </main>
    </main>
  );
}

export default function Index() {
  const { data: session } = useSession();

  return (
    <main className="bg-slate-100 p-8 min-h-screen">
      <Header />
      {session?.user && <App />}
    </main>
  );
}
