// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;
let bgGround, bgResources;
// let player;
let obstacle1, obstacle2, obstacle3, obstacle4;
let obstacles = [obstacle1, obstacle2, obstacle3, obstacle4];
let guns;
let globalBullets = [];
let walls, wallImg;
let tileMap;
let camOffsetX, camOffsetY;

//initializing guns
let shotgun, sniper, ak47;


//temp vars
let ball;

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function preload() {
  bgGround = loadImage("assets/test-maps/tile-map-ground-1.png");
  bgResources = loadImage("assets/test-maps/tile-map-resources-1.png")
  wallImg = loadImage("assets/wall.png");
}

function setup() {
  // createCanvas(windowWidth, windowHeight, WEBGL);
  // allSprites.autoDraw = false
  angleMode(DEGREES);
  imageMode(CENTER);
  bgGround.width *= 0.5;
  bgGround.height *= 0.5;

  bgResources.width *= 0.5;
  bgResources.height *= 0.5;


  new Canvas();
  //creating player sprite
  player = new Sprite(width/2, height/2, 105);
  player.autoDraw = false;
  // player.debug = true;
  player.color = "black";
  player.mass = 1;
  player.collider = "d";
  player.bounciness = 0;
  // player.debug = true;
  player.rotationLock = true;
  player.friction = 0;
  player.drag = 0;
  // player.img = "assets/ball-img.png";
  player.scale = 0.25;
  player.layer = 0;
  player.accel = 3;

  //creating gun
  guns = new Group();
  guns.mass = 0;
  guns.collider = "n";
  guns.equipped = false;


  //guns creation
  shotgun = new guns.Sprite();
  shotgun.width = 20;
  shotgun.height = 5;
  shotgun.layer = 2;
  // shotgun.offset.x = 25;
  shotgun.gunType = "shotgun";
  shotgun.range = 25;
  // shotgun.bulletArray = [];

  //sniper
  sniper = new guns.Sprite(400, 200);
  sniper.width = 50;
  sniper.height = 10;
  sniper.layer = 2;
  // sniper.offset.x = 25;
  sniper.gunType = "sniper";
  sniper.range = 70;
  // sniper.bulletArray = [];

  //ak47
  ak47 = new guns.Sprite(500, 200);
  ak47.width = 50;
  ak47.height = 10;
  ak47.layer = 2;
  // ak47.offset.x = 25;
  ak47.gunType = "ak47";
  ak47.range = 40;
  // ak47.bulletArray = [];

  for (let gun of guns) {
    gun.bulletArray = [];
    gun.offset.x = 25;
    gun.bounciness = 0;
    gun.friction = 0;
    gun.drag = 0;
    gun.rotationDrag = 0;
  }

  //tilemap
  walls = new Group();
  walls.w = 16;
  walls.h = 16;
  walls.tile = "w";
  walls.collider = "s";
  // walls.img = wallImg;
  // walls.visible = false;
  // walls.debug = true;
  
  tileMap = new Tiles(
    [
      ".......................www......................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      "................................................",
      
    ],
    0,
    0,
    walls.w,
    walls.h
    );
    
    for(let wall of walls) {
      wall.bounciness = 0;
    }
    //obstacles (temporary)
  // for (let i = 0; i <= 16; i++) {
  //   obstacles[i] = new Sprite(i * 150, 400, 50, 50, "s");
  //   // obstacles[i].rotationLock = true;
  //   obstacles[i].bounciness = 0;
  //   obstacles[i].friction = 0;
  // }

  //temp sprites
  ball = new Sprite(200, 816, 100);
  ball.mass = 100;
  ball.bounciness = 0;
  
  camera.zoom = 1.5;
}

