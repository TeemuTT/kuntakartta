import React, { Component } from 'react';
import './CompareTable.css';
import { fields } from '../QueryBuilder/Fields.js';
import { units } from './UnitMapper.js';

class CompareTable extends Component {
  constructor(props) {
    super(props);
    if (props.options) {
      this.state = {
        field: props.options.field,
        flash: true
      };
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.options) {
      this.setState({
        field: nextProps.options.field,
        flash: true
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      field: event.target.value
    });
  }

  render() {
    const { results } = this.props;
    if (!results || results.length < 2) {
      return null;
    }

    const sorted = results.sort((a, b) => {
      let v1 = parseFloat(a[this.state.field]);
      let v2 = parseFloat(b[this.state.field]);
      if (v1 === v2) return 0;
      if (this.props.options.order === 'asc') {
        const temp = v1;
        v1 = v2;
        v2 = temp;
      }
      return v1 < v2 ? 1 : -1;
    });

    const fieldOptions = Object.keys(fields).map((k, i) => {
      if (k === 'nimi') return null;
      return <option value={k} key={i}>{fields[k]}</option>
    });

    const rows = sorted.map((r, i) => {
      return (
        <tr key={i}>
          <td>{r.nimi}</td>
          <td>{r[this.state.field]} {units[this.state.field]}</td>
        </tr>
      );
    });

    setTimeout(() => {
      if (this.state.flash === true) {
        this.setState({ flash: false })
      }
    }, 1000);

    return (
      <div className="compare-table-container">
        <table>
          <thead>
            <tr>
              <th>Kunta</th>
              <th>
                <select value={this.state.field} onChange={this.handleChange.bind(this)}>
                  {fieldOptions}
                </select>
              </th>
            </tr>
          </thead>
          <tbody className={this.state.flash && 'flash'}>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CompareTable;
