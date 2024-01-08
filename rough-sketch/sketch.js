// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bg, bgGround, bgResources;
// let player;
let obstacle1, obstacle2, obstacle3, obstacle4;
let obstacles = [obstacle1, obstacle2, obstacle3, obstacle4];
let guns;
let globalBullets = [];
let walls, wallImg;
let tileMap;
let camOffsetX, camOffsetY;

//tiles
let taigaTrees, taigaTreeImg, stones, yellowTrees, yellowTreeImg, bigRocks, bigRockImg, smallRocks, smallRockImg;
let flowerBaskets, flowerBasketImg;
let naturalResources;

//entities
let enemies, player, entities;


//bullets
let bullets, ammos;
let shotgunAmmoImg, sniperAmmoImg, pistolAmmoImg;


//initializing guns
let shotgun, pistol, sniper;
let shotgunImg;
let pistolImg;
let sniperImg;
let shotgunIcon, pistolIcon, shotgunIconImg, pistolIconImg;
let sniperIcon, sniperIconImg;

// let equippedGuns = [];

//temp vars
let ball, extraCanvas;

//gui elements
let healthBar, box1, box1Img, box2, box2Img, box3, box3Img, selectionBox, selectionBoxImg;

//pathfinding vars
let grid, referenceBoxes;

//YUKA vars
let steeringBehavior, wanderBehavior;

function preload() {
  // bgGround = loadImage("assets/test-maps/tile-map-ground-1.png");
  // bgResources = loadImage("assets/test-maps/tile-map-resources-1.png")
  

  //loading in navmesh
  loadJSON("mapdata.json", function(data){
    grid = data.obstacles;
  });
  


  //textures
  bg = loadImage("assets/test-maps/base-layer-1.png")
  wallImg = loadImage("assets/wall.png");
  taigaTreeImg = loadImage("assets/tile-images/taiga_tree.png")
  bigRockImg = loadImage("assets/tile-images/big-rock.png");
  yellowTreeImg = loadImage("assets/tile-images/yellow-tree.png");
  flowerBasketImg = loadImage("assets/tile-images/flower-basket.png");
  smallRockImg = loadImage("assets/tile-images/small-rock.png");
  shotgunImg = loadImage("assets/gun-assets/topdown-images/shotgun-4.png");
  pistolImg = loadImage("assets/gun-assets/topdown-images/pistol-2.png");
  pistolIconImg = loadImage("assets/gun-assets/icons/pistol.png");
  sniperImg = loadImage("assets/gun-assets/topdown-images/sniper.png");
  sniperIconImg = loadImage("assets/gun-assets/icons/sniper2.png");
  shotgunIconImg = loadImage("assets/gun-assets/icons/shotgun.png");
  box1Img = loadImage("assets/inventory/inventory-box-blue.png");
  selectionBoxImg = loadImage("assets/inventory/selection-box.png");

  // shotgunAmmoImg = loadImage()

}

