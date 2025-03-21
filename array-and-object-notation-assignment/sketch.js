// Array and object Notation assignment: 2D Brawl Stars part 1
// Owen Tang
// March 20, 2025
// Extra for Experts: I coded the bullets using createVectors and attempted p5 party and "worked/2"


// Define global variables
let bulletsArray = [];
let enemyArray = [];
let state = "start";
let playerPosition;
let instructionsBG, mapOneBG, startBG, audioBulletShot;
let pos;
let freezeDuration;
let x, y, dx, dy, r, g, b;
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

// Define constants
const MOVEMENT = 3;
const DIAMETERPLAYER = 20;
const DIAMETERBULLET = 5;
const DIAMETERENEMY = 40;

// Loads the images/bgimages and audio into the code
function preload() {
  startBG = loadImage("startBG.png"); 
  mapOneBG = loadImage("background_1.avif");
  instructionsBG = loadImage("instructionsBG.avif");
  audioBulletShot = createAudio("laser-312360.mp3");
}

// Allows the canvas and window to be resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Sets up the canvas and player's position with a vector
function setup() {
  createCanvas(windowWidth, windowHeight);
  freezeDuration = millis() + 3000;
  playerPosition = createVector(random(500,1000), random(500,1000));
}

// Run the three different screens based on state variable
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
  else if (state === "lose"){
    loseScreen();
  }
}

// Start Screen Page: Start screen with the start and instruction buttons
function startScreen(){
  image(startBG, 0, 0, width, height);
  startButtons();
  fill("black");
  textSize(90);
  textAlign(CENTER, CENTER);
  text("2D BRAWL STARS", width/2, height/4);
}

// Instruction page: Includes different instructions expressed with text
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

// Lose Page: Includes the lose screen when hit by enemy
function loseScreen(){
  background("black");
  fill("red");
  textSize(100);
  textAlign(CENTER,CENTER);
  text("YOU LOSE!", width/2, height/2);
  textSize(50);
  text("Refresh to restart", width/2, height/2 + 100);
}

// Game page/Map: Includes the map, player, detections and bullets.
function mapOne(){
  background(mapOneBG);
  drawMePlayer();
  if(millis() > freezeDuration && enemyArray.length === 0){
    spawnEnemies();
  }
  drawEnemyBalls();
  move();
  moveEnemies();
  playerDetectionEnemy();
  bulletDetectionEnemy();
  drawBarriersMapOne();
  wallDetectionPlayer();
  canvasDetectionBullet();
  wallDetectionBullet();
  for (let bullet of bulletsArray){
    drawBullet(bullet);
    moveBullet(bullet);
  }
}

// Buttons for the start Screen
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

// ---Draw zone/section---
// Draws the player
function drawMePlayer(){
  fill("blue");
  circle(playerPosition.x, playerPosition.y, DIAMETERPLAYER);
}

// Draws the bullets
function drawBullet(bullet){
  fill("red");
  circle(bullet.pos.x, bullet.pos.y, DIAMETERBULLET); 
}

// Draws the barriers/walls
function drawBarriersMapOne(){
  fill("black");
  for (let wall of wallsMapOne){
    rect(wall.x, wall.y, wall.w, wall.l);
  }
}

// Draws the enemy balls
function drawEnemyBalls(enemy){
  for (let enemy of enemyArray){
    fill(enemy.r, enemy.g, enemy.b);
    circle(enemy.x, enemy.y, DIAMETERENEMY);
  }
}

// Function to spawn enemies
function spawnEnemies(){
  for (let i = 0; i < 15; i++){
    let enemy = {
      x: random(0, 500),
      y: random(0, 500),
      dy: random(-5, 5),
      dx: random(-5, 5),
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
    };
    enemyArray.push(enemy);
  }
}

// ---Bullets zone/section---
// Function creates bullet based on position of mouse and pushes bullets based on vector
function spawnBullet(){
  let direction = createVector(mouseX - playerPosition.x, mouseY - playerPosition.y);
  direction.normalize();
  direction.mult(4);
  let position = createVector(playerPosition.x, playerPosition.y);
  position.x += direction.x * (DIAMETERPLAYER/4);
  position.y += direction.y * (DIAMETERPLAYER/4);
  let bullet = {
    pos: position,
    vel: direction,
  };
  bulletsArray.push(bullet);
}

// moves the bullet
function moveBullet(bullet){
  bullet.pos.add(bullet.vel);
}

