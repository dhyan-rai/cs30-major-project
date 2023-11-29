// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gun;
let angle = 0;
let rover;

class Player extends RoverCam {
  constructor(instance) {
    super(instance);
    this.keyMap.mz1[0] = 32;
    this.keyMap.mz2[0] = 16;
    this.keyMap.mz1[1] = 32;
    this.keyMap.mz2[1] = 16;
  }
  usePointerLock(instance) {
    if(instance === undefined) instance = p5.instance;
    if(instance === null) return;
    RoverCam.canvas = instance._renderer.elt;

    document.addEventListener('click', () => {
      if (!RoverCam.pointerLock) {
        RoverCam.pointerLock = true;
        instance.requestPointerLock();
      } 
      // else {
      //   instance.exitPointerLock();
      //   RoverCam.pointerLock = false;
      // }
    }, false);
    document.addEventListener('pointerlockchange', RoverCam.onPointerlockChange, false);
  }
}


function preload() {
  gun = loadModel("gun.obj", true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  let rover = new Player();
  rover.usePointerLock();
  rover.setState({position:[-400,-200,height/2 / tan(PI/6)],
    rotation: [0.4,0.3,0],
    speed: 10});
}
function draw() {
  background(51);
  noStroke();
  push();
  fill("red");
  box(150);
  pop();
  push();
  rotateX(PI/2);
  plane(1000);
  pop();
}