function setup() {

  rectMode(CENTER)
  angleMode(DEGREES);


  // cursor("assets/icons/shotgun.png");

  bg.width *= 0.5;
  bg.height *= 0.5;




  // for(let i = 0; i < grid.length; i++) {
  //   for(let j = 0; j < grid[i].length; j++) {
  //     let sideLength = 45/2;
  //     if(grid[i][j] === 1) {
  //       let bob = new referenceBoxes.Sprite(j*44/2 + sideLength/2, i*44/2 + sideLength/2, sideLength, sideLength, "n");
  //       bob.layer = 10;
  //     }
  //     // text(j*44/2 + sideLength/2, i*44/2 + sideLength/2, "hi")
  //   }
  // }

  new Canvas(windowWidth, windowHeight);

  //creating player sprite
  
  entities = new Group();

  player = new entities.Sprite(1500, 1800, 35, "octagon");
  // player.w = 85;
  // player.h = 85;
  // player.diameter = 125;
  // player.autoDraw = false;
  // player.debug = true;
  player.color = "black";
  player.mass = 1;
  player.collider = "d";
  player.bounciness = 0;
  player.rotationLock = true;
  player.friction = 0;
  player.drag = 0;
  player.scale = 0.25;
  player.layer = 5;
  player.health = 20;
  player.inventoryIsFull = false;
  player.invSlot = 1;
  player.slot1 = {full: false};
  player.slot2 = {full: false};
  player.slot3 = {full: false};
  player.inventory = [player.slot1, player.slot2, player.slot3];
  player.activeSlot = player.slot1;
  player.shotgunAmmo = 10;
  player.sniperAmmo = 10;
  player.pistolAmmo = 10;
  player.reloadTimer = new Timer(4000);



  // player.reloadShotgun = function() {
  //   // player.reloadTimer.start();
  //   if(this.reloadTimer.getRemainingTime() % 100 === 0) {
  //     this.shotgunAmmo += 1;
  //   }



  player.equipGun = function(gun) {
    if(this.activeSlot.full === true) {
      // this.stashGun(this.activeSlot.gun);
      for (let slot of this.inventory) {
        if (slot.full === false) {
          player.activeSlot = slot;
          break;
        }
      }
    }

    gun.owner = this;
    this.activeSlot.gun = gun;
    this.activeSlot.full = true;
    gun.isEquipped();

    // this.inventory.push(gun);
    // this.currentGun = gun;
  }

  player.unEquipGun = function() {
    player.activeSlot.gun.isUnequipped()
    player.activeSlot.full = false;
    delete player.activeSlot.gun;
    // console.log("whta")
  }
  // player.debug = true;
  // player.img = "assets/ball-img.png";
  

  //enemies
  enemies = new entities.Group();
  enemies.w = 72;
  enemies.h = 72;
  enemies.mass = 40;
  enemies.collider = "d";
  enemies.bounciness = 0;
  enemies.rotationLock = true;
  enemies.friction = 0;
  enemies.drag = 0;
  enemies.scale = 0.25;
  enemies.layer = 5;
  // enemy = new enemies.Sprite(50, 50);
  // for(let i = 0; i < 20; i++) {
  //   // let enemy = new enemies.Sprite(random(bg.width), random(bg.height));
  //   let enemy = new enemies.Sprite(random(bg.width), random(bg.height));
  //   enemy.path = [{x: round((enemy.x - sideLength/2) / 22), y: round((enemy.y - sideLength/2) / 22)}]
  //   enemy.startPos = enemy.path[0];
  //   enemy.nextPoint = enemy.path[0];
  //   enemy.reached = true;
  //   enemy.moving = false;
  //   enemy.testArr = [];
  // }

  //creating gun
  guns = new Group();
  // guns.mass = 1000;
  // guns.collider = "n";
  // guns.equipped = false;


  //bullets
  bullets = new Group();
  ammos = new Group();
  shotgunAmmos = new ammos.Group();
  for(let i = 0; i < 1; i++) {
    let shotgunAmmo = new shotgunAmmos.Sprite();
    shotgunAmmo.removeColliders();
    shotgunAmmo.isPicked = function() {
      player.reloadShotgun();
      player.reloadTimer.start();
      player.reloading = true;
      this.remove();
    }
  }

  //gui
  initGui();

  //guns creation
  initGuns();


  for (let gun of guns) {
    gun.bulletArray = [];
    // gun.offset.x = 25;
    gun.bounciness = 0;
    gun.friction = 0;
    gun.drag = 0;
    gun.rotationDrag = 0;
  }

  //tilemap
  naturalResources = new Group();
  naturalResources.collider = "s";
  naturalResources.bounciness = 0;

  //tree tiles
  taigaTrees = new naturalResources.Group();
  taigaTrees.img = taigaTreeImg;
  taigaTrees.tile = "t";

  yellowTrees = new naturalResources.Group();
  yellowTrees.img = yellowTreeImg;
  yellowTrees.tile = "y";


  //rock tiles
  bigRocks = new naturalResources.Group()
  bigRocks.img = bigRockImg;
  bigRocks.tile = "b";

  smallRocks = new naturalResources.Group();
  smallRocks.img = smallRockImg;
  smallRocks.tile = "s";
  

  //random resources
  flowerBaskets = new naturalResources.Group()
  flowerBaskets.img = flowerBasketImg;
  flowerBaskets.tile = "f";


  tileMap = new Tiles(
    [
      "...............................................................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      ".............................................t.................................................................y...............",
      "..................b............................................................t...............................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "............................................................y..................................................................",
      "...............................................................................................................................",
      ".............s.......................s.........................................................................................",
      "...............................................................................................................................",
      "............................................................................................b...................t..............",
      ".............................................................t.................................................................",
      "...............................................................................................................................",
      "................................................................................y..............................................",
      "...............................................................................................................................",
      ".......................t.......................................................................................................",
      "...............................................................................................................................",
      "............................................b..................................................................................",
      "....................................................................t..........................................................",
      ".....................................................................................................t.........................",
      "...............................................................................................................................",
      "..................y.......................................................f....................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "..............................................t..............................................s.................................",
      ".................................................................................................................b.............",
      "...............................................................................................................................",
      "...................t...........................................................................................................",
      "...............................................................................................................................",
      "...........................................................y................t..................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      ".....................y..................................................................................t......................",
      "...........................................................................y...................................................",
      ".............................................b.................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "............t.................................s................................................................................",
      "..............................f..............................................................................y.................",
      "...............................................................................................................................",
      "..........................................................................y....................................................",
      "...............................................................................................................................",
      "................................................................................................t..............................",
      "...............................................................................................................................",
      "...................s.........................t.................................................................................",
      ".........................................................y.....................................................................",
      "..............................................................................................................s................",
      ".........................................................................b.....................................................",
      "..........y....................................................................................................................",
      "...............................................................................................................................",
      "..................................................................................................t............................",
      "........................................t......................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "..............................................................t..................y.............................................",
      "..................t............................................................................................................",
      "...............................................................................................................................",
      "............................................................................................................f..................",
      "...............................................................................................................................",
      ".....................y.........................................................................................................",
      "...........................................s...........y.......................t...............................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "...........................t...................................................................................................",
      ".................................................................................................t.............................",
      "......................................................t....................b...................................................",
      ".........b.....................................................................................................................",
      "..................................f............................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "..................................................................................y.............................s..............",
      "..................................y............................................................................................",
      "....................................................b......................................t...................................",
      "........................t......................................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "..............................................................................................................y................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "............................................s..............y...................................................................",
      "..............t.................t.............s................................................................................",
      ".....................................................................t.........................................................",
      "...............................................................................................................................",
      "........................................................................................................................s......",
      "..................................................................................................b............................",
      ".......................................s.......................................................................................",
      "...............................................................................................................................",
      "......................................y.....................t..................................................................",
      "..........t....................................................................................................................",
      ".....................................................................................t..........................b..............",
      "...............................................................................................................................",
      "........................................................................y......................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "........................b...................................................................................y..................",
      "......................................................t........................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "..........................................................................................t....................................",
      ".......................t.......................................................................................................",
      "....................................................................y.........................................t................",
      "...............................................................................................................................",
      "............b..................................................................................................................",
      "...............................................................................................................................",
      "....................................y....................b.....................................................................",
      "...............................................................................................t...............................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "...........................................f...............................b...................................................",
      "...............................................................................................................................",
      "............................................................................................................b..................",
      "...............................................................................................................................",
      "............................s.............................................f....................................................",
      "...............................................................................................................................",
      "................................................y..............................................................................",
      ".............................................................................t.................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
    ],
    0,
    0,
    35,
    35
    );
    
  for(let tree of taigaTrees) {
    tree.removeColliders();
    tree.addCollider(0, -20, 100, 140);
    tree.addCollider(0, 85, 40, 60)
    tree.layer = 0;
    tree.scale *= 0.45;
  }
  for(let rock of bigRocks) {
    rock.removeColliders();
    rock.addCollider(-5, -90, 115, 100)
    rock.addCollider(76, 5, 50, 135);
    rock.addCollider(-80, 18, 40, 130)
    rock.addCollider(-7, 70, 110, 80);
    rock.layer = 0;
    rock.scale *= 0.3;
  }
  for(let rock of smallRocks) {
    rock.removeColliders();
    rock.addCollider(0, -15, 93, 100);
    rock.layer = 0;
    rock.scale *= 0.3;
  }
  for(let basket of flowerBaskets) {
    basket.removeColliders();
    basket.addCollider(5, 6, 235, 120);
    basket.layer = 0;
    basket.scale = 0.25;
  }
  for(let tree of yellowTrees) {
    tree.removeColliders();
    tree.addCollider(0, -30, 100, 190);
    tree.addCollider(0, 93, 50, 53);
    tree.layer = 0;
    tree.scale = 0.4;
  }

  // allSprites.autoDraw = false;
  camera.zoom = 1.4;
  camera.x = player.x;
  camera.y = player.y;

  shotgun.icon = shotgunIcon;
  // player.autoDraw = false;


}

