// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bg, bgGround, bgResources;
// let player;
// let obstacle1, obstacle2, obstacle3, obstacle4;
// let obstacles = [obstacle1, obstacle2, obstacle3, obstacle4];
let obstacles = [];
let guns;
let globalBullets = [];
let walls, wallImg;
let tileMap;
let camOffsetX, camOffsetY;
let keys = new Set();

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
let steeringBehavior, wanderBehavior, obstacleAvoidanceBehavior, obstacleEntities;


//ammo groups
let shotgunAmmos, sniperAmmos, pistolAmmos;

//enemy guns
let enemyGuns;

function preload() {
  // bgGround = loadImage("assets/test-maps/tile-map-ground-1.png");
  // bgResources = loadImage("assets/test-maps/tile-map-resources-1.png")
  

  //loading in navmesh
  loadJSON("mapdata.json", function(data){
    grid = data.obstacles;
  });
  


  //textures
  bg = loadImage("assets/test-maps/base-layer-1.png");
  wallImg = loadImage("assets/wall.png");
  taigaTreeImg = loadImage("assets/tile-images/taiga_tree.png");
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

  rectMode(CENTER);
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
  player.slot1 = {isFull: false};
  player.slot2 = {isFull: false};
  player.slot3 = {isFull: false};
  player.inventory = [player.slot1, player.slot2, player.slot3];
  player.activeSlot = player.slot1;
  player.reloading = false;
  player.gameEntity = new YUKA.GameEntity();
  player.boundingRadius = 80;

  class Ammo{
    constructor(type, ammoLeft) {
      this.type = type;
      this.ammoLeft = ammoLeft;
    }
  }
  
  player.ammos = [new Ammo("shotgun", 0), new Ammo("sniper", 0), new Ammo("pistol", 0)];
  
  player.reloadTimer = new Timer(4000);



  player.reload = function() {
    if(this.activeSlot.isFull) {
      this.activeSlot.gun.reload();
    }
  };




  player.equipGun = function(gun) {
    if(this.activeSlot.isFull === true) {
      // this.stashGun(this.activeSlot.gun);
      for (let slot of this.inventory) {
        if (slot.isFull === false) {
          player.activeSlot = slot;
          break;
        }
      }
    }

    gun.owner = this;
    this.activeSlot.gun = gun;
    this.activeSlot.isFull = true;
    gun.isEquipped();

    // this.inventory.push(gun);
    // this.currentGun = gun;
  };

  player.unEquipGun = function() {
    player.activeSlot.gun.isUnequipped();
    player.activeSlot.isFull = false;
    delete player.activeSlot.gun;
    // console.log("whta")
  };
  // player.debug = true;
  // player.img = "assets/ball-img.png";
  

  //enemies
  enemies = new entities.Group();
  // enemies.w = 72;
  // enemies.h = 72;
  enemies.diameter = 90;
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
  enemyGuns = new Group();
  // guns.mass = 1000;
  // guns.collider = "n";
  // guns.equipped = false;


  //bullets
  bullets = new Group();
  ammos = new Group();
  shotgunAmmos = new ammos.Group();
  pistolAmmos = new ammos.Group();
  sniperAmmos = new ammos.Group();

  createAmmo("shotgun", player.x, player.y);
  createAmmo("pistol", player.x, player.y + 100);
  createAmmo("sniper", player.x, player.y - 100);
  //gui
  initGui();

  //guns creation
  initGuns();




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
  bigRocks = new naturalResources.Group();
  bigRocks.img = bigRockImg;
  bigRocks.tile = "b";

  smallRocks = new naturalResources.Group();
  smallRocks.img = smallRockImg;
  smallRocks.tile = "s";
  

  //random resources
  flowerBaskets = new naturalResources.Group();
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
    tree.addCollider(0, 85, 40, 60);
    tree.layer = 0;
    tree.scale *= 0.45;
  }
  for(let rock of bigRocks) {
    rock.removeColliders();
    rock.addCollider(-5, -90, 115, 100);
    rock.addCollider(76, 5, 50, 135);
    rock.addCollider(-80, 18, 40, 130);
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


  // player.autoDraw = false;
  createEnemies(1);

  //entity manager
  obstacleEntities = new YUKA.EntityManager();

  for(let obstacle of naturalResources) {
    let obst = new YUKA.GameEntity();
    obst.position.x = obstacle.x;
    obst.position.z = obstacle.y;
    obst.boundingRadius = 80;
    obstacles.push(obst);
    obstacleEntities.add(obst);
  }
}

