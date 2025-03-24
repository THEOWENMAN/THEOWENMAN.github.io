// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 50;
let grid;
let rows;
let cols;





function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.ceil(width/CELL_SIZE);
  rows = Math.ceil(height/CELL_SIZE);
  grid = generateRandomGrid(cols,rows);

}


function draw() {
  background(220);
  displayGrid();
}




function generateRandomGrid(cols,rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++ ){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){
      // toss a zero or one randomly
      if (random(0,100) < 50){
        newGrid[y].push(0);
      }
      else{
        newGrid[y].push[1];
      }
      return newGrid;
    } 
  }
}



function displayGrid(){
  for (let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      if (grid[y][x] === 0){
        fill("white");
      }
      else if(grid[y][x] === 1){
        fill("height");
      }
      rect(x*CELL_SIZE,y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}
