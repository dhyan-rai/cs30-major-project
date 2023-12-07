// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;
let shared;
let mouseShared;
let ball;


class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}



// testObj = new Sprite(); 

function preload() {
  


  //connecting to a party
  partyConnect("wss://demoserver.p5party.org", "testing p5party");
  shared = partyLoadShared("shared", new Sprite());
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  new Canvas();
  // ball = new Sprite();
  // ball.diameter = shared.diameter;
  // ball.color = "black";
  // ball.vel.x = shared.vel.x;
  // ball.vel.y = shared.vel.y;
  
}

function draw() {
  update();
  background(220);
  clear();
  // circle(shared.x, shared.y, 20);
  // checkMovement();
}

function checkMovement() {
  if (keyIsPressed) {
    if (keyIsDown(87)) {
      shared.vel.y = -6;
    }
    if (keyIsDown(83)) {
      shared.vel.y = 6;
    }
    if (keyIsDown(65)) {
      shared.vel.x = -6;
    }
    if (keyIsDown(68)) {
      shared.vel.x = 6;
    }
  }
  else {
    shared.vel.y = 0;
    shared.vel.x = 0;
  }
}

// function mousePressed() {
//   shared.x = mouseX;
//   shared.y = mouseY;
// }

function update() {
  ball.vel.x = shared.vel.x;
  ball.vel.y = shared.vel.y;
  ball.diameter = shared.diameter;
}

