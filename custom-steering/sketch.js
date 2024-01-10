let vehicle, dBox;
// let dBoxLength;
let dBoxMinLength = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);

  vehicle = new Sprite(width/2, height/2, 50);
  
  dBox = new Sprite(vehicle.x, vehicle.y - vehicle.r, vehicle.r, dBoxMinLength);

  // dBox.removeColliders();
  dBox.collider = "n";
  // dBox.layer = 10;
  // dBox.w = vehicle.r - 10;
  // dBox.h = dBoxMinLength;
  dBox.debug =  true;
  // let j = new GlueJoint(dBox, vehicle);
  
}

function draw() {
  background(220);
  vehicle.moveTowards(mouse.x, mouse.y);
  dBox.position.x = vehicle.x;
  dBox.position.y = vehicle.y - vehicle.r;
  dBox.direction = vehicle.rotation;
  vehicle.rotation += 10;
}




function initVehicle() {
  //properties
  vehicle = new Sprite();
  vehicle.acc = createVector(0, 0);
  vehicle.vel = createVector(0, 0);
  vehicle.maxSpeed = 4.5;
  vehicle.maxForce = 0.1;
  vehicle.r = 16;

  //methods
  vehicle.seek = function(target, arrival = false) {
    let force = p5.Vector.sub(target, this.position);
    let desiredSpeed = this.maxSpeed;
    if(arrival){
      let slowRadius = 100;
      let distance = force.mag();
      if(distance < slowRadius) {
        desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
      }
    }
    force.setMag(desiredSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    // this.applySteeringForce(force);
    return force;
  };

  vehicle.arrive = function(target) {
    return this.seek(target, true);
  };

  vehicle.flee = function(target) {
    return this.seek(target).mult(-1);
  };

  vehicle.pursue = function(targetVehicle) {
    let target = targetVehicle.position.copy();
    let prediction = targetVehicle.vel.copy();
    prediction.mult(10);
    target.add(prediction);
    return this.seek(target);
  };

  vehicle.evade = function(targetVehicle) {
    return this.pursue(targetVehicle).mult(-1);
  };

  vehicle.applySteeringForce = function(force) {
    this.acc.add(force);
  };

  vehicle.updateMovement = function() {
    this.vel.add(this.acc);
    this.acc.set(0, 0);
  };
}