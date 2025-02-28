// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let state = "greenLight";
let switchTime = 0;
const RED_LIGHT = 4000;
const YELLOW_LIGHT = 1000;
const GREEN_LIGHT = 3000;


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  changeLight();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top

  ellipse(width/2, height/2, 50, 50); //middle

  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function changeLight(){
  if (state === "greenLight"){
    fill("green");
    ellipse(width/2, height/2 + 65, 50, 50);
    if (millis()>switchTime + GREEN_LIGHT){
      state = "yellowLight";
      switchTime = millis();
    }
    console.log(state);
  }
  else if(state === "yellowLight"){
    fill("yellow");
    ellipse(width/2, height/2, 50, 50);
    if (millis()>switchTime + YELLOW_LIGHT){
      state = "redLight";
      switchTime = millis();
    }
    console.log(state);
  }
  else if(state === "redLight"){
    fill("red");
    ellipse(width/2, height/2 - 65, 50, 50);
    if (millis()>switchTime + RED_LIGHT){
      state = "greenLight";
      switchTime = millis();
    }
  }
  console.log(state);
}