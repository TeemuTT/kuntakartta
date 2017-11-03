import React from 'react';
import './Municipality.css';

const Municipality = (props) => {
  const {d, id, selected} = props;
  const style = selected ? 'municipality-path selected' : 'municipality-path';
  return (
    <path
      d={d}
      className={style}
      onClick={() => props.onClick(id)}>
      <title>{id}</title>
    </path>
  );
}

export default Municipality;
