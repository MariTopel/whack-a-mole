// src/Menu.jsx
import React from "react";
import { useGame } from "./Game";

export default function Menu() {
  const { startGame } = useGame();
  return (
    <div className="menu-screen">
      <h1>Whack a Mole!</h1>
      <p>Click the mole as it appears to score points.</p>
      <button onClick={startGame}>Play</button>
    </div>
  );
}
