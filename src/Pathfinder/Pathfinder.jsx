import React, { Component } from 'react';
import GridBox from './Grid/GridBox';

import './Pathfinder.css';

let startRow = 10;
let startCol = 5;
let finishRow = 10;
let finishCol = 45;
let carryStart = false;
let carryFinish = false;


export default class Pathfinder extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            clicking: false,
        };
    }
    
    componentDidMount() {
        this.setState({grid: getGrid()});
    }
        
    mouseDown(row, col) {
        this.setState({clicking: true});
        if (row === startRow && col === startCol) {
            carryStart = true;
            return;
        }
        if (row === finishRow && col === finishCol) {
            carryFinish = true;
            return;
        }
        this.updateWall(row, col);
    }

    mouseEnter(row, col) {
        if (this.state.clicking) {
            if(carryStart) {
                this.updateStart(row,col);
                startRow = row;
                startCol = col;
                return;
            }
            if(carryFinish) {
                this.updateFinish(row,col);
                finishRow = row;
                finishCol = col;
                return;
            }
            this.updateWall(row, col);
        }
    }

    mouseUp() {
        this.setState({clicking: false});
        carryStart = false;
        carryFinish = false;
    }
    
    updateWall(row, col) {
        this.state.grid[row][col].wall = !this.state.grid[row][col].wall;
        this.setState({grid: this.state.grid});
    }

    updateStart(row, col) {
        this.state.grid[startRow][startCol].start = false;
        this.state.grid[row][col].start = true;
        this.setState({grid: this.state.grid});
    }

    updateFinish(row, col) {
        this.state.grid[finishRow][finishCol].finish = false;
        this.state.grid[row][col].finish = true;
        this.setState({grid: this.state.grid});
    }

    clearWalls() {
        for (let row = 0; row < 30; row++){
            for (let col = 0; col < 50; col++){
                this.state.grid[row][col].wall = false;
            }
        }
        this.setState({grid: this.state.grid});
    }

    render(){
        return (
            <div>
                <div className="header">
                    <div className="header-container">
                        <a>Pathfinding Algorithm Visualization</a>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={() => this.clearWalls()}>
                        Clear Walls
                    </button>
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
                                            onMouseDown={() => this.mouseDown(row, col)}
                                            onMouseEnter={() => this.mouseEnter(row, col)}
                                            onMouseUp={() => this.mouseUp()}
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