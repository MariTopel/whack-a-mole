// src/Game.jsx

import { createContext, useContext, useState } from "react";
// createContext makes the box that will carry the state and actions
// useState holds each individual state
// useContext lets any component pull values out of the box made by createContext

const GameContext = createContext(); // object will carry game data and functions

export function GameProvider({ children }) {
  const numberHoles = 9; // total number of holes the mole can be in
  const [isPlaying, setIsPlaying] = useState(false);
  // will turn to true when play is clicked. false = menu screen, true = game screen
  const [score, setScore] = useState(0);
  // current number of times mole is hit AKA the score
  const [currentHole, setCurrentHole] = useState(null);
  // mole index tracks which hole the mole is in (0–8)

  function startGame() {
    setScore(0);
    // resets the score by setting it to zero when you start the game over
    setCurrentHole(Math.floor(Math.random() * numberHoles));
    // places mole in a random hole (0 <= x < numberHoles)
    setIsPlaying(true);
    // reveals the board
  } // ← close startGame

  function whack() {
    if (!isPlaying) return;
    // this stops people from clicking the holes before the game starts

    setScore((prev) => prev + 1);
    // refreshes the score and ensures we ALWAYS get the latest score

    // pick a new hole different from the previous one
    setCurrentHole((prevHole) => {
      let newHole;
      // variable holds the value of the new generated hole for comparison

      do {
        newHole = Math.floor(Math.random() * numberHoles);
        // creates the new hole value
      } while (newHole === prevHole);
      // if it equals the old hole, repeat the pick

      return newHole;
      // now guaranteed not to equal the previous hole
    });
  } // ← close whack

  function restart() {
    setIsPlaying(false);
    // takes you back to menu screen when done
  }

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        score,
        currentHole,
        numberHoles,
        startGame,
        whack,
        restart,
      }}
    >
      {children}
    </GameContext.Provider> // wrapping the app makes the context available everywhere
  );
} // ← close GameProvider

// this alerts an error if you call useGame() outside the provider
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame is not inside GameProvider");
  return ctx;
}
// if you see an error from this hook, it’s because React cannot find the provider box
