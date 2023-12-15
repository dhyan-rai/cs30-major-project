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
let guns;
let mag;

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function preload() {
  bg = loadImage("assets/battle-royale-map1.png");
}

function setup() {
  // createCanvas(windowWidth, windowHeight)

  new Canvas();
  //creating player sprite
  ball = new Sprite(width/2, height/2, 105);
  // ball.debug = true;
  ball.color = "black";
  ball.mass = 1;
  ball.collider = "d";
  ball.bounciness = 0;
  // ball.debug = true;
  ball.rotationLock = true;
  ball.friction = 0;
  ball.drag = 0;
  ball.img = "assets/ball-img.png";
  ball.scale = 0.5;
  ball.layer = 3;

  //creating gun
  guns = new Group();
  guns.width = 50;
  guns.height = 10;
  guns.mass = 20;
  guns.collider = "n";
  guns.bounciness = 0;
  guns.offset.x = 25;
  guns.layer = 1;

  mag = new guns.Sprite();
  mag.pos.x = 100;
  mag.pos.y = 100;


  for (let i = 0; i <= 16; i++) {
    obstacles[i] = new Sprite(i * 150, 400, 50, 50, "s");
    obstacles[i].rotationLock = true;
    obstacles[i].bounciness = 0;
    obstacles[i].friction = 0;
  }
  
}

function draw() {
  clear();
  background(bg);

  camera.x = ball.x;
  camera.y = ball.y;
  updatePlayerMovement();
  updateGuns();
  updateRotation();
}

function updatePlayerMovement() {
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
  // gun.rotateTowards(mouse, 1.2, 1);
}




// function retainPosition() {
//   obstacle.pos.x = width/2;
//   obstacle.pos.y = height/2;
// }

function updateGuns() {
  for (let gun of guns) {
    if(dist(ball.pos.x, ball.pos.y, gun.pos.x, gun.pos.y) < 5) {
      equipGun(gun, ball);
      gun.rotateTowards(mouse, 1.2, 1);
    }    
  }
}

function equipGun(gun, player) {
  gun.pos.x = player.pos.x;
  gun.pos.y = player.pos.y;
}