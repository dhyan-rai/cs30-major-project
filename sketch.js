// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gun;
let angle = 0;
let rover;
let touchingGround = false;
let isJumping = false;
let canJump = true;
let jumpForce;
let maxSubSteps = 3;
let fixedTimeStep = 1/10;
let lastTime;
let world, body, ground;


class Player extends RoverCam {
  constructor(instance) {
    super(instance);
    this.keyMap.mz1[0] = 32;
    this.keyMap.mz2[0] = 16;
    this.keyMap.mz1[1] = 32;
    this.keyMap.mz2[1] = 16;
    this.gravity = createVector(0, 1, 0);
    this.friction = 0.6;
    this.yFric = 0.6;
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

    this.forward = new p5.Vector(Math.cos(this.pan), 0, Math.sin(this.pan));
    this.forward.normalize();
    this.right = new p5.Vector(Math.cos(this.pan - Math.PI / 2.0), 0, Math.sin(this.pan - Math.PI / 2.0));
    // TBD: handle roll command (using this.rot)

    //this.velocity.mult(this.friction);
    this.velocity.x *= this.friction;
    this.velocity.z *= this.friction;
    // this.velocity.y *= this.yFric;

    //this.velocity.y += 10;
    
    // if (this.position.y <= 0) {
    //   this.velocity.y += this.gravity.y;
    // }
    this.position.add(this.velocity);
    
    let position = p5.Vector.sub(this.position, p5.Vector.mult(this.right,this.offset[1]));
    
    // if (position.y >= 0) {
    //   touchingGround = true;
    // }

    let tempForward = createVector(Math.cos(this.pan), Math.tan(this.tilt), Math.sin(this.pan));
    let center = p5.Vector.add(position, tempForward);
    this.p5.camera(position.x, position.y+this.offset[0], position.z, center.x, center.y+this.offset[0], center.z, this.up.x, this.up.y, this.up.z);
  }
}


function preload() {
  gun = loadModel("gun.obj", true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  //setting up physics world
  world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);

  //adding a body
  body = new CANNON.Body({
    mass: 500, // kg
    position: new CANNON.Vec3(0, -500, 0), // m
    shape: new CANNON.Sphere(new CANNON.Vec3(50))
  });
  world.addBody(body);


  //creating vectors
  jumpForce = createVector(0, -4, 0);

  rover = new Player();
  rover.usePointerLock();
  rover.setState({position:[-400, -2000, height/2 / tan(PI/6)],
    //rotation: [0.4,0.3,0],
    offset: [-250, 0],
    speed: 10});

  //creating a ground
  ground = new CANNON.Body({
    mass: 0 // mass=0 will produce a static body automatically
  });
  ground.addShape(new CANNON.Plane());
  ground.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), PI/3);
  world.addBody(ground);
  lastTime = second();

  body.position.x = rover.position.x;
  body.position.y = rover.position.y;
  body.position.z = rover.position.z;
}

function draw() {

  // rotateX(PI);

  if (lastTime !== undefined) {
    //var dt = (time - lastTime) / 1000;
    let dt = (second() - lastTime) / 1000;
    world.step(fixedTimeStep, dt, maxSubSteps);
  }

  lastTime = second();



  applyGravity();
  background(51);
  noStroke();
  push();
  fill("red");
  translate(0, -100, 0);
  box(150);
  pop();
  push();
  rotateX(PI/2);

  // normalMaterial();
  plane(1000);
  pop();


  //test functions
  applyGravity();
  checkJumping();
  jump();


  // //body
  // push();
  // fill(100,100,255);
  // stroke(50,50,127);
  // body.position.x = rover.position.x;
  // body.position.y = rover.position.y;
  // body.position.z = rover.position.z;
  // translate(body.position.x,body.position.y,body.position.z);
  // let rot=new CANNON.Vec3();
  // body.quaternion.toEuler(rot);
  // rotateY(rot.y);
  // rotateZ(rot.z);
  // rotateX(rot.x);
  // box(100);
  // pop();

  // // //ground
  // push();
  // noStroke();
  // fill(64);
  // translate(ground.position.x,ground.position.y,ground.position.z);
  // ground.quaternion.toEuler(rot);
  // rotateY(rot.y);
  // rotateZ(rot.z);
  // rotateX(rot.x);
  // plane(1000);
  // pop();  

  lastTime = second();


}

// function applyGravity() {
//   if (!touchingGround) {
//     rover.velocity.y += rover.gravity.y;
//   }
// }

function jump() {
  if (isJumping) {
    rover.velocity.add(jumpForce);
    canJump = false;
  }
}

function checkJumping () {
  if (keyIsDown(32)) {
    isJumping = true;
  }
  canJump = false;
}

function applyGravity() {
  if(isTouchingGround()){
    rover.position.y = 0;
    rover.gravity.y = 1;
    rover.velocity.y = 0;
    canJump = true;
    isJumping = false;
    touchingGround = true;
  }
  if (!isTouchingGround()) {
    rover.velocity.add(rover.gravity);
    rover.gravity.y += 0.05;
  }
}

function isTouchingGround() {
  return rover.position.y >= 0;
}

