import React from 'react';

export default function Timer(props) {
  // Props gets replaced with 'time'

  // Minutes
  // Math.floor((time / 60000) % 60)).slice(-2);
  // Seconds
  // Math.floor((time / 1000) % 60)).slice(-2)
  // Milliseconds
  // ((time / 10) % 100)).slice(-2)

  return (
    <div className='timer'>
      {/* Minutes */}
      <span className='digits'>
        {('0' + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </span>
      {/* Seconds */}
      <span className='digits'>
        {('0' + Math.floor((props.time / 1000) % 60)).slice(-2)}.
      </span>
      {/* Milliseconds */}
      <span className='digits mili-sec'>
        {('0' + ((props.time / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
}
