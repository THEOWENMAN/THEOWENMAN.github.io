// Grid-Base Game: Checkers
// Owen Tang
// March 26, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



//let board;

let board = [
  [0,"g",0,"g",0,"g",0,"g"],
  ["g",0,"g",0,"g",0,"g",0],
  [0,"g",0,"g",0,"g",0,"g"],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  ["b",0,"b",0,"b",0,"b",0],
  [0,"b",0,"b",0,"b",0,"b"],
  ["b",0,"b",0,"b",0,"b",0],
];



const CELL_SIZE = 80;
const ROWS_COLS = 8;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;

let redPeices = {
  x: 0,
  y: 0,
};

let blackPeices = {

};

function preload(){

}

function setup() {
  createCanvas(CELL_SIZE*ROWS_COLS, CELL_SIZE*ROWS_COLS);
  board = generateBoard(ROWS_COLS, ROWS_COLS);
}

function draw() {
  background(255);
  displayBoard();
  displayPeices();
}

function displayBoard(){
  for(let y = 0; y < ROWS_COLS; y++){
    for(let x = 0; x < ROWS_COLS; x++){
      if(board[y][x] === 0){
        fill("black");
      }
      else if (board[y][x] === 1){
        fill("red");
      }
      square(x*CELL_SIZE,y*CELL_SIZE, CELL_SIZE);
    }
  }
}

function displayPeices(){
  for(let y = 0; y < ROWS_COLS; y++){
    for(let x = 0; x < ROWS_COLS; x++){
      if (board[y][x] === "b"){
        fill("blue");
        circle(x*CELL_SIZE,y*CELL_SIZE,50);
      }
      else if (board[y][x] === "g"){
        fill("green");
        circle(x*CELL_SIZE,y*CELL_SIZE,50);
      }
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