function draw() {
  clear();
  
  
  background(10);
  noStroke();
  camera.on();
  


  
  // console.log(player.x);
  updateGui();
  image(bg, 0 - player.vel.x, 0 - player.vel.y);
  // player.draw();
  updatePlayerMovement();
  // camera.moveTo(player, 1.5);
  
  // drawGrid();
  camera.off();
  // trackPlayer();


  updateGuns();
  updateEnemyGuns();
  updateInventory();

  camera.x = player.x;
  camera.y = player.y;
  obstacleEntities.update(1);
  // console.log("camera: " + camera.x + ", player: " + player.x);
  // console.log("player: " + player.x + ", box: " + box1.x);
  // console.log("diff: " + (player.x - box1.x));
}

function keyPressed() {
  if(!player.reloading) {
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

  keys.add(key);

}

function keyReleased() {
  keys.delete(key);
}

let spd = 0;
let accel = 0.1;
function updatePlayerMovement() {
  // console.log(keys);
  let maxSpd = 5;
  if (keyIsPressed && [...keys].some(element => ["w", "a", "s", "d"].includes(element))) {
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

  player.gameEntity.position.x = player.x;
  player.gameEntity.position.z = player.y;
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
  if(key === "r") {
    if(player.activeSlot.isFull) {
      let currentAmmo = player.ammos.find((anAmmo) => anAmmo.type === player.activeSlot.gun.gunType);
      if(currentAmmo && currentAmmo.ammoLeft > 0) {
        currentAmmo.ammoLeft -= 10;
        player.activeSlot.gun.ammo = 10;
        console.log("locked and loaded sir");
        
      }
    }
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


  createGun("shotgun", player.x, player.y);
  createGun("shotgun", player.x + 80, player.y);
  createGun("sniper", player.x - 100, player.y);
  createGun("pistol", player.x + 200, player.y);

  //for all the guns
  for (let gun of guns) {
    gun.bulletArray = [];
    // gun.offset.x = 25;
    gun.bounciness = 0;
    gun.friction = 0;
    gun.drag = 0;
    gun.rotationDrag = 0;
  }

}







function updateGui() {
  // box1.x = player.x + 290;
  box1.x = player.x + width/2 - 400;
  box1.y = player.y + height/2 - 150;
  // box1.x += player.vel.x + 3;
  // box1.y += player.vel.y + 3;

  // box2.x = player.x + 370;
  box2.x = player.x + width/2 - 325;
  box2.y = player.y + height/2 - 150;

  // box3.x = player.x + 450;
  // box3.y = player.y + 210;
  box3.x = player.x + width/2 - 250;
  box3.y = player.y + height/2 - 150;

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

  if(player.slot1.isFull === true) {
    player.slot1.gun.icon.x = box1.x;
    player.slot1.gun.icon.y = box1.y;
    player.slot1.gun.icon.visible = true;
  }
  if(player.slot2.isFull === true) {
    player.slot2.gun.icon.x = box2.x;
    player.slot2.gun.icon.y = box2.y;
    player.slot2.gun.icon.visible = true;
  }
  if(player.slot3.isFull === true) {
    player.slot3.gun.icon.x = box3.x;
    player.slot3.gun.icon.y = box3.y;
    player.slot3.gun.icon.visible = true;
  }
}

function updateInventory() {
  for(let slot of player.inventory) {
    if (slot.isFull === false) {
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
    if (slot.isFull === true && slot !== player.activeSlot) {
      slot.gun.visible = false;
      slot.gun.x = slot.gun.owner.x;
      slot.gun.y = slot.gun.owner.y;
    }
  }

  let ammoInVicinity = ammos.some(ammo => dist(player.x, player.y, ammo.x, ammo.y) < 50);
  if(kb.presses("f") && ammoInVicinity && !player.reloading){
    let ammo = ammos.find(ammo => dist(player.x, player.y, ammo.x, ammo.y) < 50);
    ammo.isPicked();
  }

  let gunInVicinity = guns.some(gun => dist(player.x, player.y, gun.x, gun.y) < 50 && !gun.inInventory);
  if(kb.presses("e") && !player.reloading){
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
    else if(player.activeSlot.isFull){
      player.unEquipGun();
    }
    
  } 

                 

  if (player.activeSlot.isFull === true) {
    player.activeSlot.gun.visible = true;
    player.activeSlot.gun.updateWhileEquipped();
    if(mouse.presses() && !player.reloading) {
      player.activeSlot.gun.shoot();
    }
  }

  if(player.reloading) {
    player.speed *= 0.8;
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


function createGun(gun, x, y) {
  if(gun === "shotgun") {
    let shotgun = new guns.Sprite(x, y);
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
    shotgun.ammo = 10;

  
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
    shotgun.icon = shotgunIcon;
  
    shotgun.isEquipped = function() {
      this.img = shotgunImg;
      this.layer = 6;
      this.offset.y = -5;
      this.offset.x = 35;
      this.scale = 0.9;
      this.x = this.owner.x;
      this.y = this.owner.y;
      this.rotateTowards(mouse, 1.2, 1);
      this.inInventory = true;
    };
  
    shotgun.updateWhileEquipped = function() {
      this.x = this.owner.x;
      this.y = this.owner.y;
      if(this.owner === player) {
        this.rotateTowards(mouse, 1.2, 1);
      }
    };
    shotgun.shoot = function() {
      if(shotgun.ammo > 0) {
        for (let i = 0; i <= 10; i++) {
          
          //position from an angle
          let bulletTemp = p5.Vector.fromAngle(radians(this.rotation), this.len);
          let gunPosTemp = createVector(this.x, this.y);
          let bulletPos = p5.Vector.add(bulletTemp, gunPosTemp);
          // bulletPos.setMag(1);
    
          let bullet = new this.bullets.Sprite(bulletPos.x, bulletPos.y);
    
          // bullet.diameter = 5;
          bullet.w = 5;
          bullet.h = 3;
          // bullet.offset.y = 2.5;
          bullet.color = "orange";
          bullet.direction = this.rotation + random(-20,20);
          bullet.speed = random(10, 13);
          bullet.collider = "d";
          bullet.layer = 1;
          bullet.bounce = 0.8;
          bullet.life = this.range + random(-5, 5);
          bullet.mass = 3;  
          bullet.bounciness = 1;
          bullet.update = () => {
            bullet.w = map(bullet.speed, 0, bullet.speed, 5, 6);
            bullet.scale *= 0.99;
            bullet.rotation = bullet.direction;

          };
          bullet.overlaps(bullets);
          // this.bulletArray.push(bullet);
        }
        shotgun.ammo -= 1;
      }
    };
  
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
    };
  }
  else if (gun === "pistol") {
    pistol = new guns.Sprite(x, y);
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
    pistol.ammo = 10;
  
    pistolIcon = new Sprite();
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
    };
  
    pistol.shoot = function() {
      if(pistol.ammo > 0) {
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
        bullet.overlaps(bullets);
        pistol.ammo -= 1;
        // console.log(bullet.life)
        // this.bulletArray.push(bullet);
      }
    };
    pistol.updateWhileEquipped = function() {
      this.x = this.owner.x;
      this.y = this.owner.y;
      if(this.owner === player) {
        this.rotateTowards(mouse, 1.2, 1);
      }
    };
    
    pistol.isUnequipped = function() {
      this.inInventory = false;
      this.layer = 2;
      this.rotationSpeed = 0;
      this.img = pistolIconImg;
      this.scale = 0.1;
      this.offset.x = 0;
      this.icon.visible = false;
    };
  }
  else if (gun === "sniper") {
    sniper = new guns.Sprite(x, y);
    sniper.removeColliders();
    sniper.gunType = "sniper";
    sniper.layer = 2;
    sniper.bulletArray = [];
    sniper.range = 120;
    sniper.len = 61;
    sniper.img = sniperIconImg;
    sniper.scale = 0.073;
    sniper.inInventory = false;
    sniper.bullets = new bullets.Group();
    sniper.ammo = 10;
  
    sniperIcon = new Sprite();
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
      this.offset.x = 35;
      this.scale = 0.4;
      this.scale.y = 0.5;
      this.x = this.owner.x;
      this.y = this.owner.y;
      this.rotateTowards(mouse, 1.2, 1);
      // this.equipped = true;
      this.inInventory = true;
    };
  
    sniper.shoot = function() {
      if(sniper.ammo > 0) {
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
        bullet.overlaps(bullets);
        this.ammo -= 1;
        // console.log(bullet.life)
        // this.bulletArray.push(bullet);
      }
    };
    sniper.updateWhileEquipped = function() {
      this.x = this.owner.x;
      this.y = this.owner.y;
      if(this.owner === player) {
        this.rotateTowards(mouse, 1.2, 1);
      }
    };
    
    sniper.isUnequipped = function() {
      this.inInventory = false;
      this.layer = 2;
      this.rotationSpeed = 0;
      this.img = sniperIconImg;
      this.scale = 0.08;
      this.offset.x = 0;
      this.icon.visible = false;
    };
  }
}

function createAmmo(gunType, x, y) {
  if(gunType === "shotgun") {
    let shotgunAmmo = new shotgunAmmos.Sprite(x, y);
    shotgunAmmo.removeColliders();
    shotgunAmmo.debug = true;
    shotgunAmmo.type = "shotgun";
    shotgunAmmo.isPicked = function() {
      let gunAmmo = player.ammos.find((ammoType) => ammoType.type === "shotgun");
      gunAmmo.ammoLeft += 10;
      this.remove();
    };
  }
  else if(gunType === "pistol") {
    let pistolAmmo = new shotgunAmmos.Sprite(x, y);
    pistolAmmo.removeColliders();
    pistolAmmo.debug = true;
    pistolAmmo.type = "pistol";
    pistolAmmo.isPicked = function() {
      let gunAmmo = player.ammos.find((ammoType) => ammoType.type === "pistol");
      gunAmmo.ammoLeft += 10;
      this.remove();
    };
  }
  else if(gunType === "sniper") {
    let sniperAmmo = new sniperAmmos.Sprite(x, y);
    sniperAmmo.removeColliders();
    sniperAmmo.debug = true;
    sniperAmmo.type = "sniper";
    sniperAmmo.isPicked = function() {
      let gunAmmo = player.ammos.find((ammoType) => ammoType.type === "sniper");
      gunAmmo.ammoLeft += 10;
      this.remove();
    };
  }
}


function createEnemyGun(owner, type) {
  if (type === "shotgun") {
    let shotgun = new enemyGuns.Sprite(owner.x, owner.y);
    shotgun.removeColliders();
    shotgun.gunType = "shotgun";
    shotgun.owner = owner;
    shotgun.range = 20;
    shotgun.len = 53;
    shotgun.rotationLock = true;
    shotgun.img = shotgunImg;
    shotgun.layer = 6;
    shotgun.offset.y = -5;
    shotgun.offset.x = 35;
    shotgun.scale = 0.9;
    shotgun.x = owner.x;
    shotgun.y = owner.y;
    // shotgun.rotateTowards(mouse, 1.2, 1);
    shotgun.rotation = owner.rotation;


    shotgun.shoot = function() {
      for (let i = 0; i <= 10; i++) {
        
        //position from an angle
        let bulletTemp = p5.Vector.fromAngle(radians(this.rotation), this.len);
        let gunPosTemp = createVector(this.x, this.y);
        let bulletPos = p5.Vector.add(bulletTemp, gunPosTemp);
        // bulletPos.setMag(1);
  
        let bullet = new bullets.Sprite(bulletPos.x, bulletPos.y);
  
        // bullet.diameter = 5;
        bullet.w = 5;
        bullet.h = 3;
        // bullet.offset.y = 2.5;
        bullet.color = "orange";
        bullet.direction = this.rotation + random(-20,20);
        bullet.speed = random(10, 13);
        bullet.collider = "d";
        bullet.layer = 1;
        bullet.bounce = 0.8;
        bullet.life = this.range + random(-5, 5);
        bullet.mass = 3;  
        bullet.bounciness = 1;
        bullet.update = () => {
          bullet.w = map(bullet.speed, 0, bullet.speed, 5, 6);
          bullet.scale *= 0.99;
          bullet.rotation = bullet.direction;
        };
        bullet.overlaps(bullets);
      }
    };
    return shotgun;
  }
}

function updateEnemyGuns() {
  enemies.forEach(function(enemy) {
    enemy.gun.x = enemy.x;
    enemy.gun.y = enemy.y;
    if(dist(enemy.x, enemy.y, player.x, player.y) < 300) {
      enemy.rotateTowards(player);
      enemy.gun.rotateTowards(player, 0.1);
    }
    else {
      
      enemy.rotateTowards(enemy.direction);
      enemy.gun.rotateTowards(enemy.rotation);
    }
    // let rot;
    // if(enemy.rotation < 0) {
    //   rot = 180 - Math.abs(enemy.rotation) + 180;
    // }
    // else {
    //   rot = enemy.rotation;
    // }
    // enemy.gun.rotateTowards(enemy.rotation);
    enemy.velocity.x = enemy.vehicle.velocity.x;
    enemy.velocity.y = enemy.vehicle.velocity.z;
    // enemy.rotateTowards(enemy.direction);
    enemy.vehicle.update(1);
    // enemy.moveTo(enemy.goalPoint, 1);
    // if(enemy.x === enemy.goalPoint.x && enemy.y === enemy.goalPoint.y){
    //   enemy.reached = true;
    // }
    // if(enemy.reached) {
      
    //   enemy.goalPoint = createVector(enemy.x + random(-100, 100), enemy.y + random(-10, 10));
    //   enemy.reached = false;
    // }
    
  });

  // console.log(enemies[0].rotation);
}

function createEnemies(num) {
  for(let i = 0; i < num; i++) {
    let enemy = new enemies.Sprite(player.x + 150, player.y + 100);
    enemy.gun = createEnemyGun(enemy, "shotgun");
    enemy.goalPoint = enemy.position.copy();
    enemy.reached = true;
    enemy.vehicle = new YUKA.Vehicle();
    enemy.vehicle.boundingRadius = 100;
    enemy.vehicle.position.x = enemy.x;
    enemy.vehicle.position.z = enemy.y;
    enemy.vehicle.maxSpeed = 2;
    enemy.vehicle.smoother = new YUKA.Smoother(3);
    // enemy.vehicle.goal = new YUKA.Goal()
    

    //pursure behavior
    let pursueBehavior = new YUKA.PursuitBehavior(player.gameEntity);

    //defining wander behavior
    let wanderBehavior = new YUKA.WanderBehavior();
    wanderBehavior.jitter = 1.5;
    wanderBehavior.radius = 0.2;
    // wanderBehavior.weight = 5;

    //defining avoidance behavior
    let obstacleAvoidanceBehavior = new YUKA.ObstacleAvoidanceBehavior(obstacles);
    obstacleAvoidanceBehavior.dBoxMinLength = 80;
    // obstacleAvoidanceBehavior.weight = 1;
    obstacleAvoidanceBehavior.brakingWeight = 0.8;


    // enemy.vehicle.steering.behaviors.push(wanderBehavior);
    // enemy.vehicle.steering.behaviors.push(obstacleAvoidanceBehavior);
    // enemy.vehicle.steering.behaviors.push(pursueBehavior);
    // setInterval(enemy.gun.shoot(), 3000);
    
  }
}