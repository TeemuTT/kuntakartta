import React, { Component } from 'react';
import TableHeader from './TableHeader.js';
import { getFields } from './Util.js';
import './ResultTable.css';

class ResultTable extends Component {
  constructor() {
    super();
    this.state = {
      categories: ['Koulutus', 'Väestö', 'Työllisyys'],
      selected: 'Väestö'
    };
  }

  onHeaderClick = (header) => {
    this.setState({
      selected: header
    });
  }

  render() {
    const { info } = this.props;
    if (!info) {
      return null;
    }

    const fields = getFields(this.state.selected);

    const rows = fields.map((field, i) => {
      return (
        <tr key={i}>
          <td>{field.name}</td>
          <td>{info[field.key]} {field.unit}</td>
        </tr>
      );
    });

    return (
      <div className="result-table-container">
        <h2>{info.nimi}</h2>
        <table>
          <thead>
            <tr>
              <th colSpan="2">
                <TableHeader selected={this.state.selected}
                  categories={this.state.categories}
                  onClick={(header) => this.onHeaderClick(header)} />
              </th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ResultTable;
