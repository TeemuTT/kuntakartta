import React, { Component } from 'react';
import Region from './Region.js';
import './Map.css';

class Map extends Component {
  render() {
    const {data} = this.props;
    const regions = data.map(region => {
      return <Region region={region} key={region.id} />
    });

    return (
      <div className="map-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 114 200"
          version="1.1">
          {regions}
        </svg>
      </div>
    );
  }
}

export default Map;
