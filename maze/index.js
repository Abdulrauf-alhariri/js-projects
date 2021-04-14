const gameLevel = document.querySelector(".game-level");
const start = document.querySelector(".btn-start");
const cool = document.querySelector(".btn-cool");
const moves = document.querySelector(".Moves");
const message = document.querySelector(".message-container");

let rows = 10;
let columns = 10;

window.onload = function () {
  let newMaze = new Maze(500, rows, columns, cucumber, cabbage);
  newMaze.setUp();
  newMaze.draw();

  // Checking if the player did hit the start button
  start.addEventListener("click", () => {
    // Getting the level that the player specified, and drawing the new maze

    rows = parseInt(gameLevel.value);
    columns = parseInt(gameLevel.value);

    newMaze = new Maze(500, rows, columns, cucumber, cabbage);

    newMaze.setUp();
    newMaze.draw();

    // Setting move to true
    move = true;
    steps = 0;
  });

  // Checking the keys that are being pressing
  document.addEventListener("keydown", (event) => {
    newMaze.moveImage(event);
  });

  // If it's gameover and the player clicked the cool button, the end game message will disappear
  cool.addEventListener("click", () => {
    message.classList.toggle("hidden");
  });
};

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// Getting the images that we are going to use in the game
let cucumber = new Image();
let cabbage = new Image();
cucumber.src = "cucumber.png";
cabbage.src = "cabbage.png";

// Reference the current cell, the cucumber index and the cabbage index
let current;
// Cucumber image
let cucumberColumn;
let cucumberRow;
// Cabbage image
let cabbageColumn;
let cabbageRow;

// Count steps
let steps = 0;
let move = false;

class Maze {
  // The arguments that we will need in this class
  constructor(size, rows, columns, cucumber, cabbage) {
    this.cucumber = cucumber;
    this.cabbage = cabbage;
    this.size = size;
    this.rows = rows;
    this.columns = columns;
    // Here we are going to save all the cells of the canvas
    this.grid = [];
    // In this list we are going to save the visited cells in the canvas
    this.stack = [];
    // Image size
    this.imageSizeX = this.size / this.columns - 6;
    this.imageSizeY = this.size / this.rows - 6;
    this.colCucumber = 0;
    this.rowCucumber = 0;
  }

  // This method is to define all the cells/ columns that the canvas is going to have
  // And then add it to the grid list, an instance of the cell class
  setUp() {
    for (let r = 0; r < this.rows; r++) {
      const row = [];
      for (let c = 0; c < this.columns; c++) {
        const cell = new Cell(r, c, this.size, this.grid);
        row.push(cell);
      }
      this.grid.push(row);
    }
    current = this.grid[0][0];
  }

  // A function to move the image
  moveImage(e) {
    let cell = this.grid[cucumberRow][cucumberColumn];
    // Moving the image to the left
    if (e.keyCode == 37 && move) {
      if (!cell.walls.leftWall) {
        this.removeImage();
        cell.show(this.size, this.columns, this.rows);
        this.colCucumber -= this.size / this.columns;
        cucumberColumn -= 1;
        ctx.drawImage(
          this.cucumber,
          this.colCucumber + 1,
          this.rowCucumber,
          this.imageSizeX,
          this.imageSizeY
        );
        steps++;
      }
    }

    // Moving the image to the right
    if (e.keyCode == 39 && move) {
      if (!cell.walls.rightWall) {
        this.removeImage();
        cell.show(this.size, this.columns, this.rows);
        this.colCucumber += this.size / this.columns;
        cucumberColumn += 1;
        ctx.drawImage(
          this.cucumber,
          this.colCucumber + 1,
          this.rowCucumber,
          this.imageSizeX,
          this.imageSizeY
        );
        steps++;
      }
    }

    // Moving the image down
    if (e.keyCode == 40 && move) {
      if (!cell.walls.bottomWall) {
        this.removeImage();
        this.rowCucumber += this.size / this.rows;
        cell.show(this.size, this.columns, this.rows);
        cucumberRow += 1;
        ctx.drawImage(
          this.cucumber,
          this.colCucumber + 1,
          this.rowCucumber,
          this.imageSizeX,
          this.imageSizeY
        );
        steps++;
      }
    }

    // Moving the image up
    if (e.keyCode == 38 && move) {
      if (!cell.walls.topWall) {
        this.removeImage();
        cell.show(this.size, this.columns, this.rows);
        this.rowCucumber -= this.size / this.rows;
        cucumberRow -= 1;
        ctx.drawImage(
          this.cucumber,
          this.colCucumber + 1,
          this.rowCucumber,
          this.imageSizeX,
          this.imageSizeY
        );
        steps++;
      }
    }

    if (cucumberColumn == cabbageColumn && cucumberRow == cabbageRow && move) {
      move = false;
      message.classList.toggle("hidden");
      moves.textContent = steps;
    }
  }

