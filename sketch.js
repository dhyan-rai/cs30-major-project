// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;
let ball;
let obstacle;

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}



// testObj = new Sprite(); 

function preload() {
  


  //connecting to a party
}

function setup() {
  // createCanvas(windowWidth, windowHeight);

  partyConnect(
		"wss://demoserver.p5party.org", 
		"p5party-integration-with-p5playssdfsdfsdfsdfsdfsdf"
	);


  new Canvas();
  ball = new Sprite(width/2, height/2, 50);
  // ball.debug = true;
  ball.color = "black";
  ball.mass = 100;

  obstacle = new Sprite(200, 200, 40, 40);
  obstacle.color = "green";
  obstacle.mass = 100;
  obstacle.rotationLock = true;
  
}

function draw() {
  background(220);
  clear();
  checkMovement();
}

function checkMovement() {
  if (keyIsPressed) {
    if (kb.presses("w")) {
      ball.vel.y = -6;
    }
    if (kb.presses("s")) {
      ball.vel.y = 6;
    }
    if (kb.presses("a")) {
      ball.vel.x = -6;
    }
    if (kb.presses("d")) {
      ball.vel.x = 6;
    }
  }
  else {
    ball.vel.y = 0;
    ball.vel.x = 0;
  }
}

function drawBullet() {
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;
  let a = atan2(y, x);
  push();
  rotate(a);
}




