import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./utils/trpc";
import json from "../../api/data/pokemon.json";
import { Debug } from "@ab/debug";

const trpcClient = trpc.createClient({
  url: "http://localhost:4444/trpc",
});

const queryClient = new QueryClient();

function App() {
  const pokemon = trpc.useQuery(["pokemon"]);

  return (
    <main className="bg-slate-100 p-8 h-full">
      <Debug debug={json} />
      {pokemon.isLoading && <p>Loading...</p>}
      {pokemon.data && (
        <>
          <header className="py-10">
            <p>Showing {pokemon.data.length} Pokemon</p>
          </header>

          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 ">
            {pokemon.data.map((poke) => {
              return (
                <article
                  key={poke.id}
                  className="bg-white shadow-lg rounded p-10"
                >
                  <header key={poke.id} className="pb-5">
                    <p className="text-2xl font-bold leading-loose tracking-wider">
                      {poke.name}
                    </p>
                    <p className="ml-auto leading-none">#{poke.num}</p>
                  </header>
                  <main className="flex items-center justify-center">
                    <img
                      style={{ maxHeight: `${Number(poke.height) * 6}rem` }}
                      src={poke.img}
                      alt={poke.name}
                    />
                  </main>
                  <footer>
                    <pre className="h-[10rem]  overflow-scroll text-sm bg-slate-100 p-3">
                      <code>{JSON.stringify(poke, null, 2)}</code>
                    </pre>
                  </footer>
                </article>
              );
            })}
          </main>
        </>
      )}
    </main>
  );
}

const WrappedApp = () => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default WrappedApp;
