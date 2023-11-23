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
  rotateY(frameCount * 0.01);
  let dx = mouseX - width/2;
  //noCursor();
  //fill("yellow");
  let dy = mouseY - height/2;
  let v = createVector(dx, dy, 1);
  model(gun);
  v.div(200);
  pointLight(255, 255, 255, v);
  specularMaterial(255);
  //push();
  //camera(-dx, dy, height/2 / tan(PI/6) - 1000, -dx, dy, 0, 0, 1, 0);
  //translate(-dx - 50, dy, height/2 / tan(PI/6) - 800);
  //directionalLight(255, 255, 255, v);
  //ambientLight(0, 0, 255);
  //pop();
  //orbitControl();
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
