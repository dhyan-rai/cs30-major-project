// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let bg, bgGround, bgResources;
let obstacles = [];
let guns;
let globalBullets = [];
// let walls, wallImg;
let tileMap;
let camOffsetX, camOffsetY;
let keys = new Set();

//tiles
let taigaTrees, taigaTreeImg, stones, yellowTrees, yellowTreeImg, bigRocks, bigRockImg, smallRocks, smallRockImg;
let flowerBaskets, flowerBasketImg;
let naturalResources;
let walls1, wallImg1;
let wallRowTop, wallRowTopImg;
let walls, wallsImg;

//entities
let enemies, player, entities;


//bullets
let bullets, ammos;

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
let healthBar, box1, box1Img, box2, box2Img, box3, box3Img, selectionBox, selectionBoxImg, loadingAniSpriteSheet, loadingAni;
let shotgunAmmoCount, pistolAmmoCount, sniperAmmoCount;
let shotgunAmmoIcon, pistolAmmoIcon, sniperAmmoIcon;
let panelImage, panel;
let startScreen, startScreenImg;
let deathScreen, deathScreenImg;
let winScreen, winScreenImg;


//pathfinding vars
let grid, referenceBoxes;

//YUKA vars
let steeringBehavior, wanderBehavior, obstacleAvoidanceBehavior, pursueBehavior, seekBehavior, obstacleEntities;
let entityManager;

//ammo groups
let shotgunAmmos, sniperAmmos, pistolAmmos, shotgunAmmoImg, pistolAmmoImg, sniperAmmoImg;

//enemy guns
let enemyGuns;

//crates
let crates, crate, crateSpriteSheet, crateDetectors;


//zone
let zoneRadius = 2100, zoneTimer, zone, zoneText;

//state variables
let gameRunning = false, initiatingGame = false, onStartScreen = true;

//timers

function preload() {

  //loading in images

  //background image
  bg = loadImage("assets/test-maps/base-layer-1.png");

  //loading in tile images
  taigaTreeImg = loadImage("assets/tile-images/taiga_tree.png");
  bigRockImg = loadImage("assets/tile-images/big-rock.png");
  yellowTreeImg = loadImage("assets/tile-images/yellow-tree.png");
  flowerBasketImg = loadImage("assets/tile-images/flower-basket.png");
  smallRockImg = loadImage("assets/tile-images/small-rock.png");
  wallsImg = loadImage("assets/tile-images/walls-zoom-400.png");
  crateSpriteSheet = loadImage("assets/tile-images/crates-clean.png");

  //loading in gun assets
  shotgunImg = loadImage("assets/gun-assets/topdown-images/shotgun-4.png");
  pistolImg = loadImage("assets/gun-assets/topdown-images/pistol-2.png");
  pistolIconImg = loadImage("assets/gun-assets/icons/pistol.png");
  sniperImg = loadImage("assets/gun-assets/topdown-images/sniper.png");
  sniperIconImg = loadImage("assets/gun-assets/icons/sniper2.png");
  shotgunIconImg = loadImage("assets/gun-assets/icons/shotgun.png");

  //loading in gui assets
  box1Img = loadImage("assets/inventory/inventory-box-blue.png");
  selectionBoxImg = loadImage("assets/inventory/selection-box.png");
  loadingAniSpriteSheet = loadImage("assets/inventory/loading-ani.png");


  //screens
  startScreenImg = loadImage("assets/start-screen-image.png");
  deathScreenImg = loadImage("assets/death-screen-img.png");
  winScreenImg = loadImage("assets/win-screen-img.png");



  //ammo images
  shotgunAmmoImg = loadImage("assets/gun-assets/ammo-images/ammo-shotgun.png");
  pistolAmmoImg = loadImage("assets/gun-assets/ammo-images/ammo-pistol.png");
  sniperAmmoImg = loadImage("assets/gun-assets/ammo-images/ammo-sniper.png");

}

