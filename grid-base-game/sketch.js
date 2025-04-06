// Grid-Base Game: Checkers
// Owen Tang
// March 26, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let board;
let pieces;
let turn = "red";
let state = "game";
let selectedPiece = null;

const CELL_SIZE = 80;
const ROWS_COLS = 8;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;

function preload(){}

function setup() {
  createCanvas(CELL_SIZE*ROWS_COLS, CELL_SIZE*ROWS_COLS);
  board = generateBoard(ROWS_COLS, ROWS_COLS);
  pieces = generatePieces(ROWS_COLS, ROWS_COLS);
}

function draw() {
  if (state === "start"){
    startScreen();
  }
  else if (state === "game"){
    gameTime();
  }
  
}

function startScreen(){
  background("lightgreen");
}

function gameTime(){
  background(0);
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
  return newPieces;
}

function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  if (x < 0 || x >= ROWS_COLS || y < 0 || y >= ROWS_COLS) {
    return;
  } 
  if (board[y][x] === 5 && selectedPiece){
    movePiece(selectedPiece.x, selectedPiece.y, x, y);
    return;
  }
  selectPiece(x,y);
}

function selectPiece(x,y){
  let colorPiece = pieces[y][x];

  if (turn === "red" && colorPiece !==2 || turn === "black" && colorPiece !== 3){
    selectedPiece = null;
    resetPieceSelectionColor();
    return;
  }
  if (selectedPiece && selectedPiece.x === x && selectedPiece.y === y){
    selectedPiece = null;
    resetPieceSelectionColor();
    return;
  }
  resetPieceSelectionColor();
  selectedPiece = {
    x,
    y,
  };
  availableMoves(x,y);
}

function availableMoves(x,y){
  if (pieces[y][x] === 2){
    if( y + 1 < ROWS_COLS && x - 1 >= 0 && pieces[y + 1][x - 1] === 0){
      board[y + 1][x - 1] = 5;
    }
    if( y + 1 < ROWS_COLS && x + 1 && pieces[y + 1][x + 1] === 0){
      board[y + 1][x + 1] = 5;
    }

    // capture moves
    if(y + 2 < ROWS_COLS && x - 2 >= 0 && pieces[y + 1][x - 1] === 3 && pieces[y + 2][x - 2] === 0){
      board[y + 2][x - 2] = 5;
    }

    if(y + 2 < ROWS_COLS && x + 2 >= 0 && pieces[y + 1][x + 1] === 3 && pieces[y + 2][x + 2] === 0){
      board[y + 2][x + 2] = 5;
    }
  }
  else if (pieces[y][x] === 3){
    if( y - 1 < ROWS_COLS && x + 1 >= 0 && pieces[y - 1][x + 1] === 0){
      board[y - 1][x + 1] = 5;
    }
    if( y - 1 < ROWS_COLS && x - 1 && pieces[y - 1][x - 1] === 0){
      board[y - 1][x - 1] = 5;
    }

    // capture moves
    if(y - 2 < ROWS_COLS && x - 2 >= 0 && pieces[y - 1][x +1] === 2 && pieces[y - 2][x + 2] === 0){
      board[y - 2][x + 2] = 5;
    }

    if(y - 2 < ROWS_COLS && x - 2 >= 0 && pieces[y - 1][x - 1] === 2 && pieces[y - 2][x - 2] === 0){
      board[y - 2][x - 2] = 5;
    } 
  }
}

function movePiece(oldX, oldY, x, y){
  if(board[y][x] !== 5 && selectedPiece === null){
    return;
  }

  let movingPiece = pieces[oldY][oldX];

  pieces[y][x] = movingPiece;
  pieces[oldY][oldX] = 0;

  if(Math.abs(x - oldX) === 2 && Math.abs(y - oldY) === 2){
    let captureX = (x + oldX) / 2;
    let captureY = (y + oldY) / 2;
    pieces[captureY][captureX] = 0;
  }

  selectedPiece = null;
  resetPieceSelectionColor();
  if (turn === "red"){
    turn = "black";
  }
  else{
    turn = "red";
  }
}



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


// add turn on the right of the checker board
// add king promotion rules if have time
// better design of the checker peices and board maybe
// screens, start, win, lose, etc







