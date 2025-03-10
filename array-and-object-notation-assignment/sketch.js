// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y;
let dx;
let dy;
let bullets = [];
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
  x=width/2;
  y=height/2;
  dx=5;
  dy=5;
}

function draw() {
  background(220);
  drawBall();
  move();
}

function drawBall(){
  fill("black");
  circle(x,y, 20);
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