function setup() {


  rectMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  textFont("Comic Sans MS");
  allSprites.autoCull = false;

  // cursor("assets/icons/shotgun.png");

  bg.width *= 0.5;
  bg.height *= 0.5;



  crates = new Group();
  crateDetectors = new Group();
  // crates = new Group();
  crates.w = 64;
  crates.h = 64;
  crates.tile = "c";
  

  new Canvas(windowWidth, windowHeight);

  //creating player sprite
  
  entities = new Group();
  //entity manager
  entityManager = new YUKA.EntityManager();







  //enemies
  enemies = new entities.Group();
  enemies.diameter = 90;
  enemies.mass = 40;
  enemies.collider = "d";
  enemies.bounciness = 0;
  enemies.rotationLock = true;  
  enemies.friction = 0;
  enemies.drag = 0;
  enemies.scale = 0.25;
  enemies.layer = 5;

  //creating gun
  guns = new Group();
  enemyGuns = new Group();



  //bullets
  bullets = new Group();
  ammos = new Group();
  shotgunAmmos = new ammos.Group();
  pistolAmmos = new ammos.Group();
  sniperAmmos = new ammos.Group();



  //wall rows
  wallsImg.width *= 0.689;
  wallsImg.height *= 0.687;
  walls = new Sprite();
  walls.img = wallsImg;
  walls.removeColliders();
  walls.collider = 's';
  walls.position.set(wallsImg.width/2 - 5, wallsImg.height/2 - 40);
  walls.addCollider(-walls.w/2 + 20, 20, 20, walls.height - 20);
  walls.addCollider(2180, 20, 20, walls.height - 20);
  walls.addCollider(0, -wallsImg.height / 2 + 65, wallsImg.width - 20, 20);
  walls.addCollider(0, wallsImg.height / 2 - 33, wallsImg.width - 20, 20);
  walls.layer = -1;
  // walls.debug = true;
  // wallRowTop.scale *= 0.6;

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
      "........................................t......................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................y...............",
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
      "...........................c...................................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "....................................................................f..........................................................",
      ".................b............................t..............................................s.................................",
      ".................................................................................................................b.............",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "...........................................c...............y................t..................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      ".....................y..................................................................................t......................",
      "...............................................................................................................................",
      ".............................................b...........................y.....................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "............t..................................................................................................................",
      "..........................................................c..................................................y.................",
      "...............................................................................................................................",
      "..........................................................................s....................................................",
      ".........................s.....................................................................................................",
      "................................................................................................t..............................",
      "...............................................................................................................................",
      ".............................................t.................................................................................",
      "...............................................................................................................................",
      "..............................................................................................................s................",
      ".........................................................................b.....................................................",
      "..........y.................c..................................................................................................",
      "...............................................................................................................................",
      "..................................................................................................t............................",
      "........................................t......................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "..............................................................t..................y.............................................",
      "..................t............................................................................................................",
      "...............................................................................................................................",
      "............................................................................................................f..................",
      "............................................y....................c.............................................................",
      "...............................................................................................................................",
      "...............................................................................t...............................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "...........................t...................................................................................................",
      ".................................................................................................t.............................",
      "......................................................t....................b...................................................",
      ".........b.....................................................................................................................",
      "...............................................................................................................................",
      ".............................c.................................................................................................",
      "...............................................................................................................................",
      "................................................................................................................s..............",
      "........................................................................y......................................................",
      "....................................................b......................................t...................................",
      "........................t......................................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "........................................c......................................................................................",
      "........................................................................f.....................................y................",
      "...............................................................................................................................",
      "............................................................................................s..................................",
      "...............................................................................................................................",
      "..............t.................t.............s................................................................................",
      ".....................................................................t.........................................................",
      "...............................................................................................................................",
      "........................................................................................................................s......",
      "..................................................................................................b............................",
      ".......................................s.......................................................................................",
      "...............................................................................................................................",
      "............................................................t..................................................................",
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
      "...............................................................................................................................",
      "....................................................................y.........................................t................",
      "...............................................................................................................................",
      "............b..................................................................................................................",
      "...............................................................................................................................",
      "....................................y....................b.....................................................................",
      "...............................................................................................t...............................",
      "...............................................................................................................................",
      "...............................................................................................................................",
      "...........................................f...............................b...................................................",
      "......b........................................................................................................................",
      "............................................................................................................b..................",
      "...............................................................................................................................",
      "............................s..................................................................................................",
      "...............................................................................................................................",
      "................................................y..............................................................................",
      ".............................................................................t............................f....................",
      "...............................................................................................................................",
      "......s........................................................................................................................",
      "...............................................................................................................................",
      "...............................................................................................................................",
    ],
    0,
    0,
    35,
    35
  );
    
  for(let crate of crates) {
    crate.layer = 1;
    crate.spriteSheet = crateSpriteSheet;
    crate.anis.offset.x = -2;
    crate.anis.offset.y = -4;
    crate.anis.frameDelay = 8;
    crate.addAnis({
      broken: { row: 3, frames: 7 },
      damaged: {row: 2, frames: 3},
      idle: {row: 2, frames: 1},
    });
    crate.anis.broken.scale = 1.7;
    crate.anis.broken.noLoop();
    crate.anis.damaged.scale = 1.7;
    crate.anis.idle.scale = 1.7;
    crate.removeColliders();
    crate.detector = new crateDetectors.Sprite(crate.x, crate.y, 32, 32);
    // crate.detector.debug = true;
    crate.detector.visible = false;
    crate.detector.collider = "s";
    // crate.debug = true;
    crate.damageTaken = false;
    crate.damageAniRunning = false;
    crate.health = 5;
    crate.ammoDispensed = false;
    crate.entity = new YUKA.GameEntity();
    crate.entity.position.x = crate.x;
    crate.entity.position.z = crate.y;
    crate.entity.boundingRadius = 50;
    obstacles.push(crate.entity);
    entityManager.add(crate.entity);

    
  }


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

  // camera.x = player.x;
  // camera.y = player.y;


  // player.autoDraw = false;
  




  for(let obstacle of naturalResources) {
    let obst = new YUKA.GameEntity();
    obst.position.x = obstacle.x;
    obst.position.z = obstacle.y;
    obst.boundingRadius = 80;
    obstacles.push(obst);
    entityManager.add(obst);
  }
  

  startScreenImg.width *= 1.1;
  startScreenImg.height *= 1.1;
  startScreen = new Sprite();
  startScreen.img = startScreenImg;
  startScreen.removeColliders();
  startScreen.position.set(650, 650);

  
  initBehaviors();
  
  
  // camera.position.set(650, 650);
  // camera.position.set(0, 0);
  // initGuns();
  // createEnemies(25);

  // camera.zoom = 1.4;

  // initPlayer();
  // createGun("sniper", player.x + 30, player.y + -50);
  // createGun("shotgun", player.x + -74, player.y + 53);
  // createGun("pistol", player.x + 83, player.y + 32);
  // createEnemies(25);
  // initGui();
  
  // loadingAni.ani.frame = 3;



  // healthBar.offset.x= 100;

  //sprites that display the ammo count
  // shotgunAmmoCount = new Sprite();


  //making screen turn red when player goes outside of zone
    //screen turns red to indicate player outside of zone



  // panel = new Sprite();
  // panel.removeColliders();
  // panel.img = panelImage;
  // panel.layer = 10;
  // panel.scale *= 0.65;
}

function draw() {
  // clear();
  
  
  if(gameRunning) {
    updateGameState();
  }
  else {
    
    background(0);
    camera.on();
    image(bg, 0, 0);
    // camera.x += 0.1;
    // camera.y += 0.1;
    // if(keyboard.presses("d")) {
    //   camera.x += 200;
    // }
    // else if(keyboard.presses("a")) {
    //   camera.x -= 200;
    // }
    // if(keyboard.presses("w")){
    //   camera.y -= 200;
    // }
    // if(keyboard.presses("s")){
    //   camera.y += 200;
    // }
    startScreen.x += 0.1;
    startScreen.y += 0.1;
    camera.x = startScreen.x;
    camera.y = startScreen.y;
    camera.off();

    if(keyboard.presses(" ")) {
      initiatingGame = true;
    }

    if(initiatingGame) {
      initGame();
    }

    
  }

}

