/* eslint-disable indent */
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let initialTriangle = [
  {x: 625, y : 50},
  {x: 50, y: 700},
  {x: 1200, y: 700},
];

let theDepth = 0;
let theColors = ["blue","cyan","green","purple","red","yellow","orange","black", "grey"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  sierpinski(initialTriangle, theDepth);
}

function draw() {
}

function sierpinski(points, depth){
  // shell triangle
  fill(theColors[depth]);
  triangle(points[0].x, points[0].y,points[1].x, points[1].y,points[2].x, points[2].y, );

  // escape clause
  if(depth > 0){
  // pattern-- draw the three new triangles
  // bottom left
  sierpinski([midPoint(points[0], points[1]),
              points[1],
              midPoint(points[1], points[2])],
              depth - 1);
  // top 
  sierpinski([midPoint(points[0], points[1]),
              points[0],
              midPoint(points[0], points[2])],
              depth - 1);
  // bottom right
  sierpinski([midPoint(points[0], points[2]),
              points[2],
              midPoint(points[1], points[2])],
              depth - 1);

  }
}

function midPoint(point1, point2){
  let midX = (point1.x + point2.x)/2;
  let midY = (point1.y + point2.y)/2;
  return {x: midX, y: midY};
}

function mousePressed(){
  if(theDepth < 8){
  theDepth++;
  background(220);
  sierpinski(initialTriangle, theDepth);
  }
}
