// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bulletsArray = [];
let state = "start";
let playerPosition;
let diameterPlayer = 20;
let diameterBullet = 5;

let instructionBG;
let mapTwoBG;
let mapOneBG;
let startScreenBG;


const movement = 3;
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

function preload() {
  startScreenBG = loadImage("instructionBG.png"); 
  mapOneBG = loadImage("background_1.avif");
  mapTwoBG = loadImage("background_2.jpg");
  instructionBG = loadImage("instructionBG.png");
  // audioAsteroidHit = createAudio("asteroid-hitting-something-152511.mp3");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function startScreen(){
  image(startScreenBG, 0, 0, width, height);
  startButtons();
  fill("black");
  textSize(90);
  textAlign(CENTER, CENTER);
  text("2D BRAWL STARS", width/2, height/4);
}

function instructions(){
  image(instructionBG, 0, 0, width, height);
  fill("black");
  textSize(100);
  textAlign(CENTER, CENTER);
  text("INSTRUCTIONS", width/2, height/2-160);
  textSize(50);
  text("WASD TO MOVE", width/2, height/2-50); 
  text("USE YOUR MOUSE TO SHOOT", width/2, height/2+50); 
}

function mapOne(){
  background("black");
  
}

function mapTwo(){
  background("white");
  
}

function startButtons(){
  fill(255);
  rect(width/2-480, height/2, 250, 100);
  rect(width/2-130, height/2, 250, 100);
  rect(width/2+220, height/2, 250, 100);
  fill(0); 
  textSize(32);
  textAlign(CENTER, CENTER); 
  text("MAP1", width/2-480+125, height/2+50); 
  text("MAP2", width/2-130+125, height/2+50);
  text("INFO", width/2+220+125, height/2+50);
}


function drawBall(){
  fill("black");
  circle(playerPosition.x,playerPosition.y, diameterPlayer);
}

function spawnBullet(){
  let direction = createVector(mouseX - playerPosition.x, mouseY - playerPosition.y);
  direction.normalize();
  direction.mult(5);
  let bullet = {
    pos: createVector(playerPosition.x, playerPosition.y),
    vel: direction,
  };
  bulletsArray.push(bullet);
}

function moveBullet(bullet){
  bullet.pos.add(bullet.vel);
}

function mousePressed(){
  spawnBullet();

  if (state === "start" && mouseX > width/2-480 && mouseX < width/2-480+250 && mouseY > height/2 && mouseY <height/2+100){
    state = "mapOne";
  }
}

function drawBullet(bullet){
  fill("red");
  circle(bullet.pos.x, bullet.pos.y, diameterBullet); 
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

  if (playerPosition.x - diameterPlayer>width){
    playerPosition.x = -diameterPlayer;
  } 
  else if (playerPosition.x+diameterPlayer<0){
    playerPosition.x = width + diameterPlayer;
  } 
  else if (playerPosition.y-diameterPlayer>height){
    playerPosition.y = -diameterPlayer;
  } 
  else if (playerPosition.y+diameterPlayer<0){
    playerPosition.y = height+ diameterPlayer;
  } 
}