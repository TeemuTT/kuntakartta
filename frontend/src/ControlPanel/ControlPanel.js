import React from 'react';
import './ControlPanel.css';

const Button = (props) => {
  return (
    <button onClick={() => props.onClick()}>
      {props.text}
    </button>
  );
}

const ControlPanel = (props) => {
  const buttons = props.buttons.map((button, i) => {
    return <Button text={button.text} onClick={() => button.onClick()} key={i}/>
  });
  return (
    <div className="control-panel-container">
      <h2>Kokeile näitä!</h2>
      <div className="control-container">
        {buttons}
      </div>
    </div>
  );
}

export default ControlPanel;