function keyPressed() {
  if(gameRunning){
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

}

function keyReleased() {
  if(gameRunning) {
    keys.delete(key);
  }
}

let spd = 0;
let accel = 0.1;
function updatePlayerMovement() {
  // console.log(keys);
  let maxSpd = 4;
  if (keyIsPressed && [...keys].some(element => ["w", "a", "s", "d"].includes(element)) && !player.isDead && !player.hasWon) {
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

  player.vehicle.position.x = player.x;
  player.vehicle.position.z = player.y;
  // player.vehicle.update(1/frameRate());
}

function updateHealth() {

  if(dist(player.x, player.y, bg.width/2, bg.height/2) > zone.radius && !player.isDead && !player.hasWon){
    // console.log("hi");
    player.health -= 0.05;
    player.dangerScreen.visible = true;
    if(player.dangerScreen.alpha < 50) {
      player.dangerScreen.alpha += 0.2;
    }

  }
  else{
    // player.dangerScreen.visible = false;
    // player.dangerScreen.color = color(0, 0, 0, 0);
    if(player.dangerScreen.alpha > 0) {
      player.dangerScreen.alpha -= 0.2;
    }
    else if(player.dangerScreen.alpha < 0) {
      player.dangerScreen.alpha = 0;
    }
  }

  bullets.forEach(function(bullet){
    if(player.collides(bullet) && !player.hasWon){
      player.health -= bullet.damage;
      // bullet.remove();
    }
  });

  if(player.health <= 0) {
    // world.autoStep = false;
    // allSprites.visible = false;
    // background(0);
    if(entities.includes(player)) {
      entities.splice(entities.indexOf(player), 1);
    }
    player.isDead = true;
    player.speed = 0;
    player.visible = false;
    player.overlaps(allSprites);
    if(player.activeSlot.isFull){
      player.activeSlot.gun.visible = false;
    }
    healthBar.visible = false;
    healthBar.outline.visible = false;
    deathScreen.position.set(player.x, player.y);
    deathScreen.visible = true;
  }

  player.dangerScreen.position.set(player.x, player.y);
  player.dangerScreen.color = color(player.dangerScreen.red, 0, 0, player.dangerScreen.alpha);

}

function keyTyped() {
  if(gameRunning) {
    if(key === "r") {
      if(player.activeSlot.isFull) {
        let currentAmmo = player.ammos.find((anAmmo) => anAmmo.type === player.activeSlot.gun.gunType);
        if(currentAmmo && currentAmmo.ammoLeft > 0) {
          // player.activeSlot.gun.ammo = 10;
          // console.log("locked and loaded sir");
          if(player.reloading === false){
            // currentAmmo.ammoLeft -= 10;
            player.activeSlot.gun.ammo = 0;
            player.activeSlot.gun.reloadTimer.start();
            player.reloading = true;
            loadingAni.visible = true;
            loadingAni.ani.frame = 0;
            player.prev = 0;
            player.current = 0;
          }
        }
      }
    }
  }
}

function initGui() {
  box1 = new Sprite(player.x + 220, player.y + 160);
  // box1.autoDraw = false;
  box1.img = box1Img;
  box1.layer = 25;
  box1.removeColliders();
  box1.scale = 1.5;
  box1.taken = false;

  box2 = new Sprite(player.x + 300, player.y + 160);
  box2.img = box1Img;
  box2.layer = 25;
  box2.removeColliders();
  box2.scale = 1.5;
  box2.taken = false;

  box3 = new Sprite(player.x + 380, player.y + 160);
  box3.img = box1Img;
  box3.layer = 25;
  box3.removeColliders();
  box3.scale = 1.5;
  box3.taken = false;

  selectionBox = new Sprite(box1.x + 10, box1.y);
  selectionBox.img = selectionBoxImg;
  selectionBox.layer = 24;
  selectionBox.removeColliders();
  selectionBox.scale = 2.2;

  shotgunAmmoIcon = new Sprite()
  shotgunAmmoIcon.img = shotgunAmmoImg;
  shotgunAmmoIcon.removeColliders();
  shotgunAmmoCount = new Sprite();
  shotgunAmmoCount.removeColliders();
  shotgunAmmoCount.textStroke = "black";
  shotgunAmmoCount.textStrokeWeight = 3;
  shotgunAmmoCount.textColor = "white";
  shotgunAmmoCount.text = "x" + player.ammos[0].ammoLeft;
  shotgunAmmoIcon.scale *= 1.3;
  shotgunAmmoCount.textSize *= 1.2;

  pistolAmmoIcon = new Sprite()
  pistolAmmoIcon.img = pistolAmmoImg;
  pistolAmmoIcon.removeColliders();
  pistolAmmoCount = new Sprite();
  pistolAmmoCount.removeColliders();
  pistolAmmoCount.textStroke = "black";
  pistolAmmoCount.textStrokeWeight = 3;
  pistolAmmoCount.textColor = "white";
  pistolAmmoCount.text = "x" + player.ammos[2].ammoLeft;
  pistolAmmoIcon.scale *= 1.3;
  pistolAmmoCount.textSize *= 1.2;


  sniperAmmoIcon = new Sprite()
  sniperAmmoIcon.img = sniperAmmoImg;
  sniperAmmoIcon.removeColliders();
  sniperAmmoCount = new Sprite();
  sniperAmmoCount.removeColliders();
  sniperAmmoCount.textStroke = "black";
  sniperAmmoCount.textStrokeWeight = 3;
  sniperAmmoCount.textColor = "white";
  sniperAmmoCount.text = "x" + player.ammos[1].ammoLeft;
  sniperAmmoIcon.scale *= 1.3;
  sniperAmmoCount.textSize *= 1.2;


  //loading animation
  loadingAni = new Sprite(player.x, player.y, 48, 48);
  loadingAni.removeColliders();
  loadingAni.spriteSheet = loadingAniSpriteSheet;
  loadingAni.anis.frameDelay = 8;
  loadingAni.addAnis({
    loading: {row: 0, frames: 5},
  });
  loadingAni.ani.scale = 1.3;
  loadingAni.ani.stop();
  loadingAni.visible = false;

  //zone 
  zoneTimer = new Timer(20000);
  zoneTimer.start();
  zone = new Sprite(bg.width/2, bg.height/2, zoneRadius * 2, "s");
  zone.color = color(0, 0, 0, 0);
  zone.stroke = "black";
  zone.strokeWeight = 3;
  zone.layer = 23;
  zone.decreasing = false;
  zone.finishedDecreasing = false;
  zone.overlaps(entities);
  zone.overlaps(naturalResources);
  zone.overlaps(bullets);
  zoneText = new Sprite();
  zoneText.removeColliders();
  zoneText.textSize = 18;
  zoneText.textColor = "white";
  zoneText.textStroke = "black";
  // zoneText.textStyle = 'Verdana';
  zoneText.textStrokeWeight = 2.5;
  zoneText.text = "Zone decreasing in: " + zoneTimer.getRemainingTime();

  //initializing healthbar
  healthBar = new Sprite(player.x + 100, player.y, 30, 5);
  healthBar.color = "green";
  healthBar.layer = 40;
  healthBar.overlaps(naturalResources);
  healthBar.overlaps(entities);
  healthBar.overlaps(bullets);
  healthBar.rotationLock = true;
  healthBar.offsetX = 0;
  healthBar.originalPosX = player.x + 100;
  healthBar.outline = new Sprite(healthBar.x, healthBar.y, healthBar.w, healthBar.h);
  healthBar.outline.stroke = "black";
  healthBar.outline.strokeWeight = 1.5;
  healthBar.outline.color = color(0, 0, 0, 0);
  healthBar.outline.overlaps(naturalResources);
  healthBar.outline.overlaps(entities);
  healthBar.outline.overlaps(bullets);
  healthBar.outline.rotationLock = true;

  player.dangerScreen = new Sprite(player.x, player.y, width, height);
  player.dangerScreen.overlaps(entities);
  player.dangerScreen.overlaps(naturalResources);
  player.dangerScreen.overlaps(bullets);
  player.dangerScreen.rotationLock = true;
  player.dangerScreen.collider = "s";
  player.dangerScreen.color = color(255, 0, 0, 40);
  player.dangerScreen.visible = false;
  player.dangerScreen.red = 255;
  player.dangerScreen.alpha = 10;

  // deathScreenImg.width *= 1.1;
  // deathScreenImg.height *= 1.1;
  deathScreen = new Sprite();
  deathScreen.img = deathScreenImg;
  deathScreen.removeColliders();
  deathScreen.visible = false;

  winScreen = new Sprite();
  winScreen.img = winScreenImg;
  winScreen.removeColliders();
  winScreen.visible = false;
}

function initGuns() {


  createGun("shotgun", player.x, player.y);
  createGun("shotgun", player.x + 80, player.y);
  createGun("sniper", player.x - 100, player.y);
  createGun("pistol", player.x + 200, player.y);

  //for all the guns
  // for (let gun of guns) {
  //   gun.bulletArray = [];
  //   // gun.offset.x = 25;
  //   gun.bounciness = 0;
  //   gun.friction = 0;
  //   gun.drag = 0;
  //   gun.rotationDrag = 0;
  // }

}







function updateGui() {
  // box1.x = player.x + 290;
  // box1.x = player.x + width/2 - 420;
  // box1.position.set(player.x + width/4, player.y + height/3.9);
  // box1.y = player.y + height/2 - 150;
  // box1.x += player.vel.x + 3;
  // box1.y += player.vel.y + 3;

  // box2.x = player.x + 370;
  // box2.x = player.x + width/2 - 345;
  // box2.y = player.y + height/2 - 150;
  
  // box3.x = player.x + 450;
  // box3.y = player.y + 210;
  // box3.x = player.x + width/2 - 270;
  // box3.y = player.y + height/2 - 150;
  
  box3.position.set(player.x + width/3.6, player.y + height/4.1);
  box2.position.set(box3.x - 70, box3.y);
  box1.position.set(box2.x - 70, box2.y);

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
    player.slot1.gun.ammoCount.text = player.slot1.gun.ammo;
    player.slot1.gun.ammoCount.position.set(box1.x + 16, box1.y + 18);
    player.slot1.gun.ammoCount.visible = true;
    
  }
  if(player.slot2.isFull === true) {
    player.slot2.gun.icon.x = box2.x;
    player.slot2.gun.icon.y = box2.y;
    player.slot2.gun.icon.visible = true;
    player.slot2.gun.ammoCount.text = player.slot2.gun.ammo;
    player.slot2.gun.ammoCount.position.set(box2.x + 16, box2.y + 18);
    player.slot2.gun.ammoCount.visible = true;
  }
  if(player.slot3.isFull === true) {
    player.slot3.gun.icon.x = box3.x;
    player.slot3.gun.icon.y = box3.y;
    player.slot3.gun.icon.visible = true;
    player.slot3.gun.ammoCount.text = player.slot3.gun.ammo;
    player.slot3.gun.ammoCount.position.set(box3.x + 16, box3.y + 18);
    player.slot3.gun.ammoCount.visible = true;
  }

  //displaying amount of ammo of each gun type that the player has

  //shotgun
  shotgunAmmoCount.text = "x" + player.ammos[0].ammoLeft;
  // shotgunAmmoIcon.position.set(player.x - 360, player.y + 100);
  // shotgunAmmoCount.position.set(shotgunAmmoIcon.x + 25, shotgunAmmoIcon.y);
  shotgunAmmoIcon.position.set(player.x - width/3.4, player.y + height/3.9);
  shotgunAmmoCount.position.set(shotgunAmmoIcon.x + 33, shotgunAmmoIcon.y);
  
  pistolAmmoCount.text = "x" + player.ammos[2].ammoLeft;
  // pistolAmmoIcon.position.set(shotgunAmmoIcon.x, shotgunAmmoIcon.y + 35);
  // pistolAmmoCount.position.set(pistolAmmoIcon.x + 25, pistolAmmoIcon.y);
  pistolAmmoIcon.position.set(shotgunAmmoIcon.x + 75, shotgunAmmoIcon.y);
  pistolAmmoCount.position.set(pistolAmmoIcon.x + 33, pistolAmmoIcon.y);

  sniperAmmoCount.text = "x" + player.ammos[1].ammoLeft;
  // sniperAmmoIcon.position.set(shotgunAmmoIcon.x, shotgunAmmoIcon.y + 70);
  // sniperAmmoCount.position.set(sniperAmmoIcon.x + 25, sniperAmmoIcon.y);
  sniperAmmoIcon.position.set(shotgunAmmoIcon.x + 150, shotgunAmmoIcon.y);
  sniperAmmoCount.position.set(sniperAmmoIcon.x + 33, sniperAmmoIcon.y);

  // panel.position.set(pistolAmmoIcon.x + 10, pistolAmmoIcon.y);

  //updating healthbar as player and when player takes damage
  let newWidth = map(player.health, 0, 20, 1, 30);
  let widthDiff = (healthBar.w - newWidth) / 2;
  healthBar.w = newWidth;
  healthBar.originalPosX = player.x;
  healthBar.offsetX += widthDiff;
  healthBar.position.set(healthBar.originalPosX - healthBar.offsetX, player.y - 20);
  healthBar.outline.position.set(healthBar.originalPosX, healthBar.y);

  colorNumber = map(player.health, 0, 20, 1, 4);
  switch(floor(colorNumber)){
    case 3:
      healthBar.color = "green";
      break;
    case 2:
      healthBar.color = "yellow";
      break;
    case 1:
      healthBar.color = "red";
      break;
  }

  loadingAni.x = player.x;
  loadingAni.y = player.y;


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

  if(!player.reloading) {
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
      else if(player.activeSlot.isFull){
        player.unEquipGun();
      }
      
    } 
  }

                 

  if (player.activeSlot.isFull === true) {
    player.activeSlot.gun.visible = true;
    player.activeSlot.gun.updateWhileEquipped();
    if(mouse.presses() && !player.reloading && !player.isDead && !player.hasWon) {
      player.activeSlot.gun.shoot();
    }
  }

  if(player.reloading) {
    player.speed *= 0.5;
    player.reloadGun();
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
    shotgun.owner = player;
    shotgun.reloadTimer = new Timer(3500);
    shotgun.bullets = new bullets.Group();
    shotgun.ammo = 8;
    shotgun.reloadBy = 8;
    shotgun.damage = 0.5;

    //ammo count display
    shotgun.ammoCount = new Sprite();
    shotgun.ammoCount.removeColliders();
    shotgun.ammoCount.color = color(0, 0, 0, 0);
    shotgun.ammoCount.strokeWeight = 0;
    shotgun.ammoCount.text = shotgun.ammo;
    shotgun.ammoCount.textColor = "white";
    shotgun.ammoCount.textStroke = "black";
    shotgun.ammoCount.textStrokeWeight = 2.5;
    shotgun.ammoCount.visible = false;
    
  
    // shotgun.timer.endTimer();
  
    //creating shotgun logo for the gui
    shotgunIcon = new Sprite();
    shotgunIcon.layer = 30;
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
          // bullet.bounce = 0.8;
          bullet.life = this.range + random(-5, 5);
          bullet.mass = 0;  
          bullet.bounciness = 1;
          bullet.damage = this.damage;
          bullet.owner = this.owner;
          bullet.stroke = "black";
          bullet.strokeWeight = 0.3;
          bullet.update = () => {
            bullet.w = map(bullet.speed, 0, bullet.speed, 5, 6);
            bullet.scale *= 0.95;
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
      this.ammoCount.visible = false;
      this.img = shotgunIconImg;
      this.scale = 0.07;
      this.offset.x = -5;
      this.offset.y = 5;
      // this.timer = undefined;
    };
  }
  else if (gun === "pistol") {
    let pistol = new guns.Sprite(x, y);
    pistol.removeColliders();
    pistol.layer = 2;
    pistol.bulletArray = [];
    pistol.gunType = "pistol";
    pistol.range = 20;
    pistol.len = 39;
    pistol.img = pistolIconImg;
    pistol.scale = 0.1;
    pistol.inInventory = false;
    pistol.bullets = new bullets.Group();
    pistol.ammo = 12;
    pistol.damage = 1.5;
    pistol.reloadBy = 12;
    pistol.reloadTimer = new Timer(2500);
  
    //ammo count display
    pistol.ammoCount = new Sprite();
    pistol.ammoCount.removeColliders();
    pistol.ammoCount.color = color(0, 0, 0, 0);
    pistol.ammoCount.strokeWeight = 0;
    pistol.ammoCount.text = pistol.ammo;
    pistol.ammoCount.textColor = "white";
    pistol.ammoCount.textStroke = "black";
    pistol.ammoCount.textStrokeWeight = 1.9;
    pistol.ammoCount.visible = false;
    pistol.ammoCount.textSize *= 0.9;

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
        bullet.speed = random(12, 14);
        bullet.collider = "d";
        bullet.layer = 1;
        bullet.mass = 0;
        bullet.damage = this.damage;
        bullet.bounciness = 1;
        bullet.owner = this.owner;
        bullet.overlaps(bullets);
        bullet.update = () => {
          bullet.scale *= 0.99;
        }
        this.ammo -= 1;

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
      this.ammoCount.visible = false;
      this.scale = 0.1;
      this.offset.x = 0;
      this.icon.visible = false;
    };
  }
  else if (gun === "sniper") {
    let sniper = new guns.Sprite(x, y);
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
    sniper.ammo = 5;
    sniper.reloadBy = 5;
    sniper.damage = 6;
    sniper.reloadTimer = new Timer(6000);
    sniper.owner = player;

    //ammo count display
    sniper.ammoCount = new Sprite();
    sniper.ammoCount.removeColliders();
    sniper.ammoCount.color = color(0, 0, 0, 0);
    sniper.ammoCount.strokeWeight = 0;
    sniper.ammoCount.text = sniper.ammo;
    sniper.ammoCount.textColor = "white";
    sniper.ammoCount.textStroke = "black";
    sniper.ammoCount.textStrokeWeight = 2.2;
    sniper.ammoCount.visible = false;

    //gun icon for inventory and when unequipped
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
        bullet.speed = random(13, 15);
        bullet.collider = "d";
        bullet.layer = 1;
        bullet.mass = 0;
        bullet.overlaps(bullets);
        bullet.owner = this.owner;
        bullet.damage = this.damage;
        bullet.bounciness = 1;
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
      this.ammoCount.visible = false;
      this.scale = 0.08;
      this.offset.x = 0;
      this.icon.visible = false;
    };
  }
}

