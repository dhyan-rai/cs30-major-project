let g, pathFinder, thePath, grid, matrix;

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadJSON("assets/mapdata.json", function(data){
    sample = data.obstacles;
    // Convert to a single-line representation
  const singleLineString = JSON.stringify(sample);

  // Convert back to a nested array
  matrix = JSON.parse(singleLineString);
  });

  // matrix = [
  //   [0, 0, 1],
  //   [1, 0, 0]
  // ]
  // grid = new PF.Grid(200, 200);
  grid = new PF.Grid(matrix); 
  // grid.setWalkableAt(0, 1, false);
}

function draw() {
  background(0);
  // console.log(pathFinder.find(1, 2))
}










// let easystar, ball, path, grid, something, otherThing, thing1, thing2, thing3;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   easystar = new EasyStar.js();
//   // easystar.setIterationsPerCalculation(20);
//   grid = [[0,0,1,0,0],
//           [0,0,1,0,1],
//           [1,0,1,0,0],
//           [0,0,0,0,1],
//           [1,0,0,0,0],
//           [0,0,0,1,0]];
//   easystar.setGrid(grid);
//   easystar.setAcceptableTiles([0]);

//   xOff = 10;
//   yOff = 10;

//   for (let i = 0; i < grid.length; i++) {
//     for(let j = 0; j < grid[i].length; j++) {
//       // if(grid[i][j] === 1) {
//         // push()
//         noFill();
//         let gridBox = new Sprite(16*j + xOff, 16*i + yOff, 10, 10, "n");
//         gridBox.color = "black";
//         // pop();
//       // }
//     }
//   }

//   for (let i = 0; i < grid.length; i++) {
//     for(let j = 0; j < grid[i].length; j++) {
//       if(grid[i][j] === 1) {
//         new Sprite(16*j + xOff, 16*i + yOff, 10, 10, "n");
//       }
//     }
//   }
//   thing1 = new Sprite(16*2 + xOff, 0 + yOff, 10, 10, "n");
//   thing2 = new Sprite(16*2 + xOff, 16 + yOff, 10, 10, "n");
//   thing3 = new Sprite(16*2 + xOff, 16*2 + yOff, 10, 10, "n");

//   ball = new Sprite(xOff, yOff, 10);

//   easystar.findPath(0, 0, 4, 0, function( path ) {
//     if (path === null) {
//       // alert("Path was not found.");
//     } else {
//       // alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
//       thePath = path;
//     }
//   });    
     
//   // easystar.calculate();
//   easystar.calculate();
// }

// let moving, reached = true, findingPath, pathFound = false;;
// function draw() {
//   background(220);

//   randomPathFind();

// }


// function randomPathFind() {

//   if (reached) {
//     if(thePath.length > 1){
//       newPathStart = thePath[thePath.length-1]
//       thePath.shift();
//       nextPoint = thePath[0];
//     }
//     else{
//       let newX = newPathStart.x;
//       let newY = newPathStart.y;
      
//       let xRandom = round(random(-2, 2));
//       while(newX + xRandom > grid[0].length-1 || newX + xRandom < 0) {
//         xRandom = round(random(-2, 2));
//       }
//       let yRandom = round(random(-2, 2));
//       while(newY + yRandom > grid.length-1 || newY + yRandom < 0) {
//         yRandom = round(random(-2, 2));
//       }
      
//       newX += xRandom;
//       newY += yRandom;

//       easystar.findPath(newPathStart.x, newPathStart.y, newX, newY, function( path ) {
//         if (path === null) {
//           // alert("Path was not found.");
//         } else {
//           // alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
//           thePath = path;
//         }
//       }); 
//     }
//   }
//   if(!moving) {
//     ball.moveTo(nextPoint.x*16 + xOff, nextPoint.y*16 + yOff);
//     moving = true;
//     reached = false;
//   }
//   if(ball.x === nextPoint.x*16 + xOff && ball.y === nextPoint.y*16 + yOff) {
//     reached = true;
//     moving = false;
//   }
//   easystar.calculate();
// }

// let bg, bgTileMap;

// function preload() {
//   bg = loadImage("TileMap_test1.png");
//   bgTileMap = loadTiledMap("tile-map-1");
// }

// function setup() {
//   createCanvas(400, 400);
//   imageMode(CENTER);
// }

// function draw() {
//   background(220);
//   bgTileMap.draw(0, 0);
//   // camera.on();
//   // image(bg, -200, 0);
//   // camera.x = mouseX;
//   // camera.y = mouseY;
//   // camera.off();
// }

