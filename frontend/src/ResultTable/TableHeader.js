import React from 'react';
import './TableHeader.css';

const TableHeader = (props) => {
  const headers = props.categories.map((header, i) => {
    const selected = header === props.selected;
    return (
      <span key={i}
        className={selected ? "selected" : ""}
        onClick={() => props.onClick(header)}>
        {header}
      </span>
    );
  });

  return (
    <div className="table-header">
      {headers}
    </div>
  );
}

export default TableHeader;