function createAmmo(gunType, x, y) {
  if(gunType === "shotgun") {
    let shotgunAmmo = new shotgunAmmos.Sprite(x, y);
    shotgunAmmo.img = shotgunAmmoImg;
    shotgunAmmo.removeColliders();
    shotgunAmmo.scale = 0.7;
    shotgunAmmo.rotation = random(360);
    shotgunAmmo.layer = 0;
    // shotgunAmmo.debug = true;
    shotgunAmmo.type = "shotgun";
    shotgunAmmo.isPicked = function() {
      let gunAmmo = player.ammos.find((ammoType) => ammoType.type === "shotgun");
      gunAmmo.ammoLeft += 8;
      this.remove();
    };
    shotgunAmmo.speed = 0.5;
    shotgunAmmo.direction = random(360);
    
    shotgunAmmo.update = () => {
      shotgunAmmo.speed *= 0.975;
    }

    return shotgunAmmo;
  }
  else if(gunType === "pistol") {
    let pistolAmmo = new shotgunAmmos.Sprite(x, y);
    pistolAmmo.img = pistolAmmoImg;
    pistolAmmo.removeColliders();
    pistolAmmo.scale = 0.7;
    pistolAmmo.rotation = random(360);
    pistolAmmo.layer = 0;
    // pistolAmmo.debug = true;
    pistolAmmo.type = "pistol";
    pistolAmmo.isPicked = function() {
      let gunAmmo = player.ammos.find((ammoType) => ammoType.type === "pistol");
      gunAmmo.ammoLeft += 12;
      this.remove();
    };
    pistolAmmo.speed = 0.5;
    pistolAmmo.direction = random(360);
    
    pistolAmmo.update = () => {
      pistolAmmo.speed *= 0.975;
    }
    return pistolAmmo;
  }
  else if(gunType === "sniper") {
    let sniperAmmo = new sniperAmmos.Sprite(x, y);
    sniperAmmo.img = sniperAmmoImg;
    sniperAmmo.removeColliders();
    sniperAmmo.scale = 0.7;
    sniperAmmo.rotation = random(360);
    sniperAmmo.layer = 0;
    // sniperAmmo.debug = true;
    sniperAmmo.type = "sniper";
    sniperAmmo.isPicked = function() {
      let gunAmmo = player.ammos.find((ammoType) => ammoType.type === "sniper");
      gunAmmo.ammoLeft += 5;
      this.remove();
    };
    sniperAmmo.speed = 0.5;
    sniperAmmo.direction = random(360);
    
    sniperAmmo.update = () => {
      sniperAmmo.speed *= 0.975;
    }
    return sniperAmmo;
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
    shotgun.damage = 0.5;
    shotgun.timer = new Timer(random(600, 1000));
    
    // shotgun.rotateTowards(mouse, 1.2, 1);
    shotgun.rotation = owner.rotation;


    shotgun.shoot = function() {
      if(this.timer.expired()){
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
          // bullet.bounce = 0.8;
          bullet.life = this.range + random(-5, 5);
          bullet.mass = 0;  
          bullet.bounciness = 0;
          bullet.owner = this.owner;
          bullet.damage = this.damage;
          bullet.update = () => {
            bullet.w = map(bullet.speed, 0, bullet.speed, 5, 6);
            bullet.scale *= 0.99;
            bullet.rotation = bullet.direction;
            if(this.collides(naturalResources)) {
              this.remove();
            }
          };
          bullet.overlaps(bullets);
        }
        shotgun.timer.start();
      }
    };
    return shotgun;
  }
  if(type === "pistol") {
    pistol = new enemyGuns.Sprite(owner.x, owner.y);
    pistol.removeColliders();
    pistol.img = pistolImg;
    pistol.gunType = "pistol";
    pistol.owner = owner;
    pistol.range = 50;
    pistol.len = 39;
    pistol.bullets = new bullets.Group();
    pistol.layer = 6;
    pistol.offset.x = 33;
    pistol.scale = 0.6;
    pistol.damage = 1.5;
    pistol.timer = new Timer(random(500, 1000));

    pistol.shoot = function() {
      if(this.timer.expired()){
        let bulletTemp = p5.Vector.fromAngle(radians(this.rotation), this.len);
        let gunPosTemp = createVector(this.x, this.y);
        let bulletPos = p5.Vector.add(bulletTemp, gunPosTemp);
    
        // let bullet = new bullets.Sprite(bulletPos.x, bulletPos.y);
        let bullet = new this.bullets.Sprite(bulletPos.x, bulletPos.y);
        
        bullet.life = this.range;
        bullet.diameter = 6;
        bullet.color = "black";
        bullet.direction = this.rotation;
        bullet.speed = random(13, 15);
        bullet.collider = "d";
        bullet.layer = 1;
        bullet.mass = 0;
        bullet.damage = this.damage;
        bullet.bounciness = 1;
        bullet.owner = this.owner;
        bullet.overlaps(bullets);
        bullet.update = () => {
          bullet.scale *= 0.99;
        }
        this.timer.start();
      }
    };
    return pistol;
  }

  if(type === "sniper") {
    sniper = new enemyGuns.Sprite(owner.x, owner.y);
    sniper.removeColliders();
    sniper.img = sniperImg;
    sniper.gunType = "sniper";
    sniper.owner = owner;
    sniper.range = 120;
    sniper.len = 61;
    sniper.bullets = new bullets.Group();
    sniper.layer = 6;
    sniper.offset.x = 35;
    sniper.scale = 0.4;
    sniper.scale.y = 0.5;
    sniper.damage = 6;
    sniper.timer = new Timer(random(1000, 1300));

    sniper.shoot = function() {
      if(this.timer.expired()){
        let bulletTemp = p5.Vector.fromAngle(radians(this.rotation), this.len);
        let gunPosTemp = createVector(this.x, this.y);
        let bulletPos = p5.Vector.add(bulletTemp, gunPosTemp);
    
        // let bullet = new bullets.Sprite(bulletPos.x, bulletPos.y);
        let bullet = new this.bullets.Sprite(bulletPos.x, bulletPos.y);
        
        bullet.life = this.range;
        bullet.diameter = 6;
        bullet.color = "black";
        bullet.direction = this.rotation;
        bullet.speed = random(13, 15);
        bullet.collider = "d";
        bullet.layer = 1;
        bullet.mass = 0;
        bullet.damage = this.damage;
        bullet.bounciness = 1;
        bullet.owner = this.owner;
        bullet.overlaps(bullets);
        this.timer.start();
      }
    };
    return sniper;
  }
}



