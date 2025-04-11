// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Walker {
  constructor(x, y, theColor){
    this.x = x;
    this.y = y;
    this.color = theColor;
    this.speed = 10;
    this.radius = 5;
  }

  display(){
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.radius *2);
  }

  move(){
    let choice = random(100);
    if(choice < 25){
      this.y -= this.speed;
    }
    else if (choice < 50) {
      this.y += this.speed;
    }
    else if (choice < 75) {
      this.x -= this.speed;
    }
    else{
      this.x += this.speed;
    }
  }
}

// let luke;
// let owen;
let theWalkers = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  // luke = new Walker(width/2, height/2, "red");
  // owen = new Walker(200,200, "blue");
  spawnWalker(width/2, height/2);
}

function draw() {
  // luke.move();
  // owen.move();
  // luke.display();
  // owen.display();
  for (let myWalker of theWalkers){
    myWalker.move();
    myWalker.display();
  }
}

function mousePressed(){
  spawnWalker(mouseX, mouseY);
}

function spawnWalker(x, y){
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let someColor = color(r,g,b);
  let someWalker = new Walker(x,y,someColor);
  theWalkers.push(someWalker);
}