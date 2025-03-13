// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bulletsArray = [];
let state = "startScreen";
let playerPosition;

const movement = 5;
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
  playerPosition = createVector(width/2,height/2);
}

function draw() {
  background(220);
  drawBall();
  move();

  for (let bullet of bulletsArray){
    drawBullet(bullet);
    moveBullet(bullet);
  }

  if (state === "start"){
    startScreen();
  }
  else if (state === "instructions"){
    instructions();
  }
  else if (state === "mapOne"){
    mapOne();
  }
  else if (state === "mapTwo"){
    mapTwo();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startScreen(){
  background(255);


}

function instructions(){
  
}

function mapOne(){
  
}

function mapTwo(){
  
}


function drawBall(){
  fill("black");
  circle(playerPosition.x,playerPosition.y, 20);
}

function spawnBullet(){
  let bullet = {
    pos: createVector(playerPosition.x, playerPosition.y),
    vel: createVector(mouseX - playerPosition.X, mouseY - playerPosition.y),
  };
  bulletsArray.push(bullet);
}

function moveBullet(bullet){
  bullet.pos.add(bullet.vel);
}

function playerWallDetection(){
  if (playerPosition.x > width-20){}
}

function mousePressed(){
  spawnBullet(bullet);
}

function drawBullet(bullet){
  fill("red");
  circle(playerPosition.x, playerPosition.y, 5); 
}

function move(){
  if (keyIsDown(87)||keyIsDown(UP_ARROW)) {//w
    playerPosition.y-=movement;
  }
  if (keyIsDown(65)||keyIsDown(LEFT_ARROW)) {//a
    playerPosition.x-=movement;
  }
  if (keyIsDown(83)||keyIsDown(DOWN_ARROW)) {//s
    playerPosition.y+=movement;
  }
  if (keyIsDown(68)||keyIsDown(RIGHT_ARROW)) {//d
    playerPosition.x+=movement;
  }
}