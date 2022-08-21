import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { Icon } from "components/Icon";
import { Pokemon } from "components/Pokemon";
import { Header } from "components/Header";

function App() {
  const { data: session } = useSession();
  const pokemon = trpc.useQuery(["pokemon"]);
  const currentUser = trpc.useQuery(["currentUser"]);

  if (!session?.user || !currentUser.data?.email) {
    return <p>No user...</p>;
  }

  return (
    <main>
      <header className="py-8">
        Showing {(pokemon.data ?? []).length} Pokemon
      </header>
      <main className="grid grid-flow-row grid-cols-10 items-stretch">
        {(pokemon.data ?? []).map((poke) => {
          return (
            <Pokemon
              poke={poke}
              stats={
                <>
                  {currentUser.data?.userPokemon &&
                    currentUser.data.userPokemon.find(
                      (p) => p.pokemonId === poke.id,
                    )?.quantity && (
                      <p className="absolute -top-2 -left-2 text-xs font-medium  leading-loose bg-emerald-600 text-white flex items-center px-2 rounded-xl">
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
                    <span className="absolute bottom-2 right-2 bg-slate-100 p-1 rounded-full shadow-lg">
                      <Icon
                        className="text-green-600 text-sm"
                        name="pokeball"
                      />
                    </span>
                  ) : (
                    <span className="absolute bottom-2 right-2 bg-slate-100 p-1 rounded-full shadow-lg">
                      <Icon
                        className="text-slate-900 text-sm"
                        name="pokeball"
                      />
                    </span>
                  )}
                </>
              }
            />
          );
        })}
      </main>
    </main>
  );
}

export default function Index() {
  const { data: session } = useSession();
  trpc.useQuery(["currentUser"]);

  return (
    <main className="bg-slate-100 p-8 min-h-screen">
      <Header />
      {session?.user && <App />}
    </main>
  );
}
