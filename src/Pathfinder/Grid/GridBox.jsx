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
        } = this.props;

        const extraClass = finish ? 'finish'
            : start ? 'start'
            : wall ? 'wall'
            : '';

        return (
            <div
                id={`box:${row},${col}`}
                className={`box ${extraClass}`}
            
            ></div>
        )
    }
}