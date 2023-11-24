// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gun;
let angle = 0;

function preload() {
  gun = loadModel("gun.obj", true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(51);

  rectMode(CENTER);
  noStroke();
  push();
  rotateX(PI/2);
  plane();
  pop();
  push();
  rotateY(PI);
  //ambientLight(0, 0, 255);
  translate(mouseX - width/2 + 70, mouseY - height/2, 380);
  let dx = mouseX - width/2;
  //noCursor();
  //fill("yellow");
  let dy = mouseY - height/2;
  let v = createVector(dx, dy, 1);
  model(gun);
  v.div(200);
  //pointLight(255, 255, 255, v);
  normalMaterial();
  //specularMaterial(255);
  pop();
  //push();
  camera(-dx, dy, height/2 / tan(PI/6) - 1000, -dx, dy, 0, 0, 1, 0);
  //directionalLight(255, 255, 255, v);
  //pop();
  orbitControl();
  //translate(mouseX - width/2, mouseY - height/2);
  // rotateX(angle);
  // rotateY(angle * 0.2);
  // rotateZ(angle * 0.5);
  
  // lights();
  // background(0);
  // noStroke();
  // // rotateX(angle);
  // // rotateY(angle);
  // scale(1.8);
  // model(gun);
  // // angle += 0.02;
}
