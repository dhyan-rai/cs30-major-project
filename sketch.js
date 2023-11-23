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
  //fill("yellow");
  let dx = mouseX - width/2;
  let dy = mouseY - height/2;
  let v = createVector(dx, dy, 0);
  camera(0, 0, (height/2) / tan(PI/6) - 1000, dx, 0, 0, 0, 1, 0);
  v.div(100);
  directionalLight(255, 0, 0, v);
  ambientLight(0, 0, 255);
  specularMaterial(255);

  //translate(mouseX - width/2, mouseY - height/2);
  rotateX(angle);
  rotateY(angle * 0.2);
  rotateZ(angle * 0.5);
  box(150);
  angle += 0.01;
  // orbitControl();
  // lights();
  // background(0);
  // noStroke();
  // // rotateX(angle);
  // // rotateY(angle);
  // scale(1.8);
  // model(gun);
  // // angle += 0.02;
}
