// Perlin Noise Demo
// Moving a circle
// March 11, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x;
let y;
let deltaTime = 0.02;
let timeX = 0;
let timeY = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill("black");
  x = noise(timeX) * width;
  y = noise(timeY) * height;
  circle(x, y, 50);
  timeX += deltaTime;
  timeY += deltaTime;

}
