import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./utils/trpc";

const trpcClient = trpc.createClient({
  url: "http://localhost:4444/trpc",
});
const queryClient = new QueryClient();

function App() {
  const hello = trpc.useQuery(["hello", { text: "client" }]);
  const [pokemon, setPokemon] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/pokemon")
      .then((r) => r.json())
      .then((r) => setPokemon(r.data));
  });

  return (
    <div>
      <pre>
        <code>{JSON.stringify(hello)}</code>
      </pre>
      <p>Number of Pokemon: {pokemon.length}</p>
      <div className="grid grid-cols-4 gap-8 bg-slate-100 p-8">
        {pokemon.map((poke) => {
          return (
            <div className="bg-white shadow-lg rounded-lg p-8 ">
              <header key={poke.id} className="flex items-center">
                <p className="text-2xl font-bold leading-loose tracking-wider">
                  {poke.name}
                </p>
                <p className="ml-auto">#{poke.num}</p>
              </header>
              <div>
                <img src={poke.thumbnail} alt={poke.name} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
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