  // A method to remove the cucumber when we will move it
  removeImage() {
    ctx.clearRect(
      this.colCucumber + 1,
      this.rowCucumber,
      this.imageSizeX,
      this.imageSizeY
    );
  }

  // A function to draw the images in the canvas
  drawImage() {
    const randomColumn = Math.random();
    const randomRow = Math.random();
    let rowCabbage;
    let colCabbage;

    if (randomColumn < 0.5) {
      // Cucumber on first column, first row
      if (randomRow < 0.5) {
        cucumberColumn = 0;
        cucumberRow = 0;

        ctx.drawImage(
          this.cucumber,
          cucumberColumn + 1,
          cucumberRow + 2,
          this.imageSizeX,
          this.imageSizeY
        );

        // cabbage position
        colCabbage = this.size - this.size / this.columns;
        rowCabbage = this.size - this.size / this.rows;
        // Cabbage index
        cabbageColumn = this.grid.length - 1;
        cabbageRow = this.grid.length - 1;

        ctx.drawImage(
          this.cabbage,
          colCabbage + 2,
          rowCabbage + 2,
          this.imageSizeX,
          this.imageSizeY
        );
      }
      // First column and last row
      else {
        // Postion cucmber
        this.colCucumber = 0;
        this.rowCucumber = this.size - this.size / this.rows;
        // Index cucumber
        cucumberColumn = 0;
        cucumberRow = this.grid.length - 1;

        ctx.drawImage(
          this.cucumber,
          this.colCucumber + 1,
          this.rowCucumber,
          this.imageSizeX,
          this.imageSizeY
        );

        // Posiotn cabbage
        colCabbage = this.size - this.size / this.columns;
        rowCabbage = 0;

        // Index cabbage
        cabbageColumn = this.grid.length - 1;
        cabbageRow = 0;

        ctx.drawImage(
          this.cabbage,
          colCabbage + 2,
          rowCabbage + 2,
          this.imageSizeX,
          this.imageSizeY
        );
      }
    }
    // Last column and first row
    else {
      if (randomRow < 0.5) {
        // postion cucumber
        this.colCucumber = this.size - this.size / this.columns;
        this.rowCucumber = 0;

        // Index cucumber
        cucumberColumn = this.grid.length - 1;
        cucumberRow = 0;

        ctx.drawImage(
          this.cucumber,
          this.colCucumber + 1,
          this.rowCucumber,
          this.imageSizeX,
          this.imageSizeY
        );

        // Postion cabbage
        colCabbage = 0;
        rowCabbage = this.size - this.size / this.rows;

        // Index cabbage
        cabbageColumn = 0;
        cabbageRow = this.grid.length - 1;

        ctx.drawImage(
          this.cabbage,
          colCabbage + 2,
          rowCabbage + 2,
          this.imageSizeX,
          this.imageSizeY
        );
      } else {
        // Postion cucumber
        this.colCucumber = this.size - this.size / this.columns;
        this.rowCucumber = this.size - this.size / this.rows;

        // Index cucumber
        cucumberColumn = this.grid.length - 1;
        cucumberRow = this.grid.length - 1;

        ctx.drawImage(
          this.cucumber,
          this.colCucumber + 1,
          this.rowCucumber,
          this.imageSizeX,
          this.imageSizeY
        );
        cabbageColumn = 0;
        cabbageRow = 0;

        ctx.drawImage(
          this.cabbage,
          cabbageColumn + 2,
          cabbageRow + 2,
          this.imageSizeX,
          this.imageSizeY
        );
      }
    }
  }

