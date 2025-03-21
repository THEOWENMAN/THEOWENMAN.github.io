// 2D Array Grid Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// let grid = [[0,1,1,0],
//             [1,1,0,0],
//             [0,0,1,1],
//             [0,1,0,0],
// ];

// const CELL_SIZE = 200; // do this if you are just choosing the size
let cellSize;
const SQUARE_DIMENTIONS = 10;
let grid;


function setup() {
  createCanvas(windowWidth, windowHeight);
  if(height > width){
    cellSize = width / SQUARE_DIMENTIONS;
  }
  else{
    cellSize = height / SQUARE_DIMENTIONS;
  }

  grid = genereateRandomGrid(SQUARE_DIMENTIONS, SQUARE_DIMENTIONS);
}

function draw() {
  background(220);
  displayGrid();
}

function keyPressed(){
  if (key === "r"){
    grid = genereateRandomGrid(SQUARE_DIMENTIONS, SQUARE_DIMENTIONS);
  }
}

function displayGrid(){
  for (let y = 0; y < SQUARE_DIMENTIONS; y++){
    for(let x = 0; x < SQUARE_DIMENTIONS; x++){
      if (grid[y][x] === 1){
        fill("black");
      }
      else if (grid[y][x] === 0){
        fill("white");
      }
      rect(x*cellSize, y*cellSize ,cellSize, cellSize);
    }
  }
}

function genereateGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function genereateRandomGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++){
      if(random(100) < 50){
        newGrid[y].push(0);
      }
      else{
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}



