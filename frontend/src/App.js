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

  render() {
    return (
      <div className="App">
        {this.state.population ? "Population of Finland: " + this.state.population
        : "Loading..."}
        <div className="row">
          <Map data={data}/>
          <ResultTable />
        </div>
        <ControlPanel />
        <QueryBuilder />
      </div>
    );
  }
}

export default App;
