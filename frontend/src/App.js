import React, { Component } from 'react';

import data from './data.json';

import Map from './Map/Map.js';
import ResultTable from './ResultTable/ResultTable.js';
import ControlPanel from './ControlPanel/ControlPanel.js';
import QueryBuilder from './QueryBuilder/QueryBuilder.js';
import CompareTable from './CompareTable/CompareTable.js';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      selectionMode: 'region',
      selectedResults: []
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
        info: data,
        selectedItems: [data.nimi],
        selectedResults: null
      });
    } catch(e) {
      console.log(e);
    }
  }

  onMunicipalityClick = (id) => {
    if (this.state.selectionMode === 'municipality') {
      this.fetchMunicipalityInfo(id);
    }
  }

  fetchRegionInfo = async (id) => {
    try {
      const url = 'http://localhost:3001/regions/' + id;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error while requesting ' + url);
      }
      const data = await response.json();
      this.setState({
        info: data,
        selectedItems: [data.nimi],
        selectedResults: null,
        selectionMode: 'municipality',
        selectedRegion: data.nimi
      });
    } catch(e) {
      console.log(e);
    }
  }

  onRegionClick = (id) => {
    if (this.state.selectionMode === 'region') {
      this.fetchRegionInfo(id);
    }
  }

  paintResults = (results, options) => {
    let selectedItems = [];
    for (const r of results) {
      selectedItems.push(r.nimi);
    }
    this.setState({
      info: null,
      selectedItems: selectedItems,
      selectedResults: results,
      queryOptions: options
    });
  }

  clearResults = () => {
    this.paintResults([]);
  }

  runQuery = async (url, options) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error while requesting ' + url);
      }
      const data = await response.json();
      this.paintResults(data, options);
    } catch (e) {
      console.log(e);
    }
  }

  onQueryBuilderSubmit = (target, field, order, limit) => {
    if (!target || !field || !order || !limit) return;
    let url = `http://localhost:3001/${target}?field=${field}&order=${order}&limit=${limit}`;
    const options = {field: field, order: order};
    this.runQuery(url, options);
    window.scrollTo(0,0);
  }

  onRegionCloseClick = () => {
    this.setState({
      selectedRegion: null,
      selectedResults: [],
      selectionMode: 'region'
    });
  }

  render() {
    const controlPanelButtons = [
      {
        text: 'Väkiluvultaan suurimmat kunnat',
        onClick: () => {
          const url = 'http://localhost:3001/municipalities?field=väkiluku&order=desc&limit=10';
          const options = {field: 'väkiluku', order: 'desc'};
          this.runQuery(url, options);
        }
      },
      {
        text: 'Huonoin työllisyysaste',
        onClick: () => {
          const url = 'http://localhost:3001/municipalities?field=työllisyysaste&order=asc&limit=10';
          const options = {field: 'työllisyysaste', order: 'asc'};
          this.runQuery(url, options);
        }
      },
      {
        text: 'Eniten eläkeläisiä',
        onClick: () => {
          const url = 'http://localhost:3001/municipalities?field=eläkeläisten_osuus_väestöstä&order=desc&limit=10';
          const options = {field: 'eläkeläisten_osuus_väestöstä', order: 'desc'};
          this.runQuery(url, options);
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
            onMunicipalityClick={this.onMunicipalityClick}
            onRegionClick={this.onRegionClick}
            onRegionCloseClick={this.onRegionCloseClick}
            selectionMode={this.state.selectionMode}
            selectedRegion={this.state.selectedRegion} />

          {this.state.info
          ? <ResultTable info={this.state.info} />
          : this.state.selectedResults.length > 0
            ? <CompareTable results={this.state.selectedResults} options={this.state.queryOptions} />
            : <p className="help-text">Aloita valitsemalla kartalta jokin maakunta!</p>}
        </div>

        <ControlPanel buttons={controlPanelButtons}/>
        <QueryBuilder onSubmit={this.onQueryBuilderSubmit}/>

      </div>
    );
  }
}

export default App;
