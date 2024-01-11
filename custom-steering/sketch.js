let vehicle, dBox;
let maxSpeed = 5.5;
// let dBoxLength;
let dBoxMinLength = 50;
let obstacle;


function setup() {
  createCanvas(windowWidth, windowHeight);

  vehicle = new Sprite(width/2, height/2, 50);
  obstacle = new Sprite(width/2, 200, 50);
  
  dBox = new Sprite(vehicle.x, vehicle.y - vehicle.r, vehicle.r, dBoxMinLength);
  dBox.offset.y = -15;
  
  // dBox.offset.x = dBox.width/2;
  dBox.layer = 10;

  // dBox.removeColliders();
  dBox.collider = "n";
  // dBox.layer = 10;
  // dBox.w = vehicle.r - 10;
  // dBox.h = dBoxMinLength;
  // dBox.debug =  true;
  // let j = new GlueJoint(dBox, vehicle);
  allSprites.autoDraw = false;
}

function draw() {
  background(220);
  vehicle.moveTowards(mouse.x, mouse.y);
  vehicle.speed = constrain(vehicle.speed, 0, maxSpeed);
  // dBox.position.x = vehicle.x;
  // dBox.position.y = vehicle.y - vehicle.r;
  // dBox.direction = vehicle.rotation;
  // vehicle.rotation += 10;
  // dBox.h = map(vehicle.speed, 0, maxSpeed, dBoxMinLength, 100);
  let len = 20;
  let tempVect = p5.Vector.fromAngle(radians(vehicle.rotation), len);
  dBox.position = p5.Vector.add(vehicle.position, tempVect);

  let tempVect1 = p5.Vector.fromAngle(radians(vehicle.rotation), len-10);
  let tempVect2 = p5.Vector.fromAngle(-PI/2, dBox.width/2);
  allSprites.draw();
  let tempVect3 = p5.Vector.add(tempVect1, tempVect2);
  circlePos = p5.Vector.add(vehicle.position, tempVect3);

  circle(circlePos.x, circlePos.y, 10);
  // rect(circlePos.x, circlePos.y, dBox.w, dBox.h);

  dBox.rotation = vehicle.rotation + 90;

  // dBox.addSensor(10, 10, 40, 40);

  if(dBox.overlapping(obstacle)) {
    vehicle.color = "red";
  }
  else {
    vehicle.color = "black";
  }

  if(keyIsDown(65)) {
    vehicle.rotation += 2;
  }
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

