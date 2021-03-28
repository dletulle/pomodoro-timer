import React from 'react';

const Timer = (props) => {
    return (
      <div id="container">
        <p id="timer-label">{props.label}</p>
        <p id="time-left">{props.minLessThanTen}{props.timerMinutes}:{props.secLessThanTen}{props.timerSeconds}</p>
      </div>
    );
  };

  export default Timer;