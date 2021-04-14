const maze = document.querySelector("#canvas");
const ctx = maze.getContext("2d");

// will refrence the current cell
let current;

// This class is to create the maze
class Maze {
  constructor(size, rows, columns) {
    this.size = size;
    this.rows = rows;
    this.columns = columns;
    // Here we will save each grid (rows)
    this.grid = [];
    this.stack = [];
  }

  setUp() {
    // Creating a loop, for each row we loop all the columns in the row and creat a
    // cell instance and save it's index in the row list
    // Then we push the row to the grid list.
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      // Looping the columns, and creating the cell instance
      for (let c = 0; c < this.columns; c++) {
        let cell = new Cell(r, c, this.grid, this.size);
        row.push(cell);
      }

      this.grid.push(row);
    }
    // Here will the maze starts, top left
    current = this.grid[0][0];
  }

  // A method to draw the cells
  draw() {
    // The height and width of the canvas
    maze.width = this.size;
    maze.height = this.size;
    maze.style.background = "black";
    current.visited = true;

    // For each row and coulmn we are drawing a cell
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let grid = this.grid;
        // Getting the current cell and calling the show method
        grid[r][c].show(this.size, this.rows, this.columns);
      }
    }

    let next = current.checkNeighbours();

    if (next) {
      next.visited = true;

      this.stack.push(current);
      current.highlight(this.columns);
      current.removeWalls(current, next);

      current = next;
    } else if (this.stack.length > 0) {
      let cell = this.stack.pop();
      current = cell;
      current.highlight(this.columns);
    }

    if (this.stack.length == 0) {
      console.log("hi");
      return;
    }
    window.requestAnimationFrame(() => {
      this.draw();
    });
  }
}

class Cell {
  constructor(rowNum, coluNum, parentGrid, parentSize) {
    this.rowNum = rowNum;
    this.colNum = coluNum;
    this.parentGrid = parentGrid;
    this.parentSize = parentSize;
    this.visited = false;
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true,
    };
  }

  checkNeighbours() {
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbours = [];

    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    if (neighbours.length !== 0) {
      let random = Math.floor(Math.random() * neighbours.length);
      return neighbours[random];
    } else {
      return undefined;
    }
  }

  // Drawing the top wall of the cell
  drawTopWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / columns, y);
    ctx.stroke();
  }
  // Drawing the right wall fo the cell
  drawRightWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x + size / columns, y);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }
  // Drawing the bottom wall of the cell
  drawBottomWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / rows);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  // Drawing the left wall of the cell
  drawLeftWall(x, y, size, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size / rows);
    ctx.stroke();
  }

  highlight(columns) {
    let x = (this.colNum * this.parentSize) / columns + 1;
    let y = (this.rowNum * this.parentSize) / columns + 1;

    ctx.fillStyle = "purple";
    ctx.fillRect(
      x,
      y,
      this.parentSize / columns - 3,
      this.parentSize / columns - 3
    );
  }

  // A function to remove walls
  removeWalls(cell1, cell2) {
    let x = cell1.colNum - cell2.colNum;

    // We reomve the opposit wall
    if (x == 1) {
      cell1.walls.leftWall = false;
      cell2.walls.rightWall = false;
    } else if (x == -1) {
      cell2.walls.leftWall = false;
      cell1.walls.rightWall = false;
    }

    let y = cell1.rowNum - cell2.rowNum;

    if (y == 1) {
      cell1.walls.topWall = false;
      cell2.walls.bottomWall = false;
    } else if (y == -1) {
      cell1.walls.bottomWall = false;
      cell2.walls.topWall = false;
    }
  }

  show(size, rows, columns) {
    // Difining the x and y cordinate
    let x = (this.colNum * size) / columns;
    let y = (this.rowNum * size) / rows;

    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2;

    // Checking the walls if they are true or not
    if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
    if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
    if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
    if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
    if (this.visted) {
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
  }
}

let newMaze = new Maze(500, 20, 20);
newMaze.setUp();
newMaze.draw();
