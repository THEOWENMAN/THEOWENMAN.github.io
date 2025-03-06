// Bpuncing Ball Object Demo
// Owen Tang
// March 5, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall();
}

function draw() {
  background(220);
  for(let ball of ballArray){
    moveBalls(ball);
    displayBall(ball);
  }
}

function moveBalls(ball){
  //move ball
  ball.x+=ball.dx;
  ball.y+=ball.dy;

  //teleport around edge of screen
  if (ball.x - ball.radius>width){
    ball.x = -ball.radius;
  } 
  else if (ball.x+ball.radius<0){
    ball.x = width + ball.radius;
  } 
  else if (ball.y-ball.radius>height){
    ball.y = -ball.radius;
  } 
  else if (ball.y+ball.radius<0){
    ball.y = height+ ball.radius;
  } 
}



function displayBall(ball){
  //display ball
  noStroke();
  fill("red");
  circle(ball.x, ball.y, ball.radius*2);
}


function mousePressed(){
  spawnBall();
}

function spawnBall(){
  let someBall = {
    x: random(width),
    y: random(height),
    radius: random(100,200),
    dx: random(-5,5), 
    dy: random(-5,5), 
  };
  ballArray.push(someBall);
}