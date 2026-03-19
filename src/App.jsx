import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

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

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className="dice-container">{diceElements}</div>

      <button className="roll-dice" onClick={rollDice}>
        {gameWon ? "New game" : "Roll"}
      </button>
    </main>
  );
}
