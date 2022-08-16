import { useEffect, useState } from "react";
import { Button } from "@ab/ui";
import { Query } from "@ab/query";

function App() {
  const [val, setVal] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api")
      .then((r) => r.json())
      .then((r) => setVal(r));
    // .then((d) => console.log({ d }))
  });

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