// Mouse clicks buttons start and instructions, and for spawning bullet and sound
function mousePressed(){
  if (state === "start"){
    if (mouseX > width/2-300 && mouseX < width/2-300+250 && mouseY > height/2 && mouseY <height/2+100){
      state = "mapOne";
      return;
    }
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

// ---Detection zone/section---
// If wall detects bullet then bullet gets spliced
function wallDetectionBullet(){
  for (let i = bulletsArray.length - 1; i >= 0; i--){
    let bullet = bulletsArray[i];
    for (let wall of wallsMapOne){
      if (bullet.pos.x + DIAMETERBULLET/2 > wall.x && 
        bullet.pos.x + DIAMETERBULLET/2 < wall.x + wall.w && 
        bullet.pos.y + DIAMETERBULLET/2 > wall.y && 
        bullet.pos.y + DIAMETERBULLET/2 < wall.y + wall.l){
        let index = bulletsArray.indexOf(bullet);
        bulletsArray.splice(index,1);
      }
    }
  }
}

// If canvas detects bullet then bullet gets spliced
function canvasDetectionBullet(){
  for (let i = bulletsArray.length - 1; i >= 0; i --){
    let bullet = bulletsArray[i];
    if(bullet.pos.x + DIAMETERBULLET/2 > width || bullet.pos.x - DIAMETERBULLET/2 < 0 || 
      bullet.pos.y + DIAMETERBULLET/2 > height || bullet.pos.y - DIAMETERBULLET/2 < 0){
      let index = bulletsArray.indexOf(bullet);
      bulletsArray.splice(index,1);
    }
  }
}

// If wall detects player, player is pushed back
function wallDetectionPlayer(){
  if (state === "mapOne"){
    walls = wallsMapOne;
  }
  for(let wall of walls){
    if (playerPosition.x + DIAMETERPLAYER/2 > wall.x && playerPosition.x - DIAMETERPLAYER/2 < wall.x + wall.w && 
        playerPosition.y + DIAMETERPLAYER/2 > wall.y && playerPosition.y - DIAMETERPLAYER/2 < wall.y + wall.l){
      if(playerPosition.x < wall.x){ 
        playerPosition.x = wall.x - DIAMETERPLAYER/2;
      }
      if(playerPosition.x > wall.x + wall.w){
        playerPosition.x = wall.x + wall.w + DIAMETERPLAYER/2;
      }
      if(playerPosition.y < wall.y){
        playerPosition.y = wall.y - DIAMETERPLAYER/2;
      }
      if(playerPosition.y > wall.y + wall.l){
        playerPosition.y = wall.y + wall.l + DIAMETERPLAYER/2;
      }
    }
  }
}

// If player detects enemy, state turns to lose
function playerDetectionEnemy(){
  for (let enemy of enemyArray){
    let distanceToEnemy = dist(playerPosition.x, playerPosition.y, enemy.x, enemy.y);
    if (distanceToEnemy< DIAMETERPLAYER/2 + DIAMETERENEMY/2){
      state = "lose";
    }
  }
}

// If bullet detects enemy, it teleports enemy to random place
function bulletDetectionEnemy(){
  for (let enemy of enemyArray){
    for (let bullet of bulletsArray){
      let distanceToBullet = dist(bullet.pos.x, bullet.pos.y, enemy.x, enemy.y);
      if (distanceToBullet < DIAMETERBULLET/2 + DIAMETERENEMY/2){
        enemy.x = random(width);
        enemy.y = random(height);
      }
    }
  }
}

// WASD movement and restricts player in canvas
function move(){
  if (keyIsDown(87)||keyIsDown(UP_ARROW)) {//w
    playerPosition.y-=MOVEMENT;
  }
  if (keyIsDown(65)||keyIsDown(LEFT_ARROW)) {//a
    playerPosition.x-=MOVEMENT;
  }
  if (keyIsDown(83)||keyIsDown(DOWN_ARROW)) {//s
    playerPosition.y+=MOVEMENT;
  }
  if (keyIsDown(68)||keyIsDown(RIGHT_ARROW)) {//d
    playerPosition.x+=MOVEMENT;
  }
  
  if (playerPosition.x + DIAMETERPLAYER/2 > width){
    playerPosition.x = width - DIAMETERPLAYER/2;
  } 
  else if (playerPosition.x - DIAMETERPLAYER/2 < 0){
    playerPosition.x = DIAMETERPLAYER/2;
  } 
  else if (playerPosition.y + DIAMETERPLAYER/2 > height){
    playerPosition.y = height - DIAMETERPLAYER/2;
  } 
  else if (playerPosition.y - DIAMETERPLAYER/2 < 0){
    playerPosition.y = DIAMETERPLAYER/2;
  } 
}

// Moves the enemies in random positions
function moveEnemies(enemy){
  for (let enemy of enemyArray){
    enemy.x += enemy.dx;
    enemy.y += enemy.dy;

    if (enemy.x - DIAMETERPLAYER/2 > width){
      enemy.x = -DIAMETERPLAYER/2 ;
    } 
    else if (enemy.x+DIAMETERPLAYER/2 < 0){
      enemy.x = width + DIAMETERPLAYER/2 ;
    } 
    else if (enemy.y - DIAMETERPLAYER/2 > height){
      enemy.y = -DIAMETERPLAYER/2 ;
    } 
    else if (enemy.y + DIAMETERPLAYER/2 < 0){
      enemy.y = height + DIAMETERPLAYER/2 ;
    } 
  }
}

// If letters are pressed, different screens show 
function keyPressed(){
  if(keyCode === 49){//1
    state = "mapOne";
  }
  if(keyCode===73){//i
    state = "instructions";
  }
  if(keyCode===77){//m
    state = "start";
  }
}