// function keyTyped() {
//   if(key === 'w') {
//     camera.zoom += 0.2;
//   }  
// }









// let theShape, shapeTileset, shapeGroup, ball, sideLength;

// function setup() {
//   createCanvas(400, 400);


//   //making group of shapes
//   shapeGroup = new Group();
//   shapeGroup.collider = "s";
//   shapeGroup.tile = "=";
//   // shapeGroup.w = 40;
//   // shapeGroup.h = 30;
//   sideLength = 50
//   shapeGroup.collider = "s";
//   shapeGroup.verts = [[sideLength, 0], [0, sideLength], [-sideLength/2, 0], [0, -sideLength/2], [-sideLength/2, 0], [0, -sideLength/2]];
//   shapeTileset = new Tiles(
//     [
//       "=..=...",
//       "..=..=."
//     ],
//     0 + sideLength/2, 0 + sideLength/2 , sideLength, sideLength
//   )

//   ball = new Sprite(width/2, height/2, 25)
// }

// function draw() {
//   background(220);
//   ball.moveTowards(mouseX, mouseY, 0.3);
//   circle(sideLength/2, sideLength/2, 10);
// }
    
    






    
// //testing

// let guests, me;
// let myObj, ground;
// let spriteArray = [];
// let shared;
// let guestNum;


// let ball;

// function preload() {
//   partyConnect("wss://demoserver.p5party.org", "the-test-party-DR");

//   shared = partyLoadShared("global", {visited: 0, spriteArray: []});
//   // guests = partyLoadGuestShareds();
//   me = partyLoadMyShared();
//   guests = partyLoadGuestShareds();

// }

// function setup() {

//   eval("partySetShared(me, {x: (shared.visited+1) * 100, y: (shared.visited+1) * 100, name: 'guest" + shared.visited + "', properties: []})");


//   // createCanvas(windowWidth, windowHeight);
//   new Canvas(); 

//   // ball = new Sprite(200, 200, 100);
//   ground = new Sprite(0, height-100, 3000, 100, "static");
//   ground.rotation = 182;
//   world.gravity.y = 9.8;




//   //p5party code

//   shared.visited++;
//   guestNum = shared.visited - 1;

//   //p5play code
//   eval("guest" + guestNum + " = new Sprite(0, 0, 50)");
//   // spriteArray.push(eval("guest" + guestNum));
//   shared.spriteArray.push("guest" + guestNum);
//   updateSelfProperties(eval("guest"+guestNum));
//   loadGuestSprites();  
// }

// function draw() {
  
  
//   background(220);
//   clear();
//   updateSelfProperties(eval("guest"+guestNum));
//   updateGuestSprites();
// }


// // function updateSpriteProperties(obj) {
// //   let i = 0;
// //   for (let property of Object.values(obj)) {
// //     if(notFuncOrClass(property)) {
// //       me.properties[i] = property; 
// //       // testArr[i] = property
// //     }
// //     i++;
// //   }
// // }

// // function loadSprites() {
// //   for (let guest of guests) {
// //     eval(guest.name + " = new Sprite()");
// //     let i = 0;
// //     for (let property of guest.properties) {
// //       if (guest.properties[i] !== null) {
// //         eval(guest.name + "." + key + "= guest.properties[i]");
// //       }
// //       i++;

// //     }

// //   }
// // }

// function notFuncOrClass(value) {
//   return (
//     (typeof value !== 'function' && typeof value !== 'object') && typeof value !== null ||
//     (typeof value === 'object' && value.constructor === Object)
//   );
// }

// function updateSelfProperties(obj) {
//   me.properties[0] = obj.velocity.x;
//   me.properties[1] = obj.velocity.y;
// }

// function loadGuestSprites() {
//   for (let guest of guests) {
//     if (guest.name !== me.name) {
//       eval(guest.name + " = new Sprite()");
//       spriteArray.push(eval(guest.name));
//     }
//   }
// }

// function updateGuestSprites() {
//   for (let guest of guests) {
//     if (guest.name !== me.name) {
//       if (eval("typeof " + guest.name + "=== undefined")){
//         eval(guest.name + " = new Sprite(10,10,50)");
//       }
//       eval(guest.name + ".velocity.x = guest.properties[0]")
//       eval(guest.name + ".velocity.x = guest.properties[1]")
//     }
//   }
// }