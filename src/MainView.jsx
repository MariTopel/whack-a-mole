// src/MainView.jsx
import React from "react";
import { useGame } from "./Game";
import Menu from "./Menu"; // your existing Menu.jsx
import Board from "./Board"; // we’ll create this next

export default function MainView() {
  const { isPlaying } = useGame();
  // Show menu until the game starts, then switch to the board
  return isPlaying ? <Board /> : <Menu />;
}
