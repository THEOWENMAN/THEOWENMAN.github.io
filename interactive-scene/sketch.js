// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y;
let dy;
let r;
let g;
let b;
let asteroids = [];
let score = 0;
let number;
let userinput = "";
let maxscrolls = 3;
let backgroundColor = 255;
let state = "start";
let freeze = true;
let switchTime = 0;
let waitTime = 5000;


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

function draw() {
  background(backgroundColor);
  gameStart();
  startScreen();
  game();
  instructions();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function gameStart(){
  if(keyCode===LEFT_ARROW){
    backgroundColor=0;
    state="game";
  }
  if(keyCode===RIGHT_ARROW){
    backgroundColor=255;
    state="instructions";
  }
  if(keyCode===82){
    backgroundColor=255;
    state="start";
  }
}

function instructions(){
  if(state==="instructions"){
    fill("black");
    text("instructions",60,60);
    text("....................",60,60); 
  }
}

function game(){
  if(state === "game"){
    drawAsteroid();
    moveAsteroid();
    repeatAsteroid();
    text("score: " + score, 50, 50);
    text("key: " + userinput, 50, 100);
    text("Max Scrolls: " + maxscrolls, 60, 150);
  }  
}

function startScreen(){
  if(state === "start"){
    fill("black");
    textSize(100);
    textAlign(CENTER);
    text("Asteroid Game", width/2, height/3);
  } 
}

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

function moveAsteroid() {
  for (let asteroid of asteroids) {
    asteroid.y += asteroid.dy;
  }
}

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

function mouseClicked() {
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

function colorChange(asteroid) {
  asteroid.r = random(0, 255);
  asteroid.g = random(0, 255);
  asteroid.b = random(0, 255);
}

function keyPressed(){
  if (keyCode>=48&&keyCode<=57){
    userinput = key;
  }
  else if(keyCode===BACKSPACE){
    userinput = "";
  }
}

function mouseWheel(){
  if (millis()>switchTime+waitTime&&maxscrolls>0){
    maxscrolls -= 1;
    switchTime = millis();
    freeze = !freeze;
  } 
}

function stopAsteroids(){
  if(freeze){
    for (let asteroid of asteroids) {
      asteroid.dy = 1; 
    }
  }
  else{
    for (let asteroid of asteroids) {
      asteroid.y = random(-100, 0);
      asteroid.x = random(width);
      asteroid.dy = 0; 
    }
  }
}


