import { useEffect, useState } from "react";
import { Button } from "@ab/ui";

function App() {
  const [val, setVal] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/pokemon")
      .then((r) => r.json())
      .then((r) => setVal(r));
  });

  return (
    <div className="App">
      <pre
        style={{ height: "20rem", overflowY: "scroll", background: "#f8f1f1" }}
      >
        <code> {JSON.stringify(val, null, 2)}</code>
      </pre>
      <Button
        backgroundColor="white"
        label={`count is ${count}`}
        onClick={() => setCount((count) => count + 1)}
      ></Button>
    </div>
  );
}

export default App;
