// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



// Declare global variables
let guests, shared, my, sharedStatePlacement, sharedStateStart;
let grid, rows, cols;
let grassImg, pathImg, boxBarrierImg, waterBarrierImg, waitingScreenImg, audioBulletShot, waitingScreenAudio, gameStartAudio;
let x, y;
let bullet_hit;
let newGrid = [];
let reloadTime = 1000;
let state = "normal";

// Declare constants
const MOVEMENT = 1.5;
const DIAMETERPLAYER = 30;
const CELL_SIZE = 40;
const OPEN_TILE = 0;
const OPEN_TILE_TWO = 1;

// Function preload p5-party, sounds, and images
function preload(){
  partyConnect("wss://demoserver.p5Party.org");
  shared = partyLoadShared("shared", {bullets: []});
  my = partyLoadMyShared();
  guests = partyLoadGuestShareds();
};

function setup() {
createCanvas(width, height);
}

function draw() {
  circle(255,55)
}

