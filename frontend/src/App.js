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
    this.fetchMunicipalityInfo(id);
  }

  paintResults = (results) => {
    let selectedItems = [];
    for (const r of results) {
      selectedItems.push(r.nimi);
    }
    this.setState({
      selectedItems: selectedItems
    });
  }

  clearResults = () => {
    this.paintResults([]);
  }

  runQuery = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error while requesting ' + url);
      }
      const data = await response.json();
      this.paintResults(data);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const controlPanelButtons = [
      {
        text: 'Väkiluvultaan suurimmat kunnat',
        onClick: () => {
          const url = 'http://localhost:3001/municipalities?field=väkiluku&order=desc&limit=10';
          this.runQuery(url);
        }
      },
      {
        text: 'Huonoin työllisyysaste',
        onClick: () => {
          const url = 'http://localhost:3001/municipalities?field=työllisyysaste&order=asc&limit=10';
          this.runQuery(url);
        }
      },
      {
        text: 'Eniten eläkeläisiä',
        onClick: () => {
          const url = 'http://localhost:3001/municipalities?field=eläkeläisten_osuus_väestöstä&order=desc&limit=10';
          this.runQuery(url);
        }
      },
      {
        text: 'Tyhjennä',
        onClick: this.clearResults
      }
    ];

    return (
      <div className="App">
        <div className="row">
          <Map
            data={data}
            selectedItems={this.state.selectedItems}
            onMunicipalityClick={(id) => this.onMunicipalityClick(id)} />
          <ResultTable info={this.state.info} />
        </div>
        <ControlPanel buttons={controlPanelButtons}/>
        <QueryBuilder />
      </div>
    );
  }
}

export default App;
