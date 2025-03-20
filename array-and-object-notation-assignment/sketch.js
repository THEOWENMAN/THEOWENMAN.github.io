// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//
let state = "start";
let playerPosition;

let instructionsBG;
// let mapTwoBG;
let mapOneBG;
let startBG;
let audioBulletShot;
let walls;

let me;
let guests;
let shared;

const movement = 3;
const diameterPlayer = 20;
const diameterBullet = 5;

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

// let wallsMapTwo = [
//   {x: 250, y: 400, w: 100, l: 30},
//   {x: 400, y: 400, w: 100, l: 30},
//   {x: 550, y: 400, w: 100, l: 30},
//   {x: 700, y: 400, w: 100, l: 30},
//   {x: 850, y: 400, w: 100, l: 30},
//   {x: 1000, y: 400, w: 100, l: 30},
//   {x: 1150, y: 400, w: 100, l: 30},
// ];

//
function preload() {
  startBG = loadImage("startBG.png"); 
  mapOneBG = loadImage("background_1.avif");
  // mapTwoBG = loadImage("background_2.jpg");
  instructionsBG = loadImage("instructionsBG.avif");
  audioBulletShot = createAudio("laser-312360.mp3");

  partyConnect("wss://demoserver.p5party.org", "array-and-object-notation-assignment");
  me = partyLoadMyShared({ x: random (100,500), y: random(100,500) });
  guests = partyLoadGuestShareds();
  shared = partyLoadShared("shared", {bulletsArray: []});
}

// 
function setup() {
  createCanvas(windowWidth, windowHeight);
  playerPosition = createVector(me.x, me.y);
}

