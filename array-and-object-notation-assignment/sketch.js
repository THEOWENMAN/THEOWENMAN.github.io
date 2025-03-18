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
let instructionsBG;
let mapTwoBG;
let mapOneBG;
let startBG;
let startScreenBG;
let pos;


let wallsMapOne = [
  {x: 550, y: 150, w: 25, l: 200},
  {x: 350, y: 350, w: 225, l: 25},
  {x: 950, y: 150, w: 25, l: 200},
  {x: 950, y: 350, w: 225, l: 25},
  {x: 550, y: 500, w: 25, l: 200},
  {x: 350, y: 500, w: 225, l: 25},
  {x: 950, y: 500, w: 25, l: 200},
  {x: 950, y: 500, w: 225, l: 25},
];

let wallsMapTwo = [
  {x: -550, y: -15, w: 200, l: 30},
  {x: -250, y: -15, w: 200, l: 30},
  {x: 50, y: -15, w: 200, l: 30},
  {x: 350, y: -15, w: 200, l: 30},
];

const movement = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerPosition = createVector(width/2,height/2);
}

function draw() {
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
  startScreenBG = loadImage("startBG.png"); 
  mapOneBG = loadImage("background_1.avif");
  mapTwoBG = loadImage("background_2.jpg");
  instructionsBG = loadImage("instructionsBG.avif");
  // audioAsteroidHit = createAudio("asteroid-hitting-something-152511.mp3");

  partyConnect(
    "wss://demoserver.p5party.org", "hello_party");
  pos = partyLoadShared("pos", createVector(width/2,height/2));
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
  image(instructionsBG, 0, 0, width, height);
  fill("black");
  textSize(100);
  textAlign(CENTER, CENTER);
  text("INSTRUCTIONS", width/2, height/2-160);
  textSize(50);
  text("WASD TO MOVE", width/2, height/2-50); 
  text("USE YOUR MOUSE TO SHOOT", width/2, height/2+50); 
  text("1 = map1, 2 = map2, m = main menu, i = instructions", width/2, height/2+200); 
}

function mapOne(){
  background(mapOneBG);
  drawBall();
  move();
  for (let bullet of bulletsArray){
    drawBullet(bullet);
    moveBullet(bullet);
  }
  drawBarriersMapOne();
  wallDetectionBullet();
  wallDetectionPlayer();
}

function mapTwo(){
  background(mapTwoBG);
  drawBall();
  move();
  for (let bullet of bulletsArray){
    drawBullet(bullet);
    moveBullet(bullet);
  }
  drawBarriersMapTwo();
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
  direction.mult(4);
  let position = createVector(playerPosition.x, playerPosition.y);
  position.x += direction.x * (diameterPlayer/4);
  position.y += direction.y * (diameterPlayer/4);
  let bullet = {
    pos: position,
    vel: direction,
  };
  bulletsArray.push(bullet);
}

function moveBullet(bullet){
  bullet.pos.add(bullet.vel);
}

function mousePressed(){
  if (state === "start"){
    if (mouseX > width/2-480 && mouseX < width/2-480+250 && mouseY > height/2 && mouseY <height/2+100){
      state = "mapOne";
      return;
    }
    if (mouseX > width/2-130 && mouseX < width/2-130+250 && mouseY > height/2 && mouseY <height/2+100){
      state = "mapTwo";
      return;
    }
    if (mouseX > width/2+220 && mouseX < width/2+220+250 && mouseY > height/2 && mouseY <height/2+100){
      state = "instructions";
      return;
    }
  }
  spawnBullet();
}

function drawBullet(bullet){
  fill("red");
  circle(bullet.pos.x, bullet.pos.y, diameterBullet); 
}

function drawBarriersMapOne(){
  fill("black");
  for (let wall of wallsMapOne){
    rect(wall.x, wall.y, wall.w, wall.l);
  }
}

function wallDetectionBullet(){
  for(let i = bulletsArray.length - 1; i >= 0; i--){
    let bullet = bulletsArray[i];
    for (let wall of wallsMapOne){
      if (bullet.pos.x + diameterBullet/2 > wall.x && bullet.pos.x + diameterBullet/2 < wall.x + wall.w 
        && bullet.pos.y + diameterBullet/2 > wall.y && bullet.pos.y + diameterBullet/2 < wall.y + wall.l){
        let index = bulletsArray.indexOf(bullet);
        bulletsArray.splice(index,1);
      }
      if(bullet.pos.x + diameterBullet/2 > width || bullet.pos.x - diameterBullet/2 < 0 || 
        bullet.pos.y + diameterBullet/2 > height || bullet.pos.y - diameterBullet/2 < 0){
        let index = bulletsArray.indexOf(bullet);
        bulletsArray.splice(index,1);/////////////fix
      }
    }
  }
}

function wallDetectionPlayer(){
  for(let wall of wallsMapOne){
    if (playerPosition.x + diameterPlayer/2 > wall.x && playerPosition.x + diameterPlayer/2 < wall.w){
      playerPosition.x = wall.x - diameterPlayer/2;
    }
  }

}



function drawBarriersMapTwo(){
  fill("black");
  translate (width/2, height/2);
  rotate(QUARTER_PI/2);
  for (let wall of wallsMapTwo){
    rect(wall.x, wall.y, wall.w, wall.l);
  }
}

//top and bottom code

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
  
  if (playerPosition.x + diameterPlayer/2 > width){
    playerPosition.x = width - diameterPlayer/2;
  } 
  else if (playerPosition.x - diameterPlayer/2 < 0){
    playerPosition.x = diameterPlayer/2;
  } 
  else if (playerPosition.y + diameterPlayer/2 > height){
    playerPosition.y = height - diameterPlayer/2;
  } 
  else if (playerPosition.y - diameterPlayer/2 < 0){
    playerPosition.y = diameterPlayer/2;
  } 
}

function keyPressed(){

  if(keyCode === 49){//1
    state = "mapOne";
  }
  if(keyCode === 50){//2
    state = "mapTwo";
  }
  if(keyCode===73){//i
    state = "instructions";
  }
  if(keyCode===77){//m
    state = "start";
  }
}


// steps:
// p5 party
// bullet and player collisions
// sound effects

