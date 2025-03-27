// Grid-Base Game: Checkers
// Owen Tang
// March 26, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let board;


const CELL_SIZE = 100;
const ROWS_COLS = 8;

function preload(){

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  board = generateBoard(ROWS_COLS, ROWS_COLS);
}

function draw() {
  background(144,238,144);
  displayBoard();
}

function displayBoard(){
  for(let y = 0; y < ROWS_COLS; y++){
    for(let x =0; x < ROWS_COLS; x++){
      if(board[y][x] === 0){
        fill("red");
      }
      else if (board[y][x] === 1){
        fill("black");
      }
      square(x*CELL_SIZE+335,y*CELL_SIZE+45, CELL_SIZE);
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