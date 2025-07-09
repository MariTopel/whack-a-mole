//src/App.jsx
import React from "react";
import { GameProvider } from "./Game";
import MainView from "./MainView";

export default function App() {
  return (
    <GameProvider>
      <MainView />
    </GameProvider>
  );
}
