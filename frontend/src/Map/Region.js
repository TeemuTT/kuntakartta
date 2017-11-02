import React from 'react';
import Municipality from './Municipality.js';
import './Region.css';

const Region = (props) => {
  const {region} = props;
  const municipalities = region.kunnat.map(m  => {
    return <Municipality
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
