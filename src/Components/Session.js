import React from 'react';

const Session = (props) => {
    return (
      <div id="session">
        <p id="session-label">Session Length</p>
        <button onClick={props.ids} id="session-increment">
          <i className="fas fa-chevron-up"/>
        </button>
        <p id="session-length">{props.sl}</p>
        <button onClick={props.ids} id="session-decrement">
          <i className="fas fa-chevron-down"/>
        </button>
      </div>
    );
  };

  export default Session;