import { useEffect, useState } from "react";
import { PokemonWithImages } from "../../api/";

function App() {
  const [pokemon, setPokemon] = useState<PokemonWithImages[]>([]);

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

export default App;