function draw() {
  clear();
  

  background(10);
  noStroke();
  camera.on();
  updatePlayerMovement();
  camera.x = player.x;
  camera.y = player.y;
  image(bgGround, 0 - player.vel.x, 0 - player.vel.y);
  player.draw()
  image(bgResources, 0 - player.vel.x, 0 - player.vel.y);
  camera.x += player.vel.x;
  camera.y += player.vel.y;
  camera.off();

  updateGuns();

  // console.log(player.speed);
}

function updatePlayerMovement() {
  if (keyIsPressed) {
    let spd = 3.7;
    if (keyIsDown(87)) {
      player.moveTowards(player.position.x, player.position.y - 1, spd);
      // player.vel.y = 0;
      // player.vel.y -= player.accel;
    }
    if (keyIsDown(83)) {
      player.moveTowards(player.position.x, player.position.y + 1, spd);
      // player.vel.y = 0;
      // player.vel.y += player.accel;
    }
    if (keyIsDown(68)) {
      player.moveTowards(player.position.x + 1, player.position.y, spd);
      // player.vel.x = 0;
      // player.vel.x += 1;
    }
    if (keyIsDown(65)) {
      player.moveTowards(player.position.x - 1, player.position.y, spd);
      // player.vel.x = 0;
      // player.vel.x -= player.accel;
    }
    if (keyIsDown(87) && keyIsDown(68)) {
      player.moveTowards(player.position.x + 1, player.position.y - 1, spd);
      // player.vel.y += player.accel;
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
    if(player.accel > 0) {
      player.accel -= 0.1;
    }
    camOffsetY = 0;
    camOffsetX = 0;
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
}

function shootBullet(gun) {
  if(gun.gunType === "shotgun") {
    for (let i = 0; i <= 10; i++) {

      //position from an angle
      let bulletTemp = p5.Vector.fromAngle(radians(gun.rotation), gun.width + 10);
      let gunPosTemp = createVector(gun.x, gun.y);
      let bulletPos = p5.Vector.add(bulletTemp, gunPosTemp);
      // bulletPos.setMag(1);

      let bullet = new Sprite(bulletPos.x, bulletPos.y);

      bullet.diameter = 5;
      bullet.color = "white";
      bullet.direction = gun.rotation + random(-10,10);
      bullet.speed = random(8, 10);
      bullet.collider = "d";
      bullet.layer = 1;
      bullet.bounce = 0.8;
      bullet.life = gun.range + random(-5, 5);
      bullet.mass = 5;  
      gun.bulletArray.push(bullet);
    }
  }
  if (gun.gunType === "sniper") {

    //position from an angle
    let bulletTemp = p5.Vector.fromAngle(radians(gun.rotation), gun.width);
    let gunPosTemp = createVector(gun.x, gun.y);
    let bulletPos = p5.Vector.add(bulletTemp, gunPosTemp);

    let bullet = new Sprite(bulletPos.x, bulletPos.y);

    bullet.diameter = 11.5;
    bullet.color = "yellow";
    bullet.direction = gun.rotation;
    bullet.speed = random(10, 12);
    bullet.collider = "d";
    bullet.layer = 1;
    bullet.life = gun.range;
    bullet.mass = 20;
    gun.bulletArray.push(bullet);
  }
  
  if (gun.gunType === "ak47") {

    //position from an angle
    let bulletTemp = p5.Vector.fromAngle(radians(gun.rotation), gun.width);
    let gunPosTemp = createVector(gun.x, gun.y);
    let bulletPos = p5.Vector.add(bulletTemp, gunPosTemp);

    let bullet = new Sprite(bulletPos.x, bulletPos.y);

    bullet.diameter = 9;
    bullet.color = "blue";
    bullet.direction = gun.rotation;
    bullet.speed = random(9, 10);
    bullet.collider = "d";
    bullet.layer = 1;
    bullet.life = gun.range;
    bullet.mass = 10;
    gun.bulletArray.push(bullet);
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

function keyTyped() {
  if(key === "o") {
    camera.zoom += 0.2;
  }
  if(key === "p") {
    camera.zoom -= 0.2;
  }
}
