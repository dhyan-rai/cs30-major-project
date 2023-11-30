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
    this.gravity = createVector(0, 2, 0);
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
  draw() {
    if (this.p5.width !== this.width || this.p5.height !== this.height) {
      this.p5.perspective(this.fovy, this.p5.width / this.p5.height, 0.01, 10000.0);
      this.width = this.p5.width;
      this.height = this.p5.height;
    }

    // Call the potentially overridden controller method
    this.controller();

    this.forward = new p5.Vector(Math.cos(this.pan), Math.tan(this.tilt), Math.sin(this.pan));
    this.forward.normalize();
    this.right = new p5.Vector(Math.cos(this.pan - Math.PI / 2.0), 0, Math.sin(this.pan - Math.PI / 2.0));
    // TBD: handle roll command (using this.rot)

    this.velocity.mult(this.friction);

    //this.velocity.y += 10;
    
    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;
    //if (this.position.y >= -210) {
      this.position.y += this.velocity.y;
    //}
    let position = p5.Vector.sub(this.position, p5.Vector.mult(this.right,this.offset[1]));
    let center = p5.Vector.add(position, this.forward);
    this.p5.camera(position.x, position.y+this.offset[0], position.z, center.x, center.y+this.offset[0], center.z, this.up.x, this.up.y, this.up.z);
  }
}


function preload() {
  gun = loadModel("gun.obj", true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  rover = new Player();
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
