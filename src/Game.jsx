//src/Game.jsx

import { createContext, useContext, useState } from "react";
//createContext makes the box that will carry the state and actions
//useState holds each individual state
//useContext lets any compontent pull values out of the box made by createContext

const GameContext = createContext(); //object will carry game data and functions.

export function GameProvider({ children }) {
  const numberHoles = 9; //total number of holes the mole can be in
  const [isPlaying, setIsPlaying] = useState(false); //will turn to true when play is clicked. Defines if we are in game mode or the menu screen. Menu screen is (false) and game screen is (true)
  const [score, setScore] = useState(0); //current number of times mole is hit AKA the score
  const [currentHole, setCurrentHole] = useState(null); //mole index tracks where mole is AKA which hole the mole is in. index 0-8 holds the mole which is the same as 9 because we start at 0

  function startGame() {
    setScore(0); //resets the score by setting it to zero when you start the game over
    setCurrentHole(Math.floor(Math.random() * numberHoles)); //places mole in a random hole by generating a random number that is within the numberHoles value aka 0 <= x < numberHoles
    setIsPlaying(true); //reveals the board
  }

  function whack(index) {
    if (!isPlaying) return; // this stops people from clicking the holes before the game starts
    setScore((s) => s + 1); //refreshes the score and ensures we ALWAYS get the latest score
    setCurrentHole(Math.floor(Math.random() * numberHoles)); //moves the mole to a different hole but possible to be set to same hole if random number comes up the same
  }

  function restart() {
    setIsPlaying(false); //takes you back to menu screen when done
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
    </GameContext.Provider> //wrapping the app makes the context available everywhere
  );
}

//this alerts an error
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame is not inside GameProvider");
  return ctx;
}
//if i see an error from this hook it is beacuse react cannot find the provider box refferenced above.