function updateEnemies() {
  for(let i = enemies.length - 1; i >= 0; i--) {

    let enemy = enemies[i];

    enemy.gun.x = enemy.x;
    enemy.gun.y = enemy.y;

    if(dist(enemy.x, enemy.y, enemy.vehicle.position.x, enemy.vehicle.position.z) > 5) {
      enemy.vehicle.position.x = enemy.x;
      enemy.vehicle.position.z = enemy.y;
    }
    // let rot;
    // if(enemy.rotation < 0) {
    //   rot = 180 - Math.abs(enemy.rotation) + 180;
    // }
    // else {
    //   rot = enemy.rotation;
    // }
    // enemy.gun.rotateTowards(enemy.rotation);
    enemy.velocity.x = enemy.vehicle.velocity.x * (1/frameRate());
    enemy.velocity.y = enemy.vehicle.velocity.z * (1/frameRate());
    // enemy.rotateTowards(enemy.direction);
    // enemy.vehicle.update(1/frameRate());



    // if(enemy.targetEntity && entityManager.entities.includes(enemy.targetEntity.vehicle)) {
    //   enemy.targetEntity.remove();
    // }
    let entityInVicinity = entities.some(entity => dist(enemy.x, enemy.y, entity.x, entity.y) < 350 && entity !== enemy);

    if(dist(enemy.x, enemy.y, bg.width/2, bg.height/2) > zone.radius){
      if(!enemy.vehicle.steering.behaviors[3].active){
        enemy.vehicle.steering.behaviors[1].active = false;
        enemy.vehicle.steering.behaviors[2].active = false;
        enemy.vehicle.steering.behaviors[3].active = true;
        enemy.vehicle.steering.behaviors[0].active = true;
      }
      if(entityInVicinity) {
        let targetEntity = entities.find(entity => dist(enemy.x, enemy.y, entity.x, entity.y) < 350 && entity !== enemy);
        enemy.gun.rotateTowards(targetEntity);
        enemy.gun.shoot();
      }
      else{
        enemy.gun.rotateTowards(enemy.direction);
        if(zone.finishedDecreasing) {
          enemy.health -= 0.08;
        }
      }
    }
    
    else if(entityInVicinity){

      let targetEntity = entities.find(entity => dist(enemy.x, enemy.y, entity.x, entity.y) < 350 && entity !== enemy);
      // if(enemy.evadeWeight > 8) {
      //   // if(!enemy.vehicle.steering.behaviors[3].active){
      //   //   enemy.maxSpeed = 400;
      //   //   enemy.vehicle.steering.behaviors[3].active = true;
      //   //   enemy.vehicle.steering.behaviors[1].active = false;
      //   //   // enemy.vehicle.steering.behaviors[0].active = false;
      //   // }
      //   // enemy.vehicle.steering.behaviors[3].target.set(targetEntity.vehicle.position.x, 0, targetEntity.vehicle.position.z);
      //   // enemy.gun.rotateTowards(enemy.direction);
      // }
      // if{
      enemy.gun.shoot();
      if(!enemy.vehicle.steering.behaviors[2].active || enemy.vehicle.steering.behaviors[2].evader !== targetEntity.vehicle) {
        
        // enemy.vehicle.steering.behaviors[2].offset.set(random(-200, 100), 0, random(-200, 200));
        if(!enemy.vehicle.steering.behaviors[0].obstacles.includes(targetEntity.vehicle)){
          enemy.vehicle.steering.behaviors[0].obstacles.push(targetEntity.vehicle);
        }
        // enemy.vehicle.maxSpeed = 80;
        enemy.vehicle.steering.behaviors[2].evader = targetEntity.vehicle;
        enemy.vehicle.steering.behaviors[2].active = true;
        enemy.vehicle.steering.behaviors[3].active = false;
        enemy.vehicle.steering.behaviors[1].active = true;
        // enemy.maxSpeed = 120;
      }
      enemy.gun.rotateTowards(targetEntity, 0.1);
      // }
    }
    // else if(enemy.angry){
    //   enemy.gun.rotateTowards(enemy.targetEntity);
    //   enemy.gun.shoot();
    // }
    else{
      // enemy.vehicle.steering.behaviors[1].active = true;
      enemy.targetEntity = undefined;
      enemy.vehicle.steering.behaviors[2].active = false;
      enemy.vehicle.steering.behaviors[1].active = true;
      enemy.vehicle.steering.behaviors[3].active = false;
      enemy.gun.rotateTowards(enemy.direction);
      // console.log()
      
    }


    bullets.forEach(function(bullet){
      if(enemy.collides(bullet)){
        enemy.health -= bullet.damage;
        // enemy.evadeWeight += 1;
        // bullet.remove();
        // enemy.angry = true;
        // enemy.vehicle.steering.behaviors[2].evader = bullet.owner.vehicle;
        // enemy.vehicle.steering.behaviors[2].active = true;
        // // enemy.vehicle.steering.behaviors[3].pursuer = bullet.owner.vehicle;
        // // enemy.vehicle.steering.behaviors[3].active = true;
        // enemy.targetEntity = bullet.owner;
      }
    });

    if(enemy.health <= 0) {
      enemy.isKilled();
    }


    // enemy.moveTo(enemy.goalPoint, 1);
    // if(enemy.x === enemy.goalPoint.x && enemy.y === enemy.goalPoint.y){
    //   enemy.reached = true;
    // }
    // if(enemy.reached) {
      
    //   enemy.goalPoint = createVector(enemy.x + random(-100, 100), enemy.y + random(-10, 10));
    //   enemy.reached = false;
    // }
    enemy.evadeWeight -= 0.001;
  }

  // console.log(enemies[0].rotation);
}


