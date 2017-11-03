import React, { Component } from 'react';

import data from './data.json';

import Map from './Map/Map.js';
import ResultTable from './ResultTable/ResultTable.js';
import ControlPanel from './ControlPanel/ControlPanel.js';
import QueryBuilder from './QueryBuilder/QueryBuilder.js';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {}
  }

  fetchMunicipalityInfo = async (id) => {
    try {
      const url = 'http://localhost:3001/municipalities/' + id;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error while requesting ' + url);
      }
      const data = await response.json();
      this.setState({
        info: data
      });
    } catch(e) {
      console.log(e);
    }
  }

  onMunicipalityClick = (id) => {
    console.log(id + ' clicked');
    this.fetchMunicipalityInfo(id);
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <Map
            data={data}
            onMunicipalityClick={(id) => this.onMunicipalityClick(id)} />
          <ResultTable info={this.state.info} />
        </div>
        <ControlPanel />
        <QueryBuilder />
      </div>
    );
  }
}

export default App;
