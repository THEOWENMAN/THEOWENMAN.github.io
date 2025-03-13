// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerPosition;
let bulletsArray = [];
let state = "startScreen";
let dx = 5;
let dy = 5;
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
  let playerPosition = createVector(width/2, height/2);
}

function draw() {
  background(220);
  drawBall();
  move();
  for (let bullet of bulletsArray){
    drawBullet(bullet);
    moveBullet(bullet);
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

function moveBullet(bullet){
  bullet.pos.add(bullet.vel);
}

function drawBall(){
  fill("black");
  circle(width/2,height/2, 20);
}

function spawnBullet(){
  let bullet = {
    pos: createVector(playerPosition.x, playerPosition.y),
    vel: createVector(mouseX - playerPosition.X, mouseY - playerPosition.y),
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
    playerPosition-=dy;
  }
  if (keyIsDown(65)||keyIsDown(LEFT_ARROW)) {//a
    playerPosition-=dx;
  }
  if (keyIsDown(83)||keyIsDown(DOWN_ARROW)) {//s
    playerPosition+=dy;
  }
  if (keyIsDown(68)||keyIsDown(RIGHT_ARROW)) {//d
    playerPosition+=dx;
  }
}