//behaviors
function initBehaviors() {

  // seekBehavior = new YUKA.SeekBehavior(new YUKA.Vector3(player.x, 0, player.y));
  wanderBehavior = new YUKA.WanderBehavior();
  wanderBehavior.jitter = 2;
  wanderBehavior.radius = 1.5;
  wanderBehavior.distance = 1;
  wanderBehavior.weight = 3;
  wanderBehavior.active = true;

  obstacleAvoidanceBehavior = new YUKA.ObstacleAvoidanceBehavior(obstacles);
  obstacleAvoidanceBehavior.dBoxMinLength = 110;
  obstacleAvoidanceBehavior.weight = 10;
  obstacleAvoidanceBehavior.brakingWeight = 0.5;
}

function createEnemies(num) {
  for(let i = 0; i < num; i++) {
    let enemy = new enemies.Sprite(random(bg.width - 150), random(bg.height - 150));
    enemy.stroke = "black";
    enemy.strokeWeight = 1.8;
    enemy.gun = createEnemyGun(enemy, random(["pistol", "shotgun", "sniper"]));
    enemy.rotationLock = true;
    // enemy.goalPoint = enemy.position.copy();
    enemy.reached = true;
    enemy.vehicle = new YUKA.Vehicle();
    enemy.vehicle.name = i;
    enemy.vehicle.boundingRadius = 200;
    enemy.vehicle.position.x = enemy.x;
    enemy.vehicle.position.z = enemy.y;
    enemy.vehicle.maxSpeed = 150;
    enemy.health = 20;
    enemy.evadeWeight = 0;
    obstacles.push(enemy.vehicle);
    enemy.vehicle.smoother = new YUKA.Smoother(20);
    enemy.isKilled = function() {
      enemy.gun.remove();
      entityManager.remove(enemy.vehicle);
      enemy.remove();
    };
    entityManager.add(enemy.vehicle);

    
    // enemy.vehicle.goal = new YUKA.Goal()
    

    //avoid behavior


    

    //defining wander behavior
    
    let pursueBehavior = new YUKA.PursuitBehavior(player.vehicle);
    pursueBehavior.active = false;
    pursueBehavior.weight = 1;

    let offsetpursuitBehavior = new YUKA.OffsetPursuitBehavior(player.vehicle, new YUKA.Vector3(200, 0, 200));
    offsetpursuitBehavior.active = false;
    offsetpursuitBehavior.weight = 1;
    //defining avoidance behavior
    
    let separationBehavior = new YUKA.SeparationBehavior();
    separationBehavior.active = false;
    separationBehavior.weight = 3;


    let evadeBehavior = new YUKA.EvadeBehavior(player.vehicle, 200, 20);
    evadeBehavior.active = false;
    evadeBehavior.weight = 20;

    let seekBehavior = new YUKA.SeekBehavior(new YUKA.Vector3(bg.width/2, 0, bg.height/2));

    let fleeBehavior = new YUKA.FleeBehavior(new YUKA.Vector3(player.vehicle.position.x, 0, player.vehicle.position.z), 300);



    // enemy.vehicle.steering.behaviors.push(wanderBehavior);
    enemy.vehicle.steering.behaviors.push(obstacleAvoidanceBehavior);
    enemy.vehicle.steering.behaviors.push(wanderBehavior);
    enemy.vehicle.steering.behaviors.push(pursueBehavior);
    enemy.vehicle.steering.behaviors.push(seekBehavior);
    // enemy.vehicle.steering.behaviors.push(seekBehavior);
    // enemy.vehicle.steering.behaviors.push(pursueBehavior);
    // enemy.vehicle.steering.behaviors.push(seekBehavior);
    // setInterval(enemy.gun.shoot(), 3000);
    
  }
}
let currentTime, prevTime;
function updateCrates() {
  for(let i = crates.length - 1; i >= 0; i--){
    let crate = crates[i];


    if(crate.health <= 0) {
      if(crate.ani.name !== "broken"){
        crate.changeAni("broken");
        crate.detector.remove();
        // crate.detector.collider = "n";
        entityManager.remove(crate.entity);

        //removing the obstacle for each enemy so they can walk through it
        for(let enemy of enemies) {
          let obsts = enemy.vehicle.steering.behaviors[0].obstacles;
          obsts.splice(obsts.indexOf(crate.entity), 1);
        }
        
      }
      if(crate.ani.frame === 3 && !crate.ammoDispensed) {
        createAmmo(random(["shotgun", "sniper", "pistol"]), crate.x + random(-20, 20), crate.y + random(-20, 20));
        createAmmo(random(["shotgun", "sniper", "pistol"]), crate.x + random(-20, 20), crate.y + random(-20, 20));
        crate.ammoDispensed = true;
      }
      if(crate.ani.frame === 6) {
        // crate.detector.remove();
        crate.remove();
        // crate.visible = false;
      }
    }
    else {

      // bullets.forEach(function(bullet){
        if(crate.detector.collides(bullets)) {
          crate.damageTaken = true; 
          crate.health -= 1;
        }
      // })
      // if {
        if(crate.detector.collides(player) && player.speed > 3) {
          currentTime = frameCount;
          if(prevTime && currentTime - prevTime >= 100) {
            crate.damageTaken = true; 
            crate.health -= 1;
            prevTime = currentTime;
          }
          else if (prevTime === undefined){
            crate.damageTaken = true; 
            crate.health -= 1;
            prevTime = currentTime;
          }
        }
      // }
  
      if(crate.damageTaken) {
        crate.changeAni("damaged");
        crate.damageAniRunning = true;
        crate.damageTaken = false;
      }
      if(crate.damageAniRunning) {
        if(crate.anis.damaged.frame === 2) {
          crate.anis.damaged.frame = 0;
          crate.damageAniRunning = false;
        }
      }
      if(!crate.damageAniRunning) {
        crate.changeAni("idle");
      }
    }
  }

  // for(let i = bullets.length - 1; i >= 0; i--) {
  //   let bullet = bullets[i];
  //   if(bullet.collides(crateDetectors)){
  //     bullet.remove();
  //   }
  // }
}