function draw() {
  clear();
  
  
  background(10);
  noStroke();
  camera.on();
  
  camera.x = (player.x);
  camera.y = (player.y);
  updateGui();
  image(bg, 0, 0);
  // player.draw();
  updatePlayerMovement();
  // camera.moveTo(player, 1.5);
  
  // drawGrid();
  camera.off();
  // trackPlayer();


  updateGuns();
  updateInventory();

}

function keyPressed() {
  if (key === "1") {
    player.activeSlot = player.inventory[0];
  }
  if (key === "2") {
    player.activeSlot = player.inventory[1];
  }
  if (key === "3") {
    player.activeSlot = player.inventory[2];
  }
}

let spd = 0;
let accel = 0.1;
function updatePlayerMovement() {
  let maxSpd = 5;
  if (keyIsPressed && ["w", "s", "a", "d"].includes(key)) {
    if (keyIsDown(87)) {
      // player.moveTowards(player.position.x, player.position.y - 0.5, spd);
      player.direction = -90;
      player.speed = spd;
      if(spd < maxSpd) {
        spd += accel;
      }
    }
    if (keyIsDown(83)) {
      // player.moveTowards(player.position.x, player.position.y + 0.1, spd);
      player.direction = 90;
      player.speed = spd;
      if(spd < maxSpd) {
        spd += accel;
      }
    }
    if (keyIsDown(68)) {
      // player.moveTowards(player.position.x + 1, player.position.y, spd);
      player.direction = 0;
      player.speed = spd;
      if(spd < maxSpd) {
        spd += accel;
      }
    }
    if (keyIsDown(65)) {
      // player.moveTowards(player.position.x - 1, player.position.y, spd);
      player.direction = 180;
      player.speed = spd;
      if(spd < maxSpd) {
        spd += accel;
      }
    }
    if (keyIsDown(87) && keyIsDown(68)) {
      // player.moveTowards(player.position.x + 1, player.position.y - 1, spd);
      player.direction = -45;
      player.speed = spd;
      if(spd < maxSpd) {
        spd += accel;
      }
    }
    if (keyIsDown(87) && keyIsDown(65)) {
      // player.moveTowards(player.position.x - 1, player.position.y - 1, spd);
      player.direction = -135;
      player.speed = spd;
      if(spd < maxSpd) {
        spd += accel;
      }
    }
    if (keyIsDown(83) && keyIsDown(68)) {
      // player.moveTowards(player.position.x + 1, player.position.y + 1, spd);
      player.direction = 45;
      player.speed = spd;
      if(spd < maxSpd) {
        spd += accel;
      }
    }
    if (keyIsDown(83) && keyIsDown(65)) {
      // player.moveTowards(player.position.x - 1, player.position.y + 1, spd);
      player.direction = 135;
      player.speed = spd;
      if(spd < maxSpd) {
        spd += accel;
      }
    }

    

  }
  else{
    player.speed = 0;
    spd = 0;
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

function initGui() {
  box1 = new Sprite(player.x + 220, player.y + 160);
  // box1.autoDraw = false;
  box1.img = box1Img;
  box1.layer = 7;
  box1.removeColliders();
  box1.scale = 1.5;
  box1.taken = false;

  box2 = new Sprite(player.x + 300, player.y + 160);
  box2.img = box1Img;
  box2.layer = 7;
  box2.removeColliders();
  box2.scale = 1.5;
  box2.taken = false;

  box3 = new Sprite(player.x + 380, player.y + 160);
  box3.img = box1Img;
  box3.layer = 7;
  box3.removeColliders();
  box3.scale = 1.5;
  box3.taken = false;

  selectionBox = new Sprite(box1.x + 10, box1.y);
  selectionBox.img = selectionBoxImg;
  selectionBox.layer = 6;
  selectionBox.removeColliders();
  selectionBox.scale = 2.2;


}

function initGuns() {
  shotgun = new guns.Sprite(player.x, player.y);
  shotgun.removeColliders();
  shotgun.layer = 2;
  shotgun.gunType = "shotgun";
  shotgun.range = 20;
  shotgun.len = 53;
  shotgun.rotationLock = true;
  shotgun.bulletArray = [];
  shotgun.inInventory = false;
  // shotgun.timer = new Timer(5000);
  shotgun.bullets = new bullets.Group();

  // shotgun.timer.endTimer();

  //creating shotgun logo for the gui
  shotgunIcon = new Sprite();
  shotgunIcon.layer = 8;
  shotgunIcon.img = shotgunIconImg;
  shotgunIcon.rotate(-35);
  shotgunIcon.removeColliders();
  shotgunIcon.scale = 0.07;
  shotgunIcon.visible = false;
  shotgun.img = shotgunIconImg;
  shotgun.scale = 0.07;

  shotgun.isEquipped = function() {
    this.img = shotgunImg;
    this.layer = 6;
    this.offset.y = -5;
    this.offset.x = 35;
    this.scale = 0.9;
    this.x = this.owner.x;
    this.y = this.owner.y;
    // this.rotationLock = true;
    this.rotateTowards(mouse, 1.2, 1);
    // this.equipped = true;
    this.inInventory = true;
    // console.log("hi")
  }

  shotgun.updateWhileEquipped = function() {
    this.x = this.owner.x;
    this.y = this.owner.y;
    if(this.owner === player) {
      this.rotateTowards(mouse, 1.2, 1)
    }
  }
  shotgun.shoot = function() {
    if((this.timer === undefined || this.timer.expired())){
      if(this.timer === undefined) {
        this.timer = new Timer(500);
      }
      for (let i = 0; i <= 10; i++) {
        
        //position from an angle
        let bulletTemp = p5.Vector.fromAngle(radians(this.rotation), this.len);
        let gunPosTemp = createVector(this.x, this.y);
        let bulletPos = p5.Vector.add(bulletTemp, gunPosTemp);
        // bulletPos.setMag(1);
  
        let bullet = new this.bullets.Sprite(bulletPos.x, bulletPos.y);
  
        bullet.diameter = 5;
        bullet.color = "white";
        bullet.direction = this.rotation + random(-10,10);
        bullet.speed = random(13, 15);
        bullet.collider = "d";
        bullet.layer = 1;
        bullet.bounce = 0.8;
        bullet.life = this.range + random(-5, 5);
        bullet.mass = 3;  
        bullet.bounciness = 0.8;
        bullet.update = () => {
          bullet.scale *= 0.99;
        }
        // this.bulletArray.push(bullet);
      }
      shotgun.timer.start();
    }
  }

  shotgun.isUnequipped = function() {
    // this.img = shotgunIconImg;
    // this.removeColliders();
    // this.scale = 0.07;
    this.inInventory = false;
    this.layer = 2;
    this.rotationSpeed = 0;
    this.icon.visible = false;
    this.img = shotgunIconImg;
    this.scale = 0.07;
    this.offset.x = -5;
    this.offset.y = 5;
    // this.timer = undefined;
  }

  //pistol
  pistol = new guns.Sprite(player.x - 100, player.y);
  pistol.removeColliders();
  pistol.layer = 2;
  pistol.bulletArray = [];
  pistol.gunType = "pistol";
  pistol.range = 70;
  pistol.len = 39;
  pistol.img = pistolIconImg;
  pistol.scale = 0.1;
  pistol.inInventory = false;
  pistol.bullets = new bullets.Group();

  pistolIcon = new Sprite()
  pistolIcon.removeColliders();
  pistolIcon.img = pistolIconImg;
  pistolIcon.scale = 0.18;
  pistolIcon.visible = false;
  pistolIcon.rotate(-25);
  pistolIcon.offset.x = 2;
  pistol.icon = pistolIcon;
  
  pistol.isEquipped = function()   {
    this.img = pistolImg;
    this.layer = 6;
    this.offset.x = 33;
    this.scale = 0.6;
    this.x = this.owner.x;
    this.y = this.owner.y;
    this.rotateTowards(mouse, 1.2, 1);
    // this.equipped = true;
    this.inInventory = true;
  }

  pistol.shoot = function() {
    let bulletTemp = p5.Vector.fromAngle(radians(this.rotation), this.len);
    let gunPosTemp = createVector(this.x, this.y);
    let bulletPos = p5.Vector.add(bulletTemp, gunPosTemp);

    // let bullet = new bullets.Sprite(bulletPos.x, bulletPos.y);
    let bullet = new this.bullets.Sprite(bulletPos.x, bulletPos.y);
    
    bullet.life = this.range;
    bullet.diameter = 6;
    bullet.color = "black";
    bullet.direction = this.rotation;
    bullet.speed = random(10, 12);
    bullet.collider = "d";
    bullet.layer = 1;
    bullet.mass = 3;
    // console.log(bullet.life)
    // this.bulletArray.push(bullet);
  }
  pistol.updateWhileEquipped = function() {
    this.x = this.owner.x;
    this.y = this.owner.y;
    if(this.owner === player) {
      this.rotateTowards(mouse, 1.2, 1)
    }
  }
  
  pistol.isUnequipped = function() {
    this.inInventory = false;
    this.layer = 2;
    this.rotationSpeed = 0;
    this.img = pistolIconImg;
    this.scale = 0.1;
    this.offset.x = 0;
    this.icon.visible = false;
  }


  //pistol
  sniper = new guns.Sprite(player.x - 200, player.y);
  sniper.removeColliders();
  sniper.layer = 2;
  sniper.bulletArray = [];
  sniper.range = 120;
  sniper.len = 61;
  sniper.img = sniperIconImg;
  sniper.scale = 0.073;
  sniper.inInventory = false;
  sniper.bullets = new bullets.Group();

  sniperIcon = new Sprite()
  sniperIcon.removeColliders();
  sniperIcon.img = sniperIconImg;
  sniperIcon.scale = 0.063;
  sniperIcon.visible = false;
  sniperIcon.rotate(-35);
  sniperIcon.offset.x = -1;
  sniper.icon = sniperIcon;
  
  sniper.isEquipped = function()   {
    this.img = sniperImg;
    this.layer = 6;
    this.offset.x = 39;
    this.scale = 0.45;
    this.x = this.owner.x;
    this.y = this.owner.y;
    this.rotateTowards(mouse, 1.2, 1);
    // this.equipped = true;
    this.inInventory = true;
  }

  sniper.shoot = function() {

    let bulletTemp = p5.Vector.fromAngle(radians(this.rotation), this.len);
    let gunPosTemp = createVector(this.x, this.y);
    let bulletPos = p5.Vector.add(bulletTemp, gunPosTemp);

    // let bullet = new bullets.Sprite(bulletPos.x, bulletPos.y);
    let bullet = new this.bullets.Sprite(bulletPos.x, bulletPos.y);
    
    bullet.life = this.range;
    bullet.diameter = 6;
    bullet.color = "black";
    bullet.direction = this.rotation;
    bullet.speed = random(10, 12);
    bullet.collider = "d";
    bullet.layer = 1;
    bullet.mass = 3;
    // console.log(bullet.life)
    // this.bulletArray.push(bullet);
  }
  sniper.updateWhileEquipped = function() {
    this.x = this.owner.x;
    this.y = this.owner.y;
    if(this.owner === player) {
      this.rotateTowards(mouse, 1.2, 1)
    }
  }
  
  sniper.isUnequipped = function() {
    this.inInventory = false;
    this.layer = 2;
    this.rotationSpeed = 0;
    this.img = sniperIconImg;
    this.scale = 0.08;
    this.offset.x = 0;
    this.icon.visible = false;
  }



}







function updateGui() {
  box1.x = player.x + 230;
  box1.y = player.y + 160;

  box2.x = player.x + 310;
  box2.y = player.y + 160;

  box3.x = player.x + 390;
  box3.y = player.y + 160;

  if(player.activeSlot === player.slot1) {
    selectionBox.x = box1.x;
    selectionBox.y = box1.y;
  }
  else if(player.activeSlot === player.slot2) {
    selectionBox.x = box2.x;
    selectionBox.y = box2.y;
  }
  else if(player.activeSlot === player.slot3) {
    selectionBox.x = box3.x;
    selectionBox.y = box3.y;
  }

  if(player.slot1.full === true) {
    player.slot1.gun.icon.x = box1.x;
    player.slot1.gun.icon.y = box1.y;
    player.slot1.gun.icon.visible = true;
  }
  if(player.slot2.full === true) {
    player.slot2.gun.icon.x = box2.x;
    player.slot2.gun.icon.y = box2.y;
    player.slot2.gun.icon.visible = true;
  }
  if(player.slot3.full === true) {
    player.slot3.gun.icon.x = box3.x;
    player.slot3.gun.icon.y = box3.y;
    player.slot3.gun.icon.visible = true;
  }
}

function updateInventory() {
  for(let slot of player.inventory) {
    if (slot.full === false) {
      player.inventoryIsFull = false;
      break;
    }
    else{
      player.inventoryIsFull = true;
    }
  }
}

function updateGuns() {
  
  for (let slot of player.inventory) {
    if (slot.full === true && slot !== player.activeSlot) {
      slot.gun.visible = false;
      slot.gun.x = slot.gun.owner.x;
      slot.gun.y = slot.gun.owner.y;
    }
  }

  let ammoInVicinity = ammos.some(ammo => dist(player.x, player.y, ammo.x, ammo.y) < 50);
  if(kb.presses("f") && ammoInVicinity){
    let ammo = ammos.find(ammo => dist(player.x, player.y, ammo.x, ammo.y) < 50);
    ammo.isPicked();
  }

  let gunInVicinity = guns.some(gun => dist(player.x, player.y, gun.x, gun.y) < 50 && !gun.inInventory);
  if(kb.presses("e")){
    if(gunInVicinity){
      let gun = guns.find(gun => dist(player.x, player.y, gun.x, gun.y) < 50 && !gun.inInventory);
        if ( player.inventoryIsFull === false) {
          player.equipGun(gun);
        }
        else {
          player.unEquipGun();
          player.equipGun(gun);
        }
    }
    else if(player.activeSlot.full){
      player.unEquipGun();
    }
    
  } 

                 

  if (player.activeSlot.full === true) {
    player.activeSlot.gun.visible = true;
    player.activeSlot.gun.updateWhileEquipped();
    if(mouse.presses()) {
      player.activeSlot.gun.shoot();
    }
  }
}

let sideLength = 45/2;
function drawGrid() {
  // if(mouse.presses()){
  //   if(mouseX >= 0 && mouseX <= 4400 && mouseY >= 0 && mouseY <= 4400) {
  //     let xPos = round((mouseX+camera.x - width/2) / 22);
  //     let yPos = round((mouseY+camera.y - height/2) / 22);
  //     if(grid[yPos][xPos] === 1){
  //       grid[yPos][xPos] = 0;
  //     }

  //     else {
  //       grid[yPos][xPos] = 1;
  //     }
  //   }
  // }
  if(mouse.pressing()) {
    let yVal = round((mouse.y - sideLength/2) / 22);
    let xVal = round((mouse.x - sideLength/2) / 22);
    if(grid[yVal] !== undefined) {
      if(grid[yVal][xVal] === 1) {
        grid[yVal][xVal] = 0;
      }
      else{
        grid[yVal][xVal] = 1;
      }
    }
  }
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if(grid[i][j] === 1) {
        // let bob = new referenceBoxes.Sprite(j*44/2 + sideLength/2, i*44/2 + sideLength/2, sideLength, sideLength, "n");
        // bob.layer = 10;
        rect(j*22 + sideLength/2, i*22 + sideLength/2, sideLength, sideLength);
      }
      // text(j*44/2 + sideLength/2, i*44/2 + sideLength/2, "hi")
    }
  }
}






