import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import Die from './Die';

export default function Dice({ diceArr }) {
  const [diceValues, setDiceValues] = useState(allNewDice(10));

  function allNewDice(numDice) {
    // return Array.from({ length: numDice }, () => Math.ceil(Math.random() * 6));
    const newDiceArr = [];

    // TODO: Can this be more elegant? Array.from
    for (let i = 0; i < numDice; i++) {
      newDiceArr.push({
        // id: nanoid(),
        // value: Math.ceil(Math.random() * 6),
        // isHeld: false,
        Die,
      });
    }

    return newDiceArr;
  }

  return (
    <div className='row my-2'>
      {diceArr(5).map((item) => (
        <div className='col' key={item.id}>
          <Die />
        </div>
      ))}
    </div>
  );
}
