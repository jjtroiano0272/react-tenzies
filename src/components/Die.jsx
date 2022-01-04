import { nanoid } from 'nanoid';
import {
  DiceOne,
  DiceTwo,
  DiceThree,
  DiceFour,
  DiceFive,
  DiceSix,
} from 'phosphor-react';
import React, { useState } from 'react';

// TODO: Default to random roll, but set value if passed as arg
export default function Die({ holdDice, value, isHeld }) {
  const size = 55;

  // <button
  //   onClick={holdDice}
  //   className={`btn btn-md die-face ${
  //     isHeld ? 'btn-success' : 'btn-secondary'
  //   }`}
  // >
  // </button>
  return (
    <>
      {value === 1 && (
        <DiceOne
          onClick={holdDice}
          className={isHeld ? 'success-light' : 'secondary'}
          size={size}
        />
      )}
      {value === 2 && (
        <DiceTwo
          onClick={holdDice}
          className={isHeld ? 'success-light' : 'secondary'}
          size={size}
        />
      )}
      {value === 3 && (
        <DiceThree
          onClick={holdDice}
          className={isHeld ? 'success-light' : 'secondary'}
          size={size}
        />
      )}
      {value === 4 && (
        <DiceFour
          onClick={holdDice}
          className={isHeld ? 'success-light' : 'secondary'}
          size={size}
        />
      )}
      {value === 5 && (
        <DiceFive
          onClick={holdDice}
          className={isHeld ? 'success-light' : 'secondary'}
          size={size}
        />
      )}
      {value === 6 && (
        <DiceSix
          onClick={holdDice}
          className={isHeld ? 'success-light' : 'secondary'}
          size={size}
        />
      )}
    </>
  );
}
