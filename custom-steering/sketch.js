let vehicle, dBox;
let maxSpeed = 3;
// let dBoxLength;
let dBoxMinLength = 110;
let obstacle;
let maxForce = 220;
let aheadVect;
let avoidanceForce;
let boundingCircle;


function setup() {
  createCanvas(windowWidth, windowHeight);

  avoidanceForce = createVector(0, 0);
  
  obstacle = new Sprite(width/2, 200, 50, "s");
  vehicle = new Sprite(0, obstacle.y, 50);
  boundingCircle = new Sprite(obstacle.x, obstacle.y, 100);
  boundingCircle.collider = "n";
  boundingCircle.visible = false;

  vehicle.rotationLock = true;
  
  dBox = new Sprite(vehicle.x, vehicle.y - vehicle.r, vehicle.r + 25, dBoxMinLength);
  dBox.offset.y = -15;
  
  // dBox.offset.x = dBox.width/2;
  dBox.layer = 10;

  // dBox.removeColliders();
  dBox.collider = "n";
  // dBox.debug = true;
  dBox.visible = false;
  // dBox.layer = 10;
  // dBox.w = vehicle.r - 10;
  // dBox.h = dBoxMinLength;
  // dBox.debug =  true;
  // let j = new GlueJoint(dBox, vehicle);
}

function draw() {
  background(220);
  vehicle.rotateTowards(vehicle.direction, 0.06);
  vehicle.moveTo(mouse.x, mouse.y, 2);
  vehicle.speed = constrain(vehicle.speed, 0, maxSpeed);

  
  // dBox.position.x = vehicle.x;
  // dBox.position.y = vehicle.y - vehicle.r;
  // dBox.direction = vehicle.rotation;
  // vehicle.rotation += 10;
  // dBox.h = map(vehicle.speed, 0, maxSpeed, dBoxMinLength, 100);
  let len = 40;
  let tempVect = p5.Vector.fromAngle(radians(vehicle.rotation), len);
  
  dBox.position = p5.Vector.add(vehicle.position, tempVect);

  
  
  aheadVect = p5.Vector.add(p5.Vector.fromAngle(radians(vehicle.rotation), len+dBox.h/2), vehicle.position);
  // circle(aheadVect.x, aheadVect.y, 50);

  // rect(circlePos.x, circlePos.y, dBox.w, dBox.h);

  dBox.rotation = vehicle.rotation + 90;

  // dBox.addSensor(10, 10, 40, 40);

  if(dBox.overlapping(boundingCircle)) {
    vehicle.color = "red";
    avoidanceForce = p5.Vector.sub(aheadVect, obstacle.position);
    avoidanceForce.setMag(maxForce);
    
    // vehicle.rotateTowards(obstacle)
    // if(vehicle.speed > 1.5) {
    //   vehicle.speed -= 0.5;
    // }
    vehicle.rotateTowards(vehicle.direction, 0.06);
  }
  else {
    avoidanceForce.set(0, 0);
  }
  // vehicle.velocity.add(avoidanceForce);
  vehicle.applyForce(avoidanceForce.x, avoidanceForce.y);

  if(keyIsDown(65)) {
    vehicle.rotation += 2;
  }
  if(keyIsDown(68)) {
    vehicle.rotation += 2;
  }


}



function mousePressed() {
  vehicle.moveTowards(mouse.x, mouse.y);
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

