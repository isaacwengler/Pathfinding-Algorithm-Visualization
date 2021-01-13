import React, { Component } from 'react';
import GridBox from './Grid/GridBox';

import './Pathfinder.css';

var startRow = 10;
var startCol = 5;
var finishRow = 10;
var finishCol = 45;


export default class Pathfinder extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            running: false,
        };
    }
    
    componentDidMount() {
        this.setState({grid: getGrid()})
    }
        
        
    render(){
        return (
            <div>
                <div className="header">
                    <div className="header-container">
                        <a>Pathfinding Algorithm Visualization</a>
                    </div>
                </div>
                <div className="grid">
                    {this.state.grid.map((row, rowIndex) => {
                        return (
                            <div key={rowIndex}>
                                {row.map((box, boxIndex) => {
                                    const {row, col, finish, start, wall} = box;
                                    return (
                                        <GridBox 
                                            key={boxIndex}
                                            row={row}
                                            col={col}
                                            start={start}
                                            finish={finish}
                                            wall={wall}
                                        ></GridBox>
                                    );
                                }
                                )}
                            </div>
                        );
                    }
                    )}
                </div>
            </div>
        );
    }
}

const getGrid = () => {
    const grid = [];
    for (let row = 0; row < 30; row++) {
        const currRow = [];
        for (let col = 0; col < 50; col++){
            currRow.push(makeBox(col, row));
        }
        grid.push(currRow)
    }
    return grid;
};

const makeBox = (col, row) => {
    return {
        col,
        row,
        start: row === startRow && col === startCol,
        finish: row === finishRow && col === finishCol,
        wall: false,
        visited: false,
    };
};