// Grid-Base Game: Checkers
// Owen Tang
// March 26, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let board;
let pieces;
let turn = "red";


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
      else if (board[y][x] === 5){
        fill("green");
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
        circle(x * CELL_SIZE+CELL_SIZE/2, y*CELL_SIZE+CELL_SIZE/2, 50);
      }
      else if(pieces[y][x] === 3){
        fill("black");
        circle(x * CELL_SIZE+CELL_SIZE/2, y*CELL_SIZE+CELL_SIZE/2, 50);
      }
    }
  }
}

function generateBoard(){
  let newBox = [];
  for(let y = 0; y < ROWS_COLS; y++){
    newBox.push([]);
    for(let x = 0; x < ROWS_COLS; x++){
      if((x + y) % 2 === 0){
        newBox[y].push(1);
      }
      else{
        newBox[y].push(0);
      }
    }
  }
  return newBox;
}

function generatePieces(){
  let newPieces = [];
  for (let y = 0; y < ROWS_COLS; y++){
    newPieces.push([]);
    for (let x = 0; x < ROWS_COLS; x++){
      if ((x+y) % 2 !== 0){
        if (y<3){
          newPieces[y].push(2);
        }
        else if (y>4){
          newPieces[y].push(3);
        }
        else {
          newPieces[y].push(0);
        }
      }
      else {
        newPieces[y].push(0);
      }
    }
  }
  // create this into one big array and places with not 2 or 3 is 0
  return newPieces;

}

function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  selectPiece(x,y);

}

function selectPiece(x,y){
  if (x >= 0 && x < CELL_SIZE && y >= 0 && y < CELL_SIZE && turn === "black"){
    if(pieces[y][x] === 3 && pieces[y-1][x+1] !==3){
      board[y - 1][x + 1] = 5;
    }
    if(pieces[y][x] === 3 && pieces[y-1][x-1] !==3){
      board[y - 1][x - 1] = 5;
    }
    if(pieces[y][x] !== 3){
      resetPieceSelectionColor();
    }
  }
  else if (x >= 0 && x < CELL_SIZE && y >= 0 && y < CELL_SIZE && turn === "red"){
    if(pieces[y][x] === 2 && pieces[y+1][x-1] !==2){
      board[y + 1][x - 1] = 5;
    }
    if(pieces[y][x] === 2 && pieces[y+1][x+1] !==2){
      board[y + 1][x + 1] = 5;
    }
    if(pieces[y][x] !== 2){
      resetPieceSelectionColor();
    }
  }
}

// if turn and hightlight the piece clicked again should deselect or if another piece is click that old piece should deseletc 

function resetPieceSelectionColor(){
  for(let y = 0; y < ROWS_COLS; y++){
    for(let x = 0; x < ROWS_COLS; x++){
      if(board[y][x] === 5){
        board[y][x] = 0;
      }
    
    }
    
  }
}

// click on peice to put down, click on other piece put down, click anywhere or other piece put down



// x and y vairbles to toggle off and on

// border use css or javascript

function movePieces(){}
// add turn on the right of the checker board
// add king promotion rules if have time
// better design of the checker peices and board maybe
// screens, start, win, lose, etc