function updateZoneRadius() {
  if(zoneTimer.expired() && !zone.decreasing && zone.radius > 500) {
    zone.decreasing = true;
  }
  else if(zoneRadius <= 500) {
    // zoneText.visible = false;
    zoneText.text = "Enemies left: " + enemies.length;
    zone.finishedDecreasing = true;
  }
  
  if(zone.decreasing){
    if(zoneRadius - zone.radius <= 200) {
      if(zone.radius > 500) {
        zone.radius -= 1;
        zoneText.text = `Zone decreasing
Enemies left: ` + enemies.length;
      }
      else {
        zoneRadius = zone.radius;
        zone.decreasing = false;
        zoneText.text = "Enemies left: " + enemies.length;
      }
    }
    else{
      zoneRadius = zone.radius;
      zone.decreasing = false;
      zoneTimer.start();
    }

  }
  else{
    zoneText.text = `Zone decreasing in: ` + (floor(zoneTimer.getRemainingTime() / 1000) + `
Enemies left: ` + enemies.length);
  }

  zoneText.position.set(player.x, player.y - height/3.5);

  // zone.radius = zoneRadius;
}

function updateBulletCollisions() {
  //all the bullet collisions
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i];
    if(bullet.collides(naturalResources) || bullet.collides(entities) || bullet.collides(crateDetectors)) {
      bullet.remove();
    }
  }
}

