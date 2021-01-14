import React, { Component } from 'react';
import './GridBox.css'

export default class GridBox extends Component {
    render() {
        const {
            row,
            col,
            start,
            finish,
            wall,
            visited,
            path,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;

        const extraClass = finish ? 'finish'
            : start ? 'start'
            : path ? 'path'
            : visited ? 'visited'
            : wall ? 'wall'
            : '';

        return (
            <div
                id={`box:${row},${col}`}
                className={`box ${extraClass}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}
            ></div>
        );
    }
}