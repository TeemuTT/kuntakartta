import React from 'react';
import './ResultTable.css';

const ResultTable = (props) => {
  const {info} = props;
  if (!info) {
    return null;
  }
  return (
    <div className="result-table-container">
      <h2>{info.nimi}</h2>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>Väkiluku</td>
            <td>{info.väkiluku}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
