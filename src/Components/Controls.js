import React from 'react';

const Controls = (props) => {
    return (
      <div>
        <button onClick={props.playPause} id="start_stop">
          <i className="fas fa-play"/>
          <i className="fas fa-pause"/>
        </button>
        <button onClick={props.reset} id="reset">
          <i className="fas fa-power-off"/>
        </button>
      </div>
    );
  };

  export default Controls;