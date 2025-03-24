// 2D Grid Neighbours Demo

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

  else if (key ==="e"){
    grid = genereateGrid(SQUARE_DIMENTIONS,SQUARE_DIMENTIONS);
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

function mousePressed(){
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //self
  toggleCell(x,y);

  //Neighbours
  toggleCell(x + 1,y);
  toggleCell(x, y + 1);
  toggleCell(x - 1,y);
  toggleCell(x, y - 1);
  
}
// y first then x
function toggleCell(x,y){
  // make sure cell you are toggling is actually in the grid

  if (x >= 0 && x < SQUARE_DIMENTIONS && y >= 0 && y < SQUARE_DIMENTIONS){
    if (grid[y][x] === 0 ){
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1 ){
      grid[y][x] = 0;
    }
  }



  
}




