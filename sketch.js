// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gun;
let angle = 20;

function preload() {
  gun = loadModel("gun.obj", true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  orbitControl();
  lights();
  background(0);
  noStroke();
  // rotateX(angle);
  // rotateY(angle);
  scale(1.8);
  model(gun);
  // angle += 0.02;
}
