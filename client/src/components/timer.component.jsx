import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div style={{textAlign: 'left'}}>
      <div style={{fontSize: '25px'}}>
       <span>{minutes}</span>:<span>{seconds}</span>
      </div>

    </div>
  );
}
export default MyTimer;