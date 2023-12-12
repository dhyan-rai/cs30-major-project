// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;
let ball;
let obstacle1, obstacle2, obstacle3, obstacle4;
let obstacles = [obstacle1, obstacle2, obstacle3, obstacle4];

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function setup() {
  // createCanvas(windowWidth, windowHeight);



  new Canvas();
  ball = new Sprite(width/2, height/2, 50);
  // ball.debug = true;
  ball.color = "black";
  ball.mass = 0;
  ball.collider = "d";
  ball.bounciness = 0;
  // ball.debug = true;
  ball.rotationLock = true;
  ball.friction = 0;
  ball.drag = 0;

  for (let i = 0; i <= 4; i++) {
    obstacles[i] = new Sprite(i * 150, 400, 50, 50, "s");
    obstacles[i].rotationLock = true;
    obstacles[i].bounciness = 0;
    obstacles[i].friction = 0;
  }
  
}

function draw() {
  background(220);
  clear();

  checkMovement();
  // retainPosition();
}

function checkMovement() {
  if (keyIsPressed) {
    if (kb.presses("w")) {
      ball.vel.y = -6;
      // ball.vel.x = 0;
      // ball.move(20);
      // ball.direction = -90;
    }
    if (kb.presses("s")) {
      ball.vel.y = 6;
      // ball.vel.x = 0;
      // ball.direction = 90;
    }
    if (kb.presses("a")) {
      ball.vel.x = -6;
      // ball.vel.y = 0;
      // ball.direction = 180;
    }
    if (kb.presses("d")) {
      ball.vel.x = 6;
      // ball.vel.y = 0;
      // ball.direction = 0;
    }
  }
  else {
    ball.vel.x = 0;
    ball.vel.y = 0;
    console.log("working");
  }

}

function drawBullet() {
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;
  let a = atan2(y, x);
  rotate(a);
}




// function retainPosition() {
//   obstacle.pos.x = width/2;
//   obstacle.pos.y = height/2;
// }