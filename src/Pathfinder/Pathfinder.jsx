import React, { Component } from 'react';
import GridBox from './Grid/GridBox';


import './Pathfinder.css';

let startRow = 10;
let startCol = 5;
let finishRow = 10;
let finishCol = 44;
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
        this.setState({grid: updateWall(this.state.grid, row, col)});
    }

    mouseEnter(row, col) {
        if (this.state.clicking) {
            if(carryStart) {
                this.setState({grid: updateStart(this.state.grid, row, col)});
                return;
            }
            if(carryFinish) {
                this.setState({grid: updateFinish(this.state.grid, row, col)});
                return;
            }
            this.setState({grid: updateWall(this.state.grid, row, col)});
        }
    }

    mouseUp() {
        this.setState({clicking: false});
        carryStart = false;
        carryFinish = false;
    }

    clearWalls() {
        this.setState({grid: clearW(this.state.grid)});
    }

    render(){
        return (
            <div>
                <div className="header">
                    <div className="header-container">
                        <a href=".grid">Pathfinding Algorithm Visualization</a>
                    </div>
                </div>
                <div className="header-2">
                    <div className="button-container">
                        <button onClick={() => this.clearWalls()}>
                            Clear Walls
                        </button>
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

const updateWall = (grid, row, col) => {
    const newGrid = grid;
    newGrid[row][col].wall = !newGrid[row][col].wall;
    return newGrid;
};

const updateStart = (grid, row, col) => {
    const newGrid = grid;
    newGrid[startRow][startCol].start = false;
    newGrid[row][col].start = true;
    startRow = row;
    startCol = col;
    return newGrid;
};

const updateFinish = (grid, row, col) => {
    const newGrid = grid;
    newGrid[finishRow][finishCol].finish = false;
    newGrid[row][col].finish = true;
    finishRow = row;
    finishCol = col;
    return newGrid;
};

const clearW = (grid) => {
    const newGrid = grid;
    for (let row = 0; row < 30; row++) {
        for (let col = 0; col < 50; col++){
            newGrid[row][col].wall = false;
        }
    }
    return newGrid;
}