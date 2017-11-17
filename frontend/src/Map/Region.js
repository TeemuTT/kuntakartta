import React from 'react';
import Municipality from './Municipality.js';
import './Region.css';

const Region = (props) => {
  const {region, selectedItems} = props;
  const municipalities = region.kunnat.map(m  => {
    let selected = false;
    if ((selectedItems && selectedItems.indexOf(m.id) !== -1)) {
      selected = true;
    }
    return <Municipality
      selected={selected}
      d={m.d}
      id={m.id}
      key={m.id}
      onClick={(id) => props.onMunicipalityClick(id)} />
  });
  return (
    <g className="region">
      <path d={region.d} className="region-path"/>
      {municipalities}
    </g>
  );
}

export default Region;
