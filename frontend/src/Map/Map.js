import React, { Component } from 'react';
import Region from './Region.js';
import './Map.css';

class Map extends Component {
  render() {
    const {data, selectedItems} = this.props;
    const regions = data.map(region => {
      return <Region
        selectedItems={selectedItems}
        region={region}
        key={region.id}
        onMunicipalityClick={(id) => this.props.onMunicipalityClick(id)} />
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
