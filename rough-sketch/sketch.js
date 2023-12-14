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
  // createCanvas(windowWidth, windowHeight)

  new Canvas();
  ball = new Sprite(width/2, height/2, 105);
  // ball.debug = true;
  ball.color = "black";
  ball.mass = 0;
  ball.collider = "d";
  ball.bounciness = 0;
  // ball.debug = true;
  ball.rotationLock = true;
  ball.friction = 0;
  ball.drag = 0;
  ball.img = "assets/character.png";
  ball.addAni("punch", "assets/player-animation/player01.png", 10);
  ball.ani.stop();
  ball.ani.frame = 0;
  // ball.debug = true;
  ball.scale = 0.5

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
  updateRotation();
  // retainPosition();
}

function checkMovement() {
  if (keyIsPressed) {
    let spd = 3.7;
    if (keyIsDown(87)) {
      ball.moveTowards(ball.position.x, ball.position.y - 1, spd);
    }
    if (keyIsDown(83)) {
      ball.moveTowards(ball.position.x, ball.position.y + 1, spd);
    }
    if (keyIsDown(68)) {
      ball.moveTowards(ball.position.x + 1, ball.position.y, spd);
    }
    if (keyIsDown(65)) {
      ball.moveTowards(ball.position.x - 1, ball.position.y, spd);
    }
    if (keyIsDown(87) && keyIsDown(68)) {
      ball.moveTowards(ball.position.x + 1, ball.position.y - 1, spd);
    }
    if (keyIsDown(87) && keyIsDown(65)) {
      ball.moveTowards(ball.position.x - 1, ball.position.y - 1, spd);
    }
    if (keyIsDown(83) && keyIsDown(68)) {
      ball.moveTowards(ball.position.x + 1, ball.position.y + 1, spd);
    }
    if (keyIsDown(83) && keyIsDown(65)) {
      ball.moveTowards(ball.position.x - 1, ball.position.y + 1, spd);
    }
  }
  else {
    ball.vel.x = 0;
    ball.vel.y = 0;
  }

  // if(mouseIsPressed) {
  //   ball.ani.play();
  // }
  // else {
  //   ball.ani.frame = 0;
  //   ball.ani.stop();
  // }

}

function drawBullet() {
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;
  let a = atan2(y, x);
  rotate(a);
}

function updateRotation() {
  ball.rotateTowards(mouse, 1.2, 1);
}



// function retainPosition() {
//   obstacle.pos.x = width/2;
//   obstacle.pos.y = height/2;
// }