// src/Board.jsx
import React from "react";
import { useGame } from "./Game";
import Hole from "./Hole";

export default function Board() {
  const { score, restart, numberHoles } = useGame();

  console.log("game context:", game);

  const { score, restart, numberHoles } = game;
  console.log("numberHoles:", numberHoles);
  console.log("holes array:", Array.from({ length: numberHoles }));

  return (
    <div className="game-board">
      <header>
        <div>Score: {score}</div>
        <button onClick={restart}>Restart</button>
      </header>
      <div className="holes-container">
        {Array.from({ length: numberHoles }).map((_, idx) => (
          <Hole key={idx} index={idx} />
        ))}
      </div>
    </div>
  );
}
