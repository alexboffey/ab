import { useEffect, useState } from "react";
import { Button } from "@vite-workspaces/ui";
import { Query } from "@vite-workspace/query";

import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [val, setVal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    Query.of(async () => 1)
      .chain(async (v) => v + 1)
      .chain(async (v) => v + 2)
      .resolve()
      .then(setVal);
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Val: {val}</p>
        <Button
          backgroundColor="white"
          label={`count is ${count}`}
          onClick={() => setCount((count) => count + 1)}
        ></Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
