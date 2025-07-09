// src/Game.jsx

import { createContext, useContext, useState, useRef, useEffect } from "react";
// createContext makes the box that will carry the state and actions
// useState holds each individual state
// useContext lets any component pull values out of the box made by createContext
// useRef lets us store a mutable value (the timer ID) that persists across renders
// useEffect lets us run side-effects (like clearing the timer) when certain state changes

const GameContext = createContext(); // object will carry game data and functions

export function GameProvider({ children }) {
  // CONSTANT
  const numberHoles = 9; // total number of holes the mole can be in

  //  STATE
  const [isPlaying, setIsPlaying] = useState(false);
  // will turn to true when play is clicked. false = menu screen, true = game screen

  const [score, setScore] = useState(0);
  // current number of times mole is hit AKA the score

  const [currentHole, setCurrentHole] = useState(null);
  // mole index tracks which hole the mole is in (0–8)

  const [timeLeft, setTimeLeft] = useState(15);
  // countdown timer (in seconds)

  const timerRef = useRef(null);
  // stores our setInterval ID so we can clear it later

  function startGame() {
    setScore(0);
    // resets the score by setting it to zero when you start the game over

    setCurrentHole(Math.floor(Math.random() * numberHoles));
    // places mole in a random hole (0 <= x < numberHoles)

    setTimeLeft(15);
    // reset timer to 15 seconds

    setIsPlaying(true);
    // reveals the board

    //reset and start 15s countdown
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  } // ← close startGame

  function whack() {
    if (!isPlaying || timeLeft <= 0) return;
    // this stops people from clicking the holes before the game starts or after time’s up

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
      // checks if the new hole value is the same as the old hole value.
      // if it is the same then it repeats the pick

      return newHole;
      // updates the state of currentHole to newHole
      // now guaranteed not to equal the previous hole
    });
  } // ← close whack

  function restart() {
    setIsPlaying(false);
    // takes you back to menu screen when done

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // stop and clear the countdown timer
  } // ← close restart

  // EFFECT to stop timer at zero
  useEffect(() => {
    if (timeLeft <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      // when the timer hits 0, clear the interval so it stops counting
    }
  }, [timeLeft]);

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        score,
        currentHole,
        numberHoles,
        timeLeft,
        startGame,
        whack,
        restart,
      }}
    >
      {children}
    </GameContext.Provider> // wrapping the app makes the context available everywhere
  );
}

// this alerts an error if you call useGame() outside the provider
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame is not inside GameProvider");
  return ctx;
}
// if you see an error from this hook, it’s because React cannot find the provider box
