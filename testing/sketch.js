//testing

let guests, me;
let myObj;
let spriteArray = [];
let sharedInfo;


function preload() {
  // partyConnect("wss:://demoserver.p5party.org", "testing-p5party-with-p5play");
  partyConnect("wss://demoserver.p5party.org", "the-test-party-DR");

  sharedInfo = partyLoadShared("global", {visited: 0});
  guests = partyLoadGuestShareds();
  me = partyLoadMyShared();
  guests = partyLoadGuestShareds();

}

function setup() {

  eval("partySetShared(me, {x: sharedInfo.visited * 100, y: sharedInfo.visited * 100, name: 'guest" + sharedInfo.visited + "'})");


  // createCanvas(windowWidth, windowHeight);
  new Canvas(); 

  //p5party code
  sharedInfo.visited++;

  //p5play code
  

}

function draw() {
  background(220);
}


