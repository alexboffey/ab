import { useEffect, useState } from "react";
import { Pokemon } from "../../api/data/schema";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch("/api/pokemon")
      .then((r) => r.json())
      .then((r) => setPokemon(r.data));
  });

  return (
    <div>
      <p>Number of Pokemon: {pokemon.length}</p>
      <div className="grid grid-cols-4 gap-8 bg-slate-100 p-8">
        {pokemon.map((poke) => {
          return (
            <div key={poke.id} className="bg-white shadow-lg rounded-lg p-8">
              <img src={poke.img} alt={poke.name} />
              <p>#{poke.num}</p>
              <p className="text-2xl font-bold leading-loose tracking-wider">
                {poke.name}
              </p>
              <pre className="text-xs bg-slate-100 p-4 shadow-inner overflow-y-scroll h-[12rem]">
                <code>{JSON.stringify(poke, null, 2)}</code>
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
