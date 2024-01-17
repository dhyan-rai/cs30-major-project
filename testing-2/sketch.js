

// let world, worldWidth, worldHeight, binSize, worldDepth;
// let steerable, steerableID, steerableCenterPosition, steerableSize;
// let arriveBehavior, avoidBehavior, prioritySteeringBehavior;
// let blendedSteeringBehavior, randomPathBehavior;
// let list;
// let graph;
// let vertex1, vertex2, vertex3;

// //WORLD
// function setup() {

//   createCanvas(windowWidth, windowHeight);

//   worldWidth = 1000;
//   worldHeight = 1000;
//   worldDepth = 1000;
//   binSize = 50;
//   world = new Kompute.World(worldWidth, worldHeight, worldDepth, binSize);



//   //PATH
//   path = new Kompute.Path();

//   path.addWaypoint(new Kompute.Vector3D(width/2, 0, height/2));
//   path.addWaypoint(new Kompute.Vector3D(width/2 + 200, 0, height/2));
//   path.addWaypoint(new Kompute.Vector3D(width/2 + 200, 0, height/2 - 100));
//   pathFollowingBehavior = new Kompute.PathFollowingBehavior({ path: path, satisfactionRadius: 150 });



//   steerable = new Kompute.Steerable("test1", new Kompute.Vector3D(width/2, 0, height/2), new Kompute.Vector3D(25, 25, 25));
//   steerable.maxSpeed = 100;
//   steerable.maxAcceleration = 100;

//   obstacle = new Kompute.Steerable("entity1", new Kompute.Vector3D(width/2 + 200, 0, height/2), new Kompute.Vector3D(20, 20, 20));

//   world.insertEntity(steerable);
//   world.insertEntity(obstacle);
  
  
//   arriveBehavior = new Kompute.ArriveBehavior({
//     satisfactionRadius: 100,
//     slowDownRadius: 150
//   });
//   steerable.setTargetPosition(new Kompute.Vector3D(mouseX, 0, mouseY));
  
//   avoidBehavior = new Kompute.AvoidBehavior({ maxSeeAhead: 1000, maxAvoidForce: 2000 });
//   seekBehavior = new Kompute.SeekBehavior();

//   list =  [
//     {behavior: pathFollowingBehavior, weight: 1},
//     {behavior: avoidBehavior, weight: 10}
//     // {behavior: seekBehavior, weight: 10}
//     // {behavior:arriveBehavior, wiehgt: 1}
//     // {behavior: avoidBehavior, wieght: 1}
//   ]


//   blendedSteeringBehavior = new Kompute.BlendedSteeringBehavior(list);
//   steerable.setBehavior(blendedSteeringBehavior);
// }

// function draw() {
//   background(220);
//   circle(steerable.position.x, steerable.position.z, 50);
//   rect(obstacle.position.x, obstacle.position.z, 25, 25);
//   steerable.setTargetPosition(new Kompute.Vector3D(mouseX, 0, mouseY));
//   console.log(steerable.position.x)
//   steerable.update();
//   obstacle.update();
// }






let thing;
let arriveBehavior;
let someVertex;
// let steeringManager;
let avoidBehavior;
let wanderBehavior;
let thingToCatch;
let pursueBehavior;
let navMesh;
let poly;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  mainThing = new Sprite();
  thing = new YUKA.Vehicle();
  thing.position.x = width/2;
  thing.position.z = 0;
  thing.maxSpeed = 100;
  // thing.maxForce = 0.5;


  thing.boundingRadius = 50;
  obstacle = new YUKA.GameEntity();

  obstacle.position.x = 300;
  obstacle.position.z = 140;
  obstacle.boundingRadius = 50;
   
  mainThing.x = thing.position.x;
  mainThing.y = thing.position.z;
  // obstacle.rot
  
  // obstacle.scale = 100;

  
  thingToCatch = new YUKA.MovingEntity();


  pursueBehavior = new YUKA.PursuitBehavior(thingToCatch);
  avoidBehavior = new YUKA.ObstacleAvoidanceBehavior([obstacle]);
  avoidBehavior.brakingWeight = 0;
  wanderBehavior = new YUKA.WanderBehavior();
  wanderBehavior.jitter = 1;
  wanderBehavior.radius = 0.1;
  avoidBehavior.brakingWeight = 0;
  avoidBehavior.dBoxMinLength = 70;
  avoidBehavior.brakingWeight = 0.1;
  
  // avoidBehavior.weight = 1;
  // wanderBehavior.weight = 1;
  arriveBehavior = new YUKA.ArriveBehavior(new YUKA.Vector3(width/2, 0, height/2));
  // thing.steering.behaviors.push(arriveBehavior);
  thing.steering.behaviors.push(avoidBehavior);
  thing.steering.behaviors.push(pursueBehavior);
  // thing.steering.behaviors.push(wanderBehavior);
  thing.smoother = new YUKA.Smoother(5);
}

