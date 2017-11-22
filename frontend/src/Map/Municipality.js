import React from 'react';
import './Municipality.css';

const Municipality = (props) => {
  const {d, id, selected, selectionMode} = props;
  
  let className = 'municipality';
  if (selectionMode === 'municipality') {
    className += ' active';
  }
  if (selected) {
    className += ' selected';
  }

  return (
    <path
      d={d}
      className={className}
      onClick={() => props.onClick(id)}>
      <title>{id}</title>
    </path>
  );
}

export default Municipality;
