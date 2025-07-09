// src/Hole.jsx
import React from "react";
import { useGame } from "./Game";

export default function Hole({ index }) {
  const { currentHole, whack } = useGame();
  const isActive = index === currentHole;

  return (
    <div
      className="hole"
      onClick={() => {
        if (isActive) whack();
      }}
    >
      {isActive && <div className="mole" />}
    </div>
  );
}