//
function draw() {
  me.x = playerPosition.x;
  me.y = playerPosition.y;

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




// draw player and others
function drawOtherPlayers(){
  for (let guest of guests){
    fill("blue");
    circle(guest.x, guest.y, diameterPlayer);
    console.log(playerPosition.x, playerPosition.y);
  }
}

function drawMePlayer(){
  fill("green");
  circle(playerPosition.x, playerPosition.y, diameterPlayer);
}










// screens
function startScreen(){
  image(startBG, 0, 0, width, height);
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
  text("1 = map1, m = main menu, i = instructions", width/2, height/2+200); 
}

function mapOne(){
  background(mapOneBG);
  drawMePlayer();
  drawOtherPlayers();
  move();
  for (let bullet of shared.bulletsArray){
    drawBullet(bullet);
    moveBullet(bullet);
  }
  drawBarriersMapOne();
  wallDetectionBullet();
  wallDetectionPlayer();
  canvasDetectionBullet();
  playersHitDetection();
}

// function mapTwo(){
//   background(mapTwoBG);
//   drawMePlayer();
//   drawOtherPlayers();
//   move();
//   for (let bullet of shared.bulletsArray){
//     drawBullet(bullet);
//     moveBullet(bullet);
//   }
//   drawBarriersMapTwo();
//   wallDetectionBullet();
//   wallDetectionPlayer();
//   canvasDetectionBullet();
//   playersHitDetection();
// }

function startButtons(){
  fill(255);
  rect(width/2-300, height/2, 250, 100);
  rect(width/2+50, height/2, 250, 100);
  fill(0); 
  textSize(32);
  textAlign(CENTER, CENTER); 
  text("MAP1", width/2-300+125, height/2+50); 
  text("INFO", width/2+50+125, height/2+50);
}
// remove the map 2 




// bullets
function spawnBullet(){
  let direction = createVector(mouseX - playerPosition.x, mouseY - playerPosition.y);
  direction.normalize();
  direction.mult(4);
  
  
  let position = createVector(playerPosition.x, playerPosition.y);
  position.x += direction.x * (diameterPlayer/4);
  position.y += direction.y * (diameterPlayer/4);

  let bullet = {
    pos: {x: position.x, y: position.y},
    vel: {x: direction.x, y: direction.y},
  };
  shared.bulletsArray.push(bullet);
}

function moveBullet(bullet){
  bullet.pos.x += bullet.vel.x;
  bullet.pos.y += bullet.vel.y;
  
}

function drawBullet(bullet){
  fill("red");
  circle(bullet.pos.x, bullet.pos.y, diameterBullet); 
}



function mousePressed(){
  if (state === "start"){
    if (mouseX > width/2-300 && mouseX < width/2-300+250 && mouseY > height/2 && mouseY <height/2+100){
      state = "mapOne";
      return;
    }
    // if (mouseX > width/2-130 && mouseX < width/2-130+250 && mouseY > height/2 && mouseY <height/2+100){
    //   state = "mapTwo";
    //   return;
    // }
    if (mouseX > width/2+50 && mouseX < width/2+50+250 && mouseY > height/2 && mouseY <height/2+100){
      state = "instructions";
      return;
    }
  }
  if (state === "mapOne"){
    spawnBullet();
    audioBulletShot.stop();
    audioBulletShot.play();
  }
}



function drawBarriersMapOne(){
  fill("black");
  for (let wall of wallsMapOne){
    rect(wall.x, wall.y, wall.w, wall.l);
  }
}

// function drawBarriersMapTwo(){
//   fill("black");
//   for (let wall of wallsMapTwo){
//     rect(wall.x, wall.y, wall.w, wall.l);
//   }
// }

function wallDetectionBullet(){
  if (state === "mapOne"){
    walls = wallsMapOne;
  }
  // else if (state === "mapTwo"){
  //   walls = wallsMapTwo;
  // }
  for (let i = shared.bulletsArray.length - 1; i >= 0; i--){
    let bullet = shared.bulletsArray[i];
    for (let wall of walls){
      if (bullet.pos.x + diameterBullet/2 > wall.x && 
        bullet.pos.x + diameterBullet/2 < wall.x + wall.w && 
        bullet.pos.y + diameterBullet/2 > wall.y && 
        bullet.pos.y + diameterBullet/2 < wall.y + wall.l){
        let index = shared.bulletsArray.indexOf(bullet);
        shared.bulletsArray.splice(index,1);
      }
    }
  }
}

function canvasDetectionBullet(){
  for (let i = shared.bulletsArray.length - 1; i >= 0; i --){
    let bullet = shared.bulletsArray[i];
    if(bullet.pos.x + diameterBullet/2 > width || bullet.pos.x - diameterBullet/2 < 0 || 
      bullet.pos.y + diameterBullet/2 > height || bullet.pos.y - diameterBullet/2 < 0){
      let index = shared.bulletsArray.indexOf(bullet);
      shared.bulletsArray.splice(index,1);
    }
  }
}


function wallDetectionPlayer(){
  if (state === "mapOne"){
    walls = wallsMapOne;
  }
  // else if (state === "mapTwo"){
  //   walls = wallsMapTwo;
  // }
  for(let wall of walls){
    if (playerPosition.x + diameterPlayer/2 > wall.x && playerPosition.x - diameterPlayer/2 < wall.x + wall.w && 
        playerPosition.y + diameterPlayer/2 > wall.y && playerPosition.y - diameterPlayer/2 < wall.y + wall.l){
      if(playerPosition.x < wall.x){ 
        playerPosition.x = wall.x - diameterPlayer/2;
      }
      if(playerPosition.x > wall.x + wall.w){
        playerPosition.x = wall.x + wall.w + diameterPlayer/2;
      }
      if(playerPosition.y < wall.y){
        playerPosition.y = wall.y - diameterPlayer/2;
      }
      if(playerPosition.y > wall.y + wall.l){
        playerPosition.y = wall.y + wall.l + diameterPlayer/2;
      }
    }
  }
}

function playersHitDetection(){
  for (let i = shared.bulletsArray.lengh - 1; i >=0; i--){
    let bullet = shared.bulletsArray[i];
    let d = dist(bullet.pos.x, bullet.pos.y, playerPosition.x, playerPosition.y);
    if (d < diameterPlayer/2 + diameterBullet/2){
      playerPosition.x = random(width);
      playerPosition.y = random(height);
    }
    let index = shared.bulletsArray.indexOf(bullet);
    shared.bulletsArray.splice(index,1);

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
  // if(keyCode === 50){//2
  //   state = "mapTwo";
  // }
  if(keyCode===73){//i
    state = "instructions";
  }
  if(keyCode===77){//m
    state = "start";
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// steps:
// p5 party
// https://p5party.org/examples/tanks/
// if party cannot work make 2-3 balls bounce random and when bullet hit they splice or something. 

// example select something


