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
  thing = new YUKA.Vehicle();
  thing.boundingRadius = 10;
  obstacle = new YUKA.GameEntity();
  obstacle.position.x = 300;
  obstacle.position.z = 140;
  obstacle.boundingRadius = 10;
  // obstacle.rot
  
  // obstacle.scale = 100;
  navMesh = new YUKA.NavMesh();
  poly = new YUKA.Polygon();
  poly.fromContour([new YUKA.Vector3(0, 0, 0), new YUKA.Vector3(10, 0, 0), new YUKA.Vector3(10, 0, 10), new YUKA.Vector3(0, 0, 10), new YUKA.Vector3(0, 0, 0)])
  poly.centroid = new YUKA.Vector3(width/2, 0, height/2);

  
  thingToCatch = new YUKA.MovingEntity();


  pursueBehavior = new YUKA.PursuitBehavior(thingToCatch);
  avoidBehavior = new YUKA.ObstacleAvoidanceBehavior([obstacle]);
  wanderBehavior = new YUKA.WanderBehavior();
  // avoidBehavior.brakingWeight = 0.5;
  // avoidBehavior.dBoxMinLength = 50;
  
  avoidBehavior.weight = 10;
  arriveBehavior = new YUKA.ArriveBehavior(new YUKA.Vector3(width/2, 0, height/2));
  // thing.steering.behaviors.push(arriveBehavior);
  thing.steering.behaviors.push(avoidBehavior);
  thing.steering.behaviors.push(pursueBehavior);
  thing.smoother = new YUKA.Smoother(30);
}

function draw(){
  background(220);
  thing.update(1)
  thingToCatch.update();
  thingToCatch.position.x = mouseX;
  thingToCatch.position.z = mouseY;
  thingToCatch.position.y = 0;
  circle(thing.position.x, thing.position.z, 30);
  circle(obstacle.position.x, obstacle.position.z, avoidBehavior.dBoxMinLength);
  noFill();
  circle(obstacle.position.x, obstacle.position.z, obstacle.boundingRadius);
  
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
