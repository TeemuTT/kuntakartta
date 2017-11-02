import React from 'react';
import './Municipality.css';

const Municipality = (props) => {
  const {d, id} = props;
  return (
    <path
      d={d}
      className="municipality-path"
      onClick={() => props.onClick(id)} />
  );
}

export default Municipality;
