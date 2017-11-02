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

  componentDidMount() {
    this.testApiConnection();
  }

  async testApiConnection() {
    try {
      let response = await fetch('http://localhost:3001');
      
      if (!response.ok) {
        throw new Error('Error while fetching resource');
      }

      let data = await response.json();
      this.setState({
        population: data.population
      });
    } catch(e) {
      console.log(e);
    }
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
        {this.state.population ? "Population of Finland: " + this.state.population
        : "Loading..."}
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
