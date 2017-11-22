import React, { Component } from 'react';
import './QueryBuilder.css';
import { fields } from './Fields.js';

class QueryBuilder extends Component {
  constructor() {
    super();
    this.state = {
      field: 'taajamaaste'
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { limit, target, order, field } = this.state;
    this.props.onSubmit(target, field, order, limit);
  }

  render() {
    const fieldOptions = Object.keys(fields).map((k, i) => {
      if (k === 'nimi') return null;
      return <option value={k} key={i}>{fields[k]}</option>
    });
    return (
      <div className="query-builder-container">
        <h2>Rakenna oma kyselysi!</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="formfield">
            <label>Tulosten määrä</label>
            <input name="limit" type="number" placeholder="Tulosten määrä" min="1" max="10"
              value={this.state.limit || ''}
              onChange={this.handleChange} />
          </div>

          <fieldset>
            <legend>Kohde</legend>
            <div className="radio-with-label">
              <input type="radio" id="municipality" name="target" value="municipalities"
                checked={this.state.target === 'municipalities'}
                onChange={this.handleChange} />
              <label htmlFor="municipality">Kuntaa</label>
            </div>
            <div className="radio-with-label">
              <input type="radio" id="region" name="target" value="regions"
                checked={this.state.target === 'regions'}
                onChange={this.handleChange} />
              <label htmlFor="region">Maakuntaa</label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Lajittelu</legend>
            <div className="radio-with-label">
              <input type="radio" id="asc" name="order" value="asc"
                checked={this.state.order === 'asc'}
                onChange={this.handleChange} />
              <label htmlFor="asc">Nousevassa järjestyksessä</label>
            </div>
            <div className="radio-with-label">
              <input type="radio" id="desc" name="order" value="desc"
                checked={this.state.order === 'desc'}
                onChange={this.handleChange} />
              <label htmlFor="desc">Laskevassa järjestyksessä</label>
            </div>
          </fieldset>

          <div className="formfield">
            <label>Vertailtava arvo</label>
            <select value={this.state.field || 'väkiluku'} onChange={this.handleChange} name="field">
              {fieldOptions}
            </select>
          </div>

          <div className="formfield">
            <label></label>
            <input type="submit" value="Suorita!" />
          </div>
        </form>
      </div>
    );
  }
}

export default QueryBuilder;
