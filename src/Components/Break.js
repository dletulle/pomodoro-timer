import React from 'react';

const Break = (props) => {
    return (
      <div id="break">
        <p id="break-label">Break Length</p>
        <button onClick={props.ids} id="break-increment">
          <i className="fas fa-chevron-up"/>
        </button>
        <p id="break-length">{props.bl}</p>
        <button onClick={props.ids} id="break-decrement">
          <i className="fas fa-chevron-down"/>
        </button>
      </div>
    );
  };

  export default Break;