function draw(){
  background(220);
  thing.update(1/frameRate())
  thingToCatch.update(1/frameRate());
  thingToCatch.position.x = mouseX;
  thingToCatch.position.z = mouseY;
  thingToCatch.position.y = 0;
  circle(thing.position.x, thing.position.z, thing.boundingRadius);
  circle(obstacle.position.x, obstacle.position.z, obstacle.boundingRadius);
  mainThing.vel.x = thing.velocity.x;
  mainThing.vel.y = thing.velocity.z;
  // mainThing.update(0.01);
  noFill();
  // circle(obstacle.position.x, obstacle.position.z, obstacle.boundingRadius);
  // console.log(avoidBehavior.dBoxMinLength + ( thing.getSpeed() / thing.maxSpeed ) * avoidBehavior.dBoxMinLength)
  fill("white");
  circle(width/2, height/2, 10)
}







// let world, worldWidth, worldHeight, binSize, worldDepth;
// let steerable, steerableID, steerableCenterPosition, steerableSize;
// let arriveBehavior, avoidBehavior, prioritySteeringBehavior;
// let blendedSteeringBehavior, randomPathBehavior;
// let list;
// let graph;
// let vertex1, vertex2, vertex3;


// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   rectMode(CENTER)

//   //GRAPH
//   graph = new Kompute.Graph();

  
//   //vertices
//   vertex1 = new Kompute.Vector3D(200, 0, 100);
//   vertex2 = new Kompute.Vector3D(800, 0, height/2);
//   vertex3 = new Kompute.Vector3D(100, 0, 200);
//   graph.addVertex(vertex1);
//   graph.addVertex(vertex2);
//   graph.addVertex(vertex3);
//   graph.addEdge(vertex1, vertex2);
//   graph.addEdge(vertex2, vertex3);
  
//   //PATH
//   path = new Kompute.Path();
//   path.addWaypoint(vertex1);
//   path.addWaypoint(vertex2);
//   path.addWaypoint(vertex3);
  
//   //WORLD
//   worldWidth = 1000;
//   worldHeight = 1000;
//   worldDepth = 1000;
//   binSize = 50;
//   world = new Kompute.World(worldWidth, worldHeight, worldDepth, binSize);

//   //enemy
//   steerable = new Kompute.Steerable("steerableID", new Kompute.Vector3D(vertex1.x, 0, vertex1.z), new Kompute.Vector3D(10, 10, 10));

//   //obstacle
//   obstacle = new Kompute.Entity("entity1", new Kompute.Vector3D(width/2, 0, height/2), new Kompute.Vector3D(100, 100, 100));
  
//   //when arriving
//   arriveBehavior = new Kompute.ArriveBehavior({
//     satisfactionRadius: 200,
//     slowDownRadius: 300
//   });

//   //when avoiding
//   avoidBehavior = new Kompute.AvoidBehavior({
//     maxSeeAhead: 1000,
//     maxAvoidForce: 6000
//   })

//   //random path behavior
//   randomPathBehavior = new Kompute.RandomPathBehavior({ graph: graph, satisfactionRadius: 60 });
//   randomWaypointBehavior = new Kompute.RandomWaypointBehavior({ path: path, satisfactionRadius: 50 });

//   //seek
//   seekBehavior = new Kompute.SeekBehavior();

//   //list of behaviors
//   list = [ 
//     // {behavior: arriveBehavior, weight: 1},
//     {behavior: seekBehavior, weight: 100},
//     {behavior: avoidBehavior, weight: 1}, 
//   ];
  
//   //combining the steering forces by threshold
//   prioritySteeringBehavior = new Kompute.PrioritySteeringBehavior({
//     // put some behaviors we'd like to combine into the list
//     list: [arriveBehavior, avoidBehavior],
//     threshold: 200
//   });


//   //combinging them with weights
//   blendedSteeringBehavior = new Kompute.BlendedSteeringBehavior(list);
  
//   //adding stuff into world
//   world.insertEntity(steerable);
//   world.insertEntity(obstacle);
//   world.insertGraph(graph);

//   // set the max velocity and acceleration of steerable
//   steerable.maxSpeed = 30;
//   steerable.maxAcceleration = 5;


//   // set behavior
//   steerable.setBehavior(blendedSteeringBehavior);

//   // set a target position to steerable
//   steerable.setTargetPosition(vertex2);

// }

// function draw() {
//   background(220);
//   steerable.update();
//   obstacle.update();
//   // noFill();
//   circle(steerable.position.x, steerable.position.z, 50, 50);
//   // rect(width/2, height/2, 100, 100);
//   rect(obstacle.position.x, obstacle.position.z, 100, 100);
//   circle(vertex1.x, vertex1.z, 20);
//   circle(vertex2.x, vertex2.z, 20);
//   circle(vertex3.x, vertex3.z, 20);
//   push()
//   translate(width/2 + 200, height/2 + 100);
//   noFill();
//   circle(0, 0, 200);
//   circle(0, 0, 300);
//   pop()
// }
