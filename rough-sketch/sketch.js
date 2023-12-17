// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;
// let player;
let obstacle1, obstacle2, obstacle3, obstacle4;
let obstacles = [obstacle1, obstacle2, obstacle3, obstacle4];
let guns;
let globalBullets = [];

//initializing guns
let shotgun, mg4, ak47;

class Player {
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
  // allSprites.autoDraw = false
  angleMode(DEGREES);

  new Canvas();
  //creating player sprite
  player = new Sprite(width/2, height/2, 105);
  // player.debug = true;
  player.color = "black";
  player.mass = 1;
  player.collider = "d";
  player.bounciness = 0;
  // player.debug = true;
  player.rotationLock = true;
  player.friction = 0;
  player.drag = 0;
  player.img = "assets/ball-img.png";
  player.scale = 0.5;
  player.layer = 5;

  //creating gun
  guns = new Group();
  guns.mass = 0;
  guns.collider = "n";
  guns.equipped = false;
  // guns.bulletArray = [];

  //guns creation
  shotgun = new guns.Sprite();
  shotgun.width = 50;
  shotgun.height = 10;
  shotgun.layer = 2;
  shotgun.offset.x = 25;
  shotgun.gunType = "shotgun";
  shotgun.range = 25;
  shotgun.bulletArray = [];

  //obstacles (temporary)
  for (let i = 0; i <= 16; i++) {
    obstacles[i] = new Sprite(i * 150, 400, 50, 50, "s");
    // obstacles[i].rotationLock = true;
    obstacles[i].bounciness = 0;
    obstacles[i].friction = 0;
  }

  //temp sprites
  balle = new Sprite(200, 200, 100);
  
}

function draw() {
  clear();
  background(20);

  
  updatePlayerMovement();
  camera.x = player.x;
  camera.y = player.y;
  updateGuns();
}

function updatePlayerMovement() {
  if (keyIsPressed) {
    let spd = 3.7;
    if (keyIsDown(87)) {
      player.moveTowards(player.position.x, player.position.y - 1, spd);
    }
    if (keyIsDown(83)) {
      player.moveTowards(player.position.x, player.position.y + 1, spd);
    }
    if (keyIsDown(68)) {
      player.moveTowards(player.position.x + 1, player.position.y, spd);
    }
    if (keyIsDown(65)) {
      player.moveTowards(player.position.x - 1, player.position.y, spd);
    }
    if (keyIsDown(87) && keyIsDown(68)) {
      player.moveTowards(player.position.x + 1, player.position.y - 1, spd);
    }
    if (keyIsDown(87) && keyIsDown(65)) {
      player.moveTowards(player.position.x - 1, player.position.y - 1, spd);
    }
    if (keyIsDown(83) && keyIsDown(68)) {
      player.moveTowards(player.position.x + 1, player.position.y + 1, spd);
    }
    if (keyIsDown(83) && keyIsDown(65)) {
      player.moveTowards(player.position.x - 1, player.position.y + 1, spd);
    }
  }
  else {
    player.vel.x = 0;
    player.vel.y = 0;
  }

  player.rotateTowards(mouse, 1.2, 1);
  // if(mouseIsPressed) {
  //   player.ani.play();
  // }
  // else {
  //   player.ani.frame = 0;
  //   player.ani.stop();
  // }

}


// function retainPosition() {
//   obstacle.pos.x = width/2;
//   obstacle.pos.y = height/2;
// }

function updateGuns() {
  for (let gun of guns) {
    if (gun.equipped === false && kb.presses("e") && dist(player.x, player.y, gun.x, gun.y) < 50) {
      equipGun(gun, player);
    }
    else if (gun.equipped === true && kb.presses("e")){
      unequipGun(player, gun);
    }
    else if (gun.equipped) {
      //update gun rotation
      gun.rotation = player.rotation;

      //shooting bullets when mouse pressed
      if (mouse.presses()) {
        shootBullet(gun);
      }

      //updating bullets
      updateBullets(gun);
    }
  }
}

function equipGun(gun, player) {
  gun.pos.x = player.pos.x;
  gun.pos.y = player.pos.y;
  gun.rotation = player.rotation;
  new GlueJoint(player, gun);
  gun.equipped = true;
}

function unequipGun(player, gun) {
  player.joints.removeAll();
  gun.equipped = false;
  gun.velocity.x = 0;
  gun.velocity.y = 0;
  console.log("unequipped");
}

function shootBullet(gun) {
  if(gun.gunType === "shotgun") {
    for (let i = 0; i <= 15; i++) {

      //position from an angle
      let bulletTemp = p5.Vector.fromAngle(radians(gun.rotation), gun.width);
      let gunPosTemp = createVector(gun.x, gun.y);
      let bulletPos = p5.Vector.add(bulletTemp, gunPosTemp);

      let bullet = new Sprite(bulletPos.x, bulletPos.y);

      bullet.diameter = 10;
      bullet.color = "white";
      bullet.direction = gun.rotation + random(-10,10);
      bullet.speed = random(8, 10);
      bullet.collider = "d";
      bullet.layer = 1;
      bullet.bounce = 0.8;
      bullet.life = gun.range + random(-5, 5);
      gun.bulletArray.push(bullet);
    }
  }
}

function updateBullets(gun) {
  if (gun.gunType === "shotgun") {
    for (let i = gun.bulletArray.length - 1; i >= 0; i--) {
      let bullet = gun.bulletArray[i];
      bullet.scale *= 0.995;
    }
  }
}

