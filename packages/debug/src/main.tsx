import React from "react";
import ReactDOM from "react-dom/client";

import { Debug } from "./Debug";

function App() {
  return <Debug debug={{ hello: "world" }} />;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
