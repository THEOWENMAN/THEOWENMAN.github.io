// Fireworks OOP Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


class Particle{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.radius = 2;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.opacity = 255;
  }

  display(){
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.radius*2);
  }

  update(){
    //move
    this.x += this.dx;
    this.y += this.dy;
    this.opacity -= 2;
  }

  isDead(){
    return this.opacity <=0;
  }
}


const NUMBER_OF_FIREWORKS = 500;
let theFireworks = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(0);
  for (let fireWorks of theFireworks){
    if(fireWorks.isDead()){
    // get rid of it
      let index = theFireworks.indexOf(fireWorks);
      theFireworks.splice(index,1);
    }
    else{
    // keep updating
      fireWorks.update();
      fireWorks.display();
    }
    
  }
}

function mousePressed(){
  for(let i = 0; i < NUMBER_OF_FIREWORKS; i++){
    let someFireWork = new Particle(mouseX, mouseY);
    theFireworks.push(someFireWork);
  }
}