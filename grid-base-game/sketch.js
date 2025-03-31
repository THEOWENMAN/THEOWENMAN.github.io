// Grid-Base Game: Checkers
// Owen Tang
// March 26, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let board;
let pieces;
let state = false;

const CELL_SIZE = 80;
const ROWS_COLS = 8;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;


function preload(){

}

function setup() {
  createCanvas(CELL_SIZE*ROWS_COLS, CELL_SIZE*ROWS_COLS);
  board = generateBoard(ROWS_COLS, ROWS_COLS);
  pieces = generatePieces(ROWS_COLS, ROWS_COLS);
}

function draw() {
  background(255);
  displayBoard();
  displayPieces();
}

function displayBoard(){
  for(let y = 0; y < ROWS_COLS; y++){
    for(let x = 0; x < ROWS_COLS; x++){
      if(board[y][x] === 0){
        fill("grey");
      }
      else if (board[y][x] === 1){
        fill("white");
      }
      square(x*CELL_SIZE,y*CELL_SIZE, CELL_SIZE);
    }
  }
}

function displayPieces(){
  for(let y = 0; y < ROWS_COLS; y++){
    for(let x = 0; x < ROWS_COLS; x++){
      if(pieces[y][x] === 2){
        fill("red");
      }
      else if(pieces[y][x] === 3){
        fill("black");
      }
      circle(x * CELL_SIZE+CELL_SIZE/2, y*CELL_SIZE+CELL_SIZE/2, 50);
    }
  }
}

function generateBoard(){
  let isColor = false;
  let newBox = [];
  for(let y = 0; y < ROWS_COLS; y++){
    newBox.push([]);
    for(let x =0; x < ROWS_COLS; x++){
      if(isColor){
        newBox[y].push(0);
      }
      else{
        newBox[y].push(1);
      }
      isColor = !isColor;
    }
    isColor = !isColor;
  }
  return newBox;
}

function generatePieces(){
  let newPieces = [];
  for (let y = 0; y < ROWS_COLS; y++){
    newPieces.push([]);
    for (let x = 0; x < ROWS_COLS; x++){
      if ((x+y) % 2 !== 0 && y > 0 && y < 3){
        newPieces[y].push(2);
      }
      if ((x+y) % 2 !== 0 && y > 5 && y < 8){
        newPieces[y].push(3);
      }
    }
  }


  // create this into one big array and places with not 2 or 3 is 0
  return newPieces;

}

function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  selectPeice(x,y);

}

function selectPeice(x,y){
  if (x >= 0 && x < CELL_SIZE && y >= 0 && y < CELL_SIZE){
    
  }
}