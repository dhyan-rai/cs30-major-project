//testing

let guests, me;
let myObj, ground;
let spriteArray = [];
let shared;
let guestNum;


let ball;

function preload() {
  partyConnect("wss://demoserver.p5party.org", "the-test-party-DR");

  shared = partyLoadShared("global", {visited: 0, spriteArray: []});
  // guests = partyLoadGuestShareds();
  me = partyLoadMyShared();
  guests = partyLoadGuestShareds();

}

function setup() {

  eval("partySetShared(me, {x: (shared.visited+1) * 100, y: (shared.visited+1) * 100, name: 'guest" + shared.visited + "', properties: []})");


  // createCanvas(windowWidth, windowHeight);
  new Canvas(); 

  // ball = new Sprite(200, 200, 100);
  ground = new Sprite(0, height-100, 3000, 100, "static");
  ground.rotation = 182;
  world.gravity.y = 9.8;




  //p5party code

  shared.visited++;
  guestNum = shared.visited - 1;

  //p5play code
  eval("guest" + guestNum + " = new Sprite(0, 0, 50)");
  // spriteArray.push(eval("guest" + guestNum));
  shared.spriteArray.push("guest" + guestNum);
  updateSelfProperties(eval("guest"+guestNum));
  loadGuestSprites();  
}

function draw() {
  
  
  background(220);
  clear();
  updateSelfProperties(eval("guest"+guestNum));
  updateGuestSprites();
}


// function updateSpriteProperties(obj) {
//   let i = 0;
//   for (let property of Object.values(obj)) {
//     if(notFuncOrClass(property)) {
//       me.properties[i] = property; 
//       // testArr[i] = property
//     }
//     i++;
//   }
// }

// function loadSprites() {
//   for (let guest of guests) {
//     eval(guest.name + " = new Sprite()");
//     let i = 0;
//     for (let property of guest.properties) {
//       if (guest.properties[i] !== null) {
//         eval(guest.name + "." + key + "= guest.properties[i]");
//       }
//       i++;

//     }

//   }
// }

function notFuncOrClass(value) {
  return (
    (typeof value !== 'function' && typeof value !== 'object') && typeof value !== null ||
    (typeof value === 'object' && value.constructor === Object)
  );
}

function updateSelfProperties(obj) {
  me.properties[0] = obj.velocity.x;
  me.properties[1] = obj.velocity.y;
}

function loadGuestSprites() {
  for (let guest of guests) {
    if (guest.name !== me.name) {
      eval(guest.name + " = new Sprite()");
      spriteArray.push(eval(guest.name));
    }
  }
}

function updateGuestSprites() {
  for (let guest of guests) {
    if (guest.name !== me.name) {
      if (eval("typeof " + guest.name + "=== undefined")){
        eval(guest.name + " = new Sprite(10,10,50)");
      }
      eval(guest.name + ".velocity.x = guest.properties[0]")
      eval(guest.name + ".velocity.x = guest.properties[1]")
    }
  }
}

let wallImg, wallHitbox;
let squab, squabs;

function preload() {
  wallImg = loadImage("wall.png");
}

function setup() {
  new Canvas();
  
  wallHitbox = new Group();
  wallHitbox.debug = true;
  // wallHitbox.w = 16;
  // wallHitbox.h = 16;
  wallHitbox.img = wallImg;
  wallHitbox.tile = "w";
  wallHitbox.collider = "s";
  wallHitbox.h = 17;
  wallHitbox.w = 16;
  

  walls = new Tiles(
  
    [
      "ww..www"
    ],
    100,
    100,
    wallHitbox.w,
    wallHitbox.h
  )
}
  // squab = new Sprite(100, 150);
//   sqaubs = new Group();
//   // squabs.value = "lol";
//   squabs.color = "black";
//   squab.changeColor = function() {
//     this.color = "black";
//   }
// }

function draw() {
  background(220);
}



