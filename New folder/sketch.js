// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let waitTime = 2000;
let lastSwitchTime = 0;
let isWhite = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  // console.log(millis());
  swapStateIfNeeded();
  showBackground();
}

function swapStateIfNeeded(){
  if(millis() > lastSwitchTime + waitTime){
    isWhite = !isWhite;
    lastSwitchTime = millis();
  }
}

function showBackground(){
  if(isWhite){
    background("white");
  }
  else{
    background("black");
  }
}
