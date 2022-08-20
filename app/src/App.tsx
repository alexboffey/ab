import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./utils/trpc";

const trpcClient = trpc.createClient({
  url: "http://localhost:4444/trpc",
});

const queryClient = new QueryClient();

function App() {
  const pokemon = trpc.useQuery(["pokemon"]);

  return (
    <main className="bg-slate-100 p-8 h-full">
      {pokemon.isLoading && <p>Loading...</p>}
      {pokemon.data && (
        <>
          <header className="py-10">
            <p>Showing {pokemon.data.length} Pokemon</p>
          </header>

          <main className="grid grid-cols-4 gap-8 ">
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
                      className="max-h-[12rem]"
                      src={poke.img}
                      alt={poke.name}
                    />
                  </main>
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
