export function bfs(grid, start, finish) {
    const visitedBoxes = [];
    grid[start.row][start.col].distance = 0;
    const unvisitedBoxes = getAllBoxes(grid);
    while (unvisitedBoxes.length !== 0) {
        unvisitedBoxes.sort((a, b) => a.distance - b.distance);
        let closestBox = unvisitedBoxes.shift();
        if (closestBox.distance === Infinity) return visitedBoxes;


        visitedBoxes.push(closestBox);
        closestBox.visited = true;
        if (closestBox === finish) return visitedBoxes;
        grid = updateGrid(closestBox, grid, start, finish);
    }
}

function updateGrid(box, grid, start, finish) {
    const { col, row } = box;

    if (row > 0 && !grid[row - 1][col].wall && !grid[row - 1][col].visited) {
        grid[row - 1][col].distance = hValue(box, finish) + gValue(box, finish);
        grid[row - 1][col].previous = box;
    }
    if (row < grid.length - 1 && !grid[row + 1][col].wall && !grid[row + 1][col].visited) {
        grid[row + 1][col].distance = hValue(box, finish) + gValue(box, finish);
        grid[row + 1][col].previous = box;
    }
    if (col > 0 && !grid[row][col - 1].wall && !grid[row][col - 1].visited) {
        grid[row][col - 1].distance = hValue(box, finish) + gValue(box, finish);
        grid[row][col - 1].previous = box;
    }
    if (col < grid[0].length - 1 && !grid[row][col + 1].wall && !grid[row][col + 1].visited) {
        grid[row][col + 1].distance = hValue(box, finish) + gValue(box, finish);
        grid[row][col + 1].previous = box;
    }
    return grid;

}

function hValue(box, finish) {
    return Math.abs(box.row - finish.row) + Math.abs(box.col - finish.col);
}

function gValue(box, start) {
    return Math.abs(box.row - start.row) + Math.abs(box.col - start.col);
}

function getAllBoxes(grid) {
    let boxes = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            boxes.push(grid[i][j]);
        }
    }
    return boxes;
}

export function shortestPath(finish) {
    const BoxesInOrder = [];
    let currentBox = finish;
    while (currentBox !== null) {
        currentBox.path = true;
        BoxesInOrder.unshift(currentBox);
        currentBox = currentBox.previous;
    }
    return BoxesInOrder;
}