import React, { Component } from 'react';
import Region from './Region.js';
import svgPathBoundingBox from 'svg-path-bounding-box';
import './Map.css';

class Map extends Component {

  selectedRegion() {
    let region;
    for (const r of this.props.data) {
      if (r.id === this.props.selectedRegion) {
        region = r;
        break;
      }
    }

    return <Region
      selectedItems={this.props.selectedItems}
      region={region}
      key={region.id}
      onMunicipalityClick={(id) => this.props.onMunicipalityClick(id)}
      onClick={(id) => this.props.onRegionClick(id)}
      selectionMode={this.props.selectionMode} />
  }

  render() {
    const {data, selectedItems} = this.props;

    const regions = data.map(region => {
      return <Region
        selectedItems={selectedItems}
        region={region}
        key={region.id}
        onMunicipalityClick={(id) => this.props.onMunicipalityClick(id)}
        onClick={(id) => this.props.onRegionClick(id)}
        selectionMode={this.props.selectionMode} />
    });

    let x = 0, y = 0, width = 114, height = 200;
    if (this.props.selectedRegion) {
      let region;
      for (const r of this.props.data) {
        if (r.id === this.props.selectedRegion) {
          region = r;
          break;
        }
      }
      const bbox = svgPathBoundingBox(region.d);
      x = bbox.x1;
      y = bbox.y1;
      width = bbox.width;
      height = bbox.height;
    }
    const viewBox = x + ' ' + y + ' ' + width + ' ' + height;

    return (
      <div className="map-container">
        {this.props.selectedRegion &&
        <span id="region-close" onClick={this.props.onRegionCloseClick}>X</span>}
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          version="1.1">
          {this.props.selectedRegion ? this.selectedRegion() : regions}
        </svg>
      </div>
    );
  }
}

export default Map;