function initPlayer() {
  player = new Sprite(bg.width/2, bg.height/2, 35, "octagon");
  player.color = "white";
  player.stroke = "black";
  player.strokeWeight = 2;
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
  player.isDead = false;



  player.vehicle = new YUKA.MovingEntity();
  player.vehicle.boundingRadius = 80;
  player.vehicle.name = "player";
  entityManager.add(player.vehicle);
  obstacles.push(player.vehicle);
  entities.push(player);


  player.reloading = false;
  player.reloadGun = function() {
    if(this.activeSlot.gun.reloadTimer.expired()) {
      player.reloading = false;
      loadingAni.visible = false;
    }
    else {
      
      // if(player.activeSlot.gun.reloadTimer.getRemainingTime() === 1000){
      let currentAmmo = player.ammos.find((anAmmo) => anAmmo.type === player.activeSlot.gun.gunType);
      let ammosReloaded = floor(map(player.activeSlot.gun.reloadTimer.getRemainingTime(), player.activeSlot.gun.reloadTimer.duration, 0, 0, player.activeSlot.gun.reloadBy + 1));
      player.current = ammosReloaded;

      if(player.current !== player.prev) {
        player.activeSlot.gun.ammo += 1;
        currentAmmo.ammoLeft -= 1;
      }

      player.prev = player.current;
      // }
      // let timer = player.activeSlot.gun.reloadTimer;
      let loadingFrame = floor(map(player.activeSlot.gun.reloadTimer.getRemainingTime(), player.activeSlot.gun.reloadTimer.duration, 0, 0, 5));
      if(loadingAni.ani.frames[loadingFrame]) {
        loadingAni.ani.frame = loadingFrame;
      }

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

  class Ammo{
    constructor(type, ammoLeft) {
      this.type = type;
      this.ammoLeft = ammoLeft;
    }
  }
  
  player.ammos = [new Ammo("shotgun", 0), new Ammo("sniper", 0), new Ammo("pistol", 0)];
}

function updateGameState() {
  camera.on();
  background(10);
  checkIfWon();
  updateGui();
  image(bg, 0 - player.vel.x, 0 - player.vel.y);
  updateZoneRadius();
  updatePlayerMovement();
  updateInventory();
  updateEnemies();
  updateGuns();
  updateHealth();
  updateCrates();
  updateBulletCollisions();
  camera.x = player.x;
  camera.y = player.y;

  // camera.x = constrain(camera.x, 0, bg.width);
  camera.off();
  entityManager.update(1/frameRate());

}

function initGame() {
  startScreen.remove();
  initPlayer();
  createGun("sniper", player.x + 30, player.y + -50);
  createGun("shotgun", player.x + -74, player.y + 53);
  createGun("pistol", player.x + 83, player.y + 32);
  createEnemies(25);
  initGui();
  camera.position.set(player.x, player.y);
  camera.zoom = 1.4;
  initiatingGame = false;
  gameRunning = true;
} 

function checkIfWon() {
  if(enemies.length === 0 && !player.isDead) {
    player.hasWon = true;
    winScreen.visible = true;
    winScreen.position.set(player.x, player.y);
  }
}