// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y;
let dx = 5;
let dy = 5;
let bulletsArray = [];
let state = "startScreen";
// function preload() {
//   // connect to a p5party server
//   partyConnect(
//     "wss://demoserver.p5party.org",
//     "hello_party"
//   );
  
//   // tell p5.party to sync the pos object
//   pos = partyLoadShared("pos", pos);
  
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  let bulletStart = createVector(x, y);
  let bulletEnd = createVector(0, -1);
  x=width/2;
  y=height/2;
}

function draw() {
  background(220);
  drawBall();
  move();
  for (let bullet of bulletsArray){
    drawBullet(bullet);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startScreen(){

}

function instructions(){
  
}

function mapOne(){
  
}

function mapTwo(){
  
}

function drawBall(){
  fill("black");
  circle(x,y, 20);
}

function spawnBullet(){
  let bullet = {
    x: x,
    y: y,
    dx: dx,
    dy: dy,
  };
  bulletsArray.push(bullet);
}

function mousePressed(){
  spawnBullet();
}

function drawBullet(bullet){
  fill("red");
  circle(bullet.x, bullet.y, 5); 
}



function move(){
  if (keyIsDown(87)||keyIsDown(UP_ARROW)) {//w
    y-=dy;
  }
  if (keyIsDown(65)||keyIsDown(LEFT_ARROW)) {//a
    x-=dx;
  }
  if (keyIsDown(83)||keyIsDown(DOWN_ARROW)) {//s
    y+=dy;
  }
  if (keyIsDown(68)||keyIsDown(RIGHT_ARROW)) {//d
    x+=dx;
  }
}