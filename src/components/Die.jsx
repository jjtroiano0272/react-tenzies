import { nanoid } from 'nanoid';
import React, { useState } from 'react';

// TODO: Default to random roll, but set value if passed as arg
export default function Die({ holdDice, value, isHeld }) {
  return (
    <button
      onClick={holdDice}
      className={`btn btn-md ${isHeld ? 'btn-success' : 'btn-secondary'}`}
    >
      <h2>{value}</h2>
    </button>
  );
}
