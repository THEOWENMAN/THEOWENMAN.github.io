// Grid-Base Game: Checkers
// Owen Tang
// March 26, 2025
// Extra for Experts:
// Implemented the null value, and expaneded on the different methods on using 2D arrays


// Declare global variables
let board;
let pieces;
let turn = "black";
let state = "start";
let movingSound;
let selectedPiece = null;
let winner = null;
let redPieces = 12;
let blackPieces = 12;

// Declare constants
const CELL_SIZE = 80;
const ROWS_COLS = 8;
const GREYSQUARE = 0;
const WHITESQUARE = 1;
const REDPIECE = 2;
const BLACKPIECE = 3;
const GREENSQUARE = 5;
const DIAMETER = 50;

// Load in the sound for moving pieces
function preload(){
  movingSound = createAudio("ficha-de-ajedrez-34722.mp3");
}

// Setup the Canvas and generating the board and pieces using arrays
function setup() {
  createCanvas(CELL_SIZE * ROWS_COLS, CELL_SIZE * ROWS_COLS);
  board = generateBoard(ROWS_COLS, ROWS_COLS);
  pieces = generatePieces(ROWS_COLS, ROWS_COLS);
}

// Shows different screens based on the state variable
function draw() {
  if(state === "start"){
    startScreen();
  }
  else if(state === "game"){
    gameTime();
  }
  else if(state === "win"){
    winScreen();
  }
  else if(state === "tie"){
    tieScreen();
  }
}

// Start screen function, displays button and title
function startScreen(){
  background("lightgreen");
  // Button
  fill(255); 
  rect(width/2 - 150, height/2, 250, 100);
  fill(0); 
  textSize(32);
  textAlign(CENTER, CENTER); 
  text("Start", width/2 - 150 + 125, height/2 + 50); 
  // Title
  textSize(110);
  fill(0);
  textFont('Times New Roman');
  text("CHECKERS", width/2 - 150 + 125, height/2 - 200); 
}

// Displays the tie screen
function tieScreen(){
  background("black");
  textAlign(CENTER, CENTER); 
  textSize(150);
  fill("white");
  textFont('Times New Roman');
  text("TIE", width/2, height/2);  
}

// Displays the win screen for either red or black
function winScreen(){
  background("black");
  textAlign(CENTER, CENTER); 
  textSize(150);
  fill("white");
  textFont('Times New Roman');
  if (winner === "red"){
    text("RED", width/2, height/2);  
  }
  else if (winner ===  "black"){
    text("BLACK", width/2, height/2);  
  }
}

// Function that starts the game
function gameTime(){
  background(0);
  displayBoard();
  displayPieces();
}

