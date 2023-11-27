// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gun;
let angle = 0;
let rover;

function preload() {
  gun = loadModel("gun.obj", true);
}

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);

  //rover 
  //createCanvas(800, 800, WEBGL);
  rover = createRoverCam();
  rover.usePointerLock();    // optional; default is keyboard control only
  rover.setState({           // optional
    position: [0, (height/2) / tan(PI/6),0],
    rotation: [0.4,0.3,0],
    sensitivity: 0.1,
    speed: 0.5
  });
}

function draw() {
  background(51);
  noStroke();

  //ground
  // push();
  //rotateX(90);
  box(10);
  // pop();

  //orbitControl();
}
