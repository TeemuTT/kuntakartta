import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

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
      </div>
    );
  }
}

export default App;