// Displays the board using squares
function displayBoard(){
  for(let y = 0; y < ROWS_COLS; y++){
    for(let x = 0; x < ROWS_COLS; x++){
      if(board[y][x] === GREYSQUARE){
        fill("grey");
      }
      else if (board[y][x] === WHITESQUARE){
        fill("white");
      }
      else if (board[y][x] === GREENSQUARE){
        fill("green");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

// Displays the pieces using circles
function displayPieces(){
  for(let y = 0; y < ROWS_COLS; y++){
    for(let x = 0; x < ROWS_COLS; x++){
      if(pieces[y][x] === REDPIECE){
        fill("red");
        circle(x * CELL_SIZE + CELL_SIZE/2, y * CELL_SIZE + CELL_SIZE/2, DIAMETER);
      }
      else if(pieces[y][x] === BLACKPIECE){
        fill("black");
        circle(x * CELL_SIZE + CELL_SIZE/2, y * CELL_SIZE + CELL_SIZE/2, DIAMETER);
      }
    }
  }
}

// Generates the board by pushing the squares in
function generateBoard(){
  let newBox = [];
  for(let y = 0; y < ROWS_COLS; y++){
    newBox.push([]);
    for(let x = 0; x < ROWS_COLS; x++){
      if((x + y) % 2 === 0){
        newBox[y].push(WHITESQUARE);
      }
      else{
        newBox[y].push(GREYSQUARE);
      }
    }
  }
  return newBox;
}

// Generates the pieces by pushing the circles in and 0 for empty spots
function generatePieces(){
  let newPieces = [];
  for (let y = 0; y < ROWS_COLS; y++){
    newPieces.push([]);
    for (let x = 0; x < ROWS_COLS; x++){
      if ((x+y) % 2 !== 0){
        if (y<3){
          newPieces[y].push(REDPIECE);
        }
        else if (y>4){
          newPieces[y].push(BLACKPIECE);
        }
        else {
          newPieces[y].push(GREYSQUARE);
        }
      }
      else {
        newPieces[y].push(GREYSQUARE);
      }
    }
  }
  return newPieces;
}

// Function for mouse to press start button and to select pieces
function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);
  if (state === "start" && mouseX > width/2-150 && mouseX < width/2-150+250 && mouseY > height/2 && mouseY <height/2+100){
    state = "game";
  }

  if (x < 0 || x >= ROWS_COLS || y < 0 || y >= ROWS_COLS) {
    return;
  } 
  if (board[y][x] === GREENSQUARE && selectedPiece){
    movePiece(selectedPiece.x, selectedPiece.y, x, y);
    return;
  }
  selectPiece(x,y);
}

// Highlights the selected piece's movable square and handles the deselection
function selectPiece(x,y){
  let colorPiece = pieces[y][x];
  if (turn === "red" && colorPiece !==REDPIECE || turn === "black" && colorPiece !== BLACKPIECE){
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

// Highlights and display the green squares based on the available moves of a piece
function availableMoves(x,y){
  if (pieces[y][x] === REDPIECE){
    // Red piece moves
    if(y + WHITESQUARE < ROWS_COLS && x - WHITESQUARE >= GREYSQUARE && pieces[y + WHITESQUARE][x - WHITESQUARE] === GREYSQUARE){
      board[y + WHITESQUARE][x - WHITESQUARE] = GREENSQUARE;
    }
    if(y + WHITESQUARE < ROWS_COLS && x + WHITESQUARE < ROWS_COLS && pieces[y + WHITESQUARE][x + WHITESQUARE] === GREYSQUARE){
      board[y + WHITESQUARE][x + WHITESQUARE] = GREENSQUARE;
    }
    // Red capture moves
    if(y + REDPIECE < ROWS_COLS && x - REDPIECE >= GREYSQUARE && pieces[y + WHITESQUARE][x - WHITESQUARE] === BLACKPIECE && pieces[y + REDPIECE][x - REDPIECE] === GREYSQUARE){
      board[y + REDPIECE][x - REDPIECE] = GREENSQUARE;
    }

    if(y + REDPIECE < ROWS_COLS && x + REDPIECE < ROWS_COLS && pieces[y + WHITESQUARE][x + WHITESQUARE] === BLACKPIECE && pieces[y + REDPIECE][x + REDPIECE] === GREYSQUARE){
      board[y + REDPIECE][x + REDPIECE] = GREENSQUARE;
    }
  }
  else if(pieces[y][x] === BLACKPIECE){
    // Black piece move
    if(y - WHITESQUARE >= GREYSQUARE && x + WHITESQUARE < ROWS_COLS && pieces[y - WHITESQUARE][x + WHITESQUARE] === GREYSQUARE){
      board[y - WHITESQUARE][x + WHITESQUARE] = GREENSQUARE;
    }
    if(y - WHITESQUARE >= GREYSQUARE && x - WHITESQUARE >= GREYSQUARE && pieces[y - WHITESQUARE][x - WHITESQUARE] === GREYSQUARE){
      board[y - WHITESQUARE][x - WHITESQUARE] = GREENSQUARE;
    }
    // Black capture moves
    if(y - REDPIECE >= GREYSQUARE && x + REDPIECE < ROWS_COLS && pieces[y - WHITESQUARE][x + WHITESQUARE] === REDPIECE && pieces[y - REDPIECE][x + REDPIECE] === GREYSQUARE){
      board[y - REDPIECE][x + REDPIECE] = GREENSQUARE;
    }
    if(y - REDPIECE >= GREYSQUARE && x - REDPIECE >= GREYSQUARE && pieces[y - WHITESQUARE][x - WHITESQUARE] === REDPIECE && pieces[y - REDPIECE][x - REDPIECE] === GREYSQUARE){
      board[y - REDPIECE][x - REDPIECE] = GREENSQUARE;
    } 
  }
}

// Moves the piece, handles captures, switch turns, and resets selection
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
    let capturedPiece = pieces[captureY][captureX];
    if (capturedPiece === REDPIECE){
      redPieces--;
    }
    else if(capturedPiece === BLACKPIECE){
      blackPieces--;
    }
    pieces[captureY][captureX] = 0;
  }
  movingSound.play();
  selectedPiece = null;
  resetPieceSelectionColor();
  if (turn === "red"){
    turn = "black";
  }
  else{
    turn = "red";
  }
  checkGameOver();
}

// Function to reset the green squares back to grey 
function resetPieceSelectionColor(){
  for(let y = 0; y < ROWS_COLS; y++){
    for(let x = 0; x < ROWS_COLS; x++){
      if(board[y][x] === 5){
        board[y][x] = 0;
      }
    }
  }
}

// Logic function to check which piece color wins with # of moves and # of pieces
function checkGameOver(){
  const {redMoves, blackMoves } = checkRemainingMoves();
  if(redPieces === GREYSQUARE || redMoves === GREYSQUARE){
    if(blackPieces > redPieces){
      winner = "black";
      state = "win";
    }
    else if(redPieces > blackPieces) {
      winner = "red";
      state = "win";
    }
    else{
      state = "tie";
    }
  }
  else if(blackPieces === GREYSQUARE || blackMoves === GREYSQUARE){
    if(redPieces > blackPieces){
      winner = "red";
      state = "win";
    }
    else if(blackPieces > redPieces) {
      winner = "black";
      state = "win";
    }
    else{
      state = "tie";
    }
  }
}
 
// Checks if the piece can move and how much moves is left
function checkRemainingMoves(){
  let redMoves = 0;
  let blackMoves = 0;
  for (let y = 0; y < ROWS_COLS; y++){
    for(let x = 0; x < ROWS_COLS; x++){
      let piece = pieces[y][x];
      if(piece === REDPIECE && canRedMove(y,x)){
        redMoves++;
      }
      if(piece === BLACKPIECE && canBlackMove(y,x)){
        blackMoves++;
      }
    }
  }
  return {redMoves, blackMoves};
}

// Function to detect if the red or black piece has an available move
function canRedMove(y, x){
  return isMoveAvaliable(y + 1, x - 1) || isMoveAvaliable(y + 1, x + 1)||isCaptureAvaliable(y,x,1);
}
function canBlackMove(y, x){
  return isMoveAvaliable(y - 1, x - 1) || isMoveAvaliable(y - 1, x + 1)||isCaptureAvaliable(y,x,-1);
}

// Checks if the move is possible
function isMoveAvaliable(y,x){
  return y>=0 && y < ROWS_COLS && x >=0 && x < ROWS_COLS && pieces[y][x] === 0; 
}

// Checks if a piece capture is available
function isCaptureAvaliable(y, x, direction){
  let opponent;
  if(pieces[y][x] === 2){
    opponent = 3;
  }
  else {
    opponent = 2;
  }
  if(y + 2 * direction >= 0 && y + 2 * direction < ROWS_COLS && x - 2 >=0 && pieces[y + direction][x-1] === opponent && pieces[y + 2 * direction][x-2] === 0){
    return true;
  }
  if(y + 2 * direction >= 0 && y + 2 * direction < ROWS_COLS && x + 2 < ROWS_COLS && pieces[y + direction][x + 1] === opponent && pieces[y + 2 * direction][x+2] === 0){
    return true;
  }
  return false;
}