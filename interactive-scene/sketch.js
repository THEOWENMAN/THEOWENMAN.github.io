// Interactive Scene
// Owen Tang
// March 4, 2025
// Purpose: The purpose of the project is to create an asteroid game with basic JS code
// Extra for Experts:
// I coded the mousescroll function for my extra for experts


// Global variables
let x;
let y;
let dy;
let r;
let g;
let b;
let asteroids = [];
let state = "start";
let userinput = "";
let score = 0;
let number;
let startScreenBG;
let gameStartBG;
let maxscrolls = 3;
let freeze = false;
let switchTime = 0;
let waitTime = 5000;
let freezeStart = 0;
let freezeDuration = 3000;

// Setting up all elements for the 10 asteroids and the canvas dimensions
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let x = 0; x < width; x += width / 10) {
    let asteroid = {
      x: random(0, width),
      y: random(-200, 0),
      dy: random(1, 3),
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
      number: floor(random(0, 10)),
    };
    asteroids.push(asteroid);
  }
}

// Run the three different screens
function draw() {
  if (state==="start"){
    startScreen();
  }
  else if (state==="game"){
    game();
  }
  else if (state==="instructions"){
    instructions();
  }
}

// Allows the canvas and window to be resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Loads the images/bgimages into the code
function preload() {
  startScreenBG = loadImage("space-bg.jpg"); 
  gameStartBG = loadImage("gamestart-bg.jpg");
}

// Instruction page: Includes different instructions expressed with text
function instructions(){
  background(255);
  fill("black");
  textSize(100);
  textAlign(CENTER,CENTER);
  text("Instructions",width/2,height/2-300);
  textSize(50);
  text("Instructions is button or key 'I'",width/2,height/2-100); 
  text("Main Page is key 'M'",width/2,height/2); 
  text("Game is button or key 'G'",width/2,height/2+100); 
  textSize(30);
  text("How to play? Press a number on keypad and use mouse to click on asteroid,",width/2,height/2+250); 
  text("score increases by 1 each time and use the scroll on mouse to pause time.",width/2,height/2+350);
}

// Game page: Includes asteroid functions and text for game information
function game(){
  image(gameStartBG,0,0,width,height);
  drawAsteroid();
  moveAsteroid();
  repeatAsteroid();
  textSize(30);
  text("Score: " + score, 70, 50);
  text("Key: " + userinput, 50, 100);
  text("Max Scrolls: " + maxscrolls, 110, 150);
}

// Start Screen Page: Start screen with the start and instruction buttons
function startScreen(){
  image(startScreenBG,0,0,width,height);
  drawStartButtons();
  fill("white");
  textSize(100);
  textAlign(CENTER,CENTER);
  text("Asteroid Game", width/2, height/4);
}

// Buttons for the start Screen
function drawStartButtons(){
  fill(255);
  rect(width/2-280,height/2,250,100);
  rect(width/2+20,height/2,250,100);
  fill(0); 
  textSize(32);
  textAlign(CENTER, CENTER); 
  text("Start", width/2-280+125, height/2+50); 
  text("Instructions", width/2+20+125, height/2+50);
}

// Asteroid section
// Creates the asteroid shapes, numbers, colors, and more
function drawAsteroid() {
  for (let asteroid of asteroids) {
    fill(asteroid.r, asteroid.g, asteroid.b);
    circle(asteroid.x, asteroid.y, 45);
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(asteroid.number, asteroid.x, asteroid.y);
  }
}

// Physics or movement of the asteroids
function moveAsteroid() {
  if(!freeze){
    for (let asteroid of asteroids) {
      asteroid.y += asteroid.dy;
    }
  }
  if (freeze&&millis()> freezeStart + freezeDuration){
    freeze = false;
  }
}

// Teleports the asteroids to the top after it hits the bottom of the screen
function repeatAsteroid() {
  for (let asteroid of asteroids) {
    if (asteroid.y > height) {
      asteroid.y = random(-100, 0);
      asteroid.x = random(width);
      asteroid.dy = random(1, 3);
      colorChange(asteroid);
      asteroid.number = floor(random(0, 10));
    }
  }
}

// Changes the asteroid colors
function colorChange(asteroid) {
  asteroid.r = random(0, 255);
  asteroid.g = random(0, 255);
  asteroid.b = random(0, 255);
}

// Action section
// Mouse clicks buttons start and instructions, and for clicking the asteroids
function mouseClicked() {
  if (state==="start"&&mouseX>width/2-280&&mouseX<width/2-280+250&&mouseY>height/2&&mouseY<height/2+100){
    state="game";
  }
  if (state==="start"&&mouseX>width/2+20&&mouseX<width/2+20+250&&mouseY>height/2&&mouseY<height/2+100){
    state="instructions";
  }
  for (let asteroid of asteroids) {
    let distance = dist(mouseX, mouseY, asteroid.x, asteroid.y);
    if (distance < 30 && int(userinput) === asteroid.number) {
      score += 1;
      userinput="";
      asteroid.y = random(-100, 0);
      asteroid.x = random(width);
      asteroid.dy = random(1, 3);
      colorChange(asteroid);
      asteroid.number = floor(random(0, 10));
    }
  }
}

// If letters are pressed, different screens show. Number keys are for the gameplay
function keyPressed(){
  if (keyCode>=48&&keyCode<=57){
    userinput = key;
  }
  else if(keyCode===BACKSPACE){
    userinput = "";
  }
  if(keyCode===71){
    state="game";
  }
  if(keyCode===73){
    state="instructions";
  }
  if(keyCode===77){
    state="start";
  }
}

// When scrolled freeze asteroids
function mouseWheel(){
  if (millis()>switchTime+waitTime&&maxscrolls>0){
    maxscrolls -= 1;
    switchTime = millis();
    freeze = true;
    freezeStart = millis();
  } 
}



