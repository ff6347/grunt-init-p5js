//
// Setup
//
var x = 320;
var y = 180;
var w = 10;
var h = 10;
var rotation = 0;
var particles = [{
  'xPos': 10,
  'yPos': 25
}, {
  'xPos': 500,
  'yPos': 30
}, {
  'xPos': 50,
  'yPos': 66
}, {
  'xPos': 20,
  'yPos': 100
}];

function setup() {

  var the_canvas = createCanvas(640, 360);
  the_canvas.parent('thesketch');

}

//
// Draw
//

function draw() {
  background(255, 255, 255);
  stroke(0); // black stroke
  for (var i = 0; i < particles.length; i++) {
    var ptcl = particles[i];
    push(); // set the matrix so it is always centered
    translate(ptcl.xPos, ptcl.yPos); // push it to our position
    rectMode(CENTER); // we want the rect to be centered
    rotate(radians(rotation)); // rotate it takes radians as arg
    rect(0, 0, w, h); // draw the particle
    rotation++;
    ptcl.xPos += random(-1, 1); // change it
    ptcl.yPos += random(-1, 1); // change it
    ptcl.xPos = constrain(ptcl.xPos, 0, 640); // constrain it to the screen
    ptcl.yPos = constrain(ptcl.yPos, 0, 360); // constrain it to the screen
    pop(); // push the matrix back

  }
}