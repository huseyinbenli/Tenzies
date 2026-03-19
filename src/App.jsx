import { useEffect, useRef, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  let gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    setDice((prevDieObj) =>
      prevDieObj.map((item) =>
        !item.isHeld ? { ...item, value: Math.ceil(Math.random() * 6) } : item,
      ),
    );

    if (gameWon) {
      setDice(generateAllNewDice());
    }
  }

  function hold(id) {
    setDice((prevDieObj) =>
      prevDieObj.map((item) =>
        id === item.id ? { ...item, isHeld: !item.isHeld } : item,
      ),
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      handleClick={() => hold(die.id)}
    />
  ));

  const buttonRef = useRef(null);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  return (
    <>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>

        <div className="dice-container">{diceElements}</div>

        <button className="roll-dice" onClick={rollDice} ref={buttonRef}>
          {gameWon ? "New game" : "Roll"}
        </button>
      </main>
    </>
  );
}
