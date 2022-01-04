import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import Dice from './Dice';
import Die from './Die';
import Stopwatch from './Stopwatch';

export default function Main(props) {
  useEffect(() => {
    localStorage.getItem('dice')
      ? localStorage.getItem('dice')
      : console.log('nothing here');
  }, []);

  const [dice, setDice] = useState(allNewDice(10));
  const [gameWon, setGameWon] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [timerIsPaused, setTimerIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const userScore = 0;
  const userHighScore = 0;
  const leaderBoard = {};

  useEffect(() => {
    dice.every((item) => item.isHeld) && setGameWon(true);
    if (gameWon) {
      setTimerIsPaused(true);
      setTimerIsActive(false);
    }

    let interval = null;

    if (timerIsActive && timerIsPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [dice, timerIsActive, timerIsPaused]);

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
    // if rollCount === 0, start timer
    if (rollCount === 0) {
      setTimerIsActive(true);
      setTimerIsPaused(false);
    }
    setRollCount(rollCount + 1);
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
    setTimerIsActive(false);
    setTime(0);
    setGameWon(false);
    setDice(allNewDice(10));
    setRollCount(0);
  }

  return (
    <div className='container'>
      <div className='container bg-light rounded text-dark text-center p-5'>
        <p className='text-muted small'>Your high score: {}</p>
        <h1>Tenzies</h1>
        {!gameWon ? (
          <div className='row'>
            {dice.map((item) => (
              <div className='col dice-group my-2' key={item.id}>
                <Die
                  key={item.id}
                  value={item.value}
                  isHeld={item.isHeld}
                  holdDice={() => holdDice(item.id)}
                />
              </div>
            ))}
            <p className='my-4'>
              Keep rolling the dice until all dice match! Click on one or more
              dice to keep those from being rolled.
            </p>
            <button
              className='btn btn-sizing btn-primary btn-fluid'
              onClick={rollDice}
            >
              <h2>ROLL</h2>
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
        <p className='text-muted small my-3'>
          {rollCount < 30
            ? `You've rolled ${rollCount} times in ${Math.floor(
                time / 1000
              )} seconds.`
            : `Geez, maybe restart?`}
        </p>
        <p onClick={() => resetGame()} className='text-muted small mt-3'>
          <strong>RESET</strong>
        </p>
      </div>
    </div>
  );
}
