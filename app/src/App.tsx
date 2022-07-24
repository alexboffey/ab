import { useEffect, useState } from "react";
import { Button } from "@ws/ui";
import { Query } from "@ws/query";

function App() {
  const [val, setVal] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    Query.of<any>(async () => [
      fetch("/api/users").then((r) => r.json()),
      fetch("/api/posts").then((r) => r.json()),
    ])
      .chain((v) => Promise.all(v))
      .resolve()
      .then(setVal);
  }, []);

  return (
    <div className="App">
      <pre>
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
