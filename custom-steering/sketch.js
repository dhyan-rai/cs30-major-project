let vehicle, ahead, ahead2, target;

function setup() {
	createCanvas(windowWidth, windowHeight);

	target = new Sprite();
	
	let targetSpdRange = 5;
	target.vel.set(random(-targetSpdRange, targetSpdRange), random(-targetSpdRange, targetSpdRange));

	initVehicle();
}

function draw() {
	background(220);
	let steering = vehicle.arrive(createVector(mouse.x, mouse.y))
	// let steering = vehicle.pursue(target);
	vehicle.applySteeringForce(steering);
	vehicle.updateMovement();
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
	}

	vehicle.arrive = function(target) {
		return this.seek(target, true);
	}

	vehicle.flee = function(target) {
		return this.seek(target).mult(-1);
	}

	vehicle.pursue = function(targetVehicle) {
		let target = targetVehicle.position.copy();
		let prediction = targetVehicle.vel.copy();
		prediction.mult(10);
		target.add(prediction);
		return this.seek(target);
	}

	vehicle.evade = function(targetVehicle) {
		return this.pursue(targetVehicle).mult(-1);
	}

	vehicle.applySteeringForce = function(force) {
		this.acc.add(force)
	}

	vehicle.updateMovement = function() {
		this.vel.add(this.acc);
		this.acc.set(0, 0);
	}
}