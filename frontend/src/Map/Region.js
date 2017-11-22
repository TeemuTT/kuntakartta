import React from 'react';
import Municipality from './Municipality.js';
import './Region.css';

const Region = (props) => {
  const {region, selectedItems} = props;

  const municipalities = region.kunnat.map(m => {
    let selected = false;
    if ((selectedItems && selectedItems.indexOf(m.id) !== -1)) {
      selected = true;
    }
    return <Municipality
      selected={selected}
      d={m.d}
      id={m.id}
      key={m.id}
      onClick={(id) => props.onMunicipalityClick(id)}
      selectionMode={props.selectionMode} />
  });

  let className = 'region';
  if (props.selectionMode === 'region') {
    className += ' active';
  }
  if (selectedItems && selectedItems.indexOf(region.id) !== -1) {
    className += ' selected';
  }
  
  return (
    <g className={className} onClick={() => props.onClick(region.id)}>
      <path d={region.d} className="region-path"/>
      {municipalities}
    </g>
  );
}

export default Region;
