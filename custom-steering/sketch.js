let vehicle, ahead, ahead2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  vehicle = new Sprite(width/2, height/2, 50);
  vehicle.vel.x = random(-3, 3);
  vehicle.vel.y = random(-3, 3);
}

function draw() {
  background(220);
  // ahead = p5.Vector.setMag(p5.Vector.add(createVector(vehicle.position.x, vehicle.position.y), createVector(vehicle.velocity.x, vehicle.velocity.y)));
}

function collisionAvoidance() {
	ahead = ...; // calculate the ahead vector 
	ahead2 = ...; // calculate the ahead2 vector 
	var mostThreatening = findMostThreateningObstacle();
	var avoidance = new Vector3D(0, 0, 0);
	if (mostThreatening !== null) {
		avoidance.x = ahead.x - mostThreatening.center.x;
		avoidance.y = ahead.y - mostThreatening.center.y;
		avoidance.normalize();
		avoidance.scaleBy(MAX_AVOID_FORCE);
	} else {
		avoidance.scaleBy(0); // nullify the avoidance force 
	}
	return avoidance;
}

function findMostThreateningObstacle() {
	var mostThreatening = null;
	for (var i = 0; i < Game.instance.obstacles.length; i++) {
		var obstacle = Game.instance.obstacles[i];
		var collision = lineIntersecsCircle(ahead, ahead2, obstacle);
		// "position" is the character's current position 
		if (collision && (mostThreatening === null || distance(position, obstacle) < distance(position, mostThreatening))) {
			mostThreatening = obstacle;
		}
	}
	return mostThreatening;
}