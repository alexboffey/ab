import { useEffect, useState } from "react";
import { Pokemon } from "../../api/data/schema";

function App() {
  const [val, setVal] = useState<Pokemon[]>([]);
  // const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/pokemon")
      .then((r) => r.json())
      .then((r) => setVal(r.data.pokemon));
  });

  return (
    <main className="App">
      {val.map((p) => {
        return (
          <div key={p.id} style={{ background: "#e1f1e1" }}>
            <p>{p.name}</p>
            <p>#{p.num}</p>
            <img src={p.img} alt={p.name} />
            <pre
              style={{ height: "10rem", width: "30rem", overflowY: "scroll" }}
            >
              <code>{JSON.stringify(p, null, 2)}</code>
            </pre>
            {/* <img src={p.image} alt={p.name} /> */}
          </div>
        );
      })}
      {/* <pre
        style={{ height: "20rem", overflowY: "scroll", background: "#f8f1f1" }}
      >
        <code> {JSON.stringify(val, null, 2)}</code>
      </pre> */}
    </main>
  );
}

export default App;
