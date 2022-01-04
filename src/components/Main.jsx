import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import Dice from './Dice';
import Die from './Die';

export default function Main(props) {
  useEffect(() => {
    localStorage.getItem('dice')
      ? localStorage.getItem('dice')
      : console.log('nothing here');
  }, []);

  const [dice, setDice] = useState(allNewDice(10));
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    dice.every((item) => item.isHeld) && setGameWon(true);
  }, [dice]);

  function generateRandDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  }

  // return Array.from({ length: numDice }, () => Math.ceil(Math.random() * 6));
  function allNewDice(numDice) {
    const newDice = [];

    for (let i = 0; i < numDice; i++) {
      newDice.push(generateRandDie());
    }

    return newDice;
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld ? die : generateRandDie();
      })
    );
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function resetGame() {
    setGameWon(false);
    setDice(allNewDice(10));
  }

  return (
    <div className='container'>
      <div className='container bg-light rounded text-dark text-center p-5'>
        <h1>Tenzies</h1>
        {!gameWon ? (
          <div className='row my-2'>
            {dice.map((item) => (
              <div className='col' key={item.id}>
                <Die
                  key={item.id}
                  value={item.value}
                  isHeld={item.isHeld}
                  holdDice={() => holdDice(item.id)}
                />
              </div>
            ))}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              reiciendis modi ut vero repudiandae facere in eligendi officiis
              expedita velit, eos saepe voluptate tempora iure voluptatibus
              earum natus repellendus temporibus.
            </p>
            <button className='btn btn-primary btn-fluid' onClick={rollDice}>
              ROLL
            </button>
          </div>
        ) : (
          <div>
            <h1>You won!</h1>
            <button
              className='btn btn-md btn-success'
              onClick={() => resetGame()}
            >
              Play again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
