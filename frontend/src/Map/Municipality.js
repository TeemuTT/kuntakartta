import React from 'react';
import './Municipality.css';

const Municipality = (props) => {
    const {d} = props;
    return (
        <path d={d} className="municipality-path"/>
    );
}

export default Municipality;