  draw() {
    // Defining the width, height and the background of the canvas
    canvas.width = this.size;
    canvas.height = this.size;

    current.visited = true;

    // Looping over the list and getting the first cell at top left, which is the current cell
    for (let r of this.grid) {
      for (let c of r) {
        // While the current cell is visited so we will keep checking the nighbours, and backtraking in case
        // There is no neighbours availabe,
        // If there is no neighbours available and we are back to the top left cell, then we break the loop and draw the maze
        while (c.visited) {
          let next = c.checkNeighbours();
          if (next) {
            next.visited = true;
            this.stack.push(c);
            // c.highLight(this.columns);
            c.removeWalls(c, next);
            c = next;
          } // Here we are backtracing in case there is no neighbour to visit
          else if (this.stack.length > 0) {
            // We are removing the last cell we that we have visited and then saving its index to a varaible
            let cell = this.stack.pop();
            // Then we  are moving back to the last cell we visited
            c = cell;
            // c.highLight(this.columns);
          }

          if (this.stack.length === 0) {
            break;
          }
        }
      }
    }

    // Drawing the cabbage and cucumber image

    // Drawing the cells, calling the show method in each cell
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        this.grid[r][c].show(this.size, this.columns, this.rows);
      }
    }
    this.drawImage();
  }
}

class Cell {
  constructor(rowNum, colNum, parentSize, parentGrid) {
    this.rowNum = rowNum;
    this.colNum = colNum;
    this.parenGrid = parentGrid;
    this.parentSize = parentSize;
    this.visited = false;
    // An object for controling the drawing of walls
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true,
    };
  }

  // // A function to check the unvisited neighbours
  checkNeighbours() {
    // Getting the current column and row
    let col = this.colNum;
    let row = this.rowNum;
    let grid = this.parenGrid;
    const neighbours = [];

    // Here we are checking if the current column is not the first or last column in the row.
    // The same with the rows. If that is true then we return its neighbour otherwise we return undefined
    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    // Here we are checking if the variable is not undefined and if the cell is not visited yet.
    // If that is true then we added to our neighbours list
    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    if (neighbours.length !== 0) {
      // Here we are returning a random cell from the list
      return neighbours[Math.floor(Math.random() * neighbours.length)];
    } else {
      return undefined;
    }
  }

  highLight(columns) {
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
  // A method to draw the top wall
  drawTopWall(x, y, canvasSize, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + canvasSize / columns, y);
    ctx.stroke();
  }

  // Drawing the right wall
  drawRightWall(x, y, canvasSize, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x + canvasSize / columns, y);
    ctx.lineTo(x + canvasSize / columns, y + canvasSize / rows);
    ctx.stroke();
  }

  // Drawing the bottom wall
  drawBottomtWall(x, y, canvasSize, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y + canvasSize / rows);
    ctx.lineTo(x + canvasSize / columns, y + canvasSize / rows);
    ctx.stroke();
  }

  // Drawing the left wall
  drawLefttWall(x, y, canvasSize, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + canvasSize / rows);
    ctx.stroke();
  }

  // The method that we are gonna use to reomve a certien wall
  removeWalls(current, next) {
    // Checking if the next column is to the right or left. If the number we get is -1 so it means to the right, 1 means to the left
    let x = current.colNum - next.colNum;
    // -1 means down and 1 means up
    let y = current.rowNum - next.rowNum;

    // Removing the right wall of the current cell

    if (x === -1) {
      current.walls.rightWall = false;
      next.walls.leftWall = false;
    } // Removing the left wall of the current cell
    else if (x === 1) {
      current.walls.leftWall = false;
      next.walls.rightWall = false;
    }

    // Removing the top and bottom wals.
    if (y === -1) {
      current.walls.bottomWall = false;
      next.walls.topWall = false;
    } else if (y === 1) {
      current.walls.topWall = false;
      next.walls.bottomWall = false;
    }
  }

  // A method to draw the four walls
  show(size, columns, rows) {
    // We take the column or the row index, and then multiplcate it with the size and divide it by the amount of
    // columns or rows to get the index. We always start from 0, ex: (1 * 500) / columns => 10 = 50
    // index 50 the second cell starts at index 50 on x- kor
    let x = (this.colNum * size) / columns;
    let y = (this.rowNum * size) / rows;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    // Ckecking if there is a top, right, bottom, left wall
    if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
    if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
    if (this.walls.bottomWall) this.drawBottomtWall(x, y, size, columns, rows);
    if (this.walls.leftWall) this.drawLefttWall(x, y, size, columns, rows);
  }
}
