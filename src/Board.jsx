// src/Board.jsx
import React from "react";
import { useGame } from "./Game";
import Hole from "./Hole";

export default function Board() {
  // only one declaration of score here:
  const { score, restart, numberHoles, timeLeft } = useGame();

  console.log("timeLeft:", timeLeft);

  return (
    <div className="game-board">
      <header>
        <div>Score: {score}</div>
        <div>Time: {timeLeft}</div>
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
