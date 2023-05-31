import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */
const chanceLightStartsOn = () => (Math.random() >= 0.1 ? true : false);
function App() {
  return (
    <div className="App">
      <Board nrows={5} ncols={5}chanceLightStartsOn={chanceLightStartsOn} />
    </div>
  );
}

export default App;
