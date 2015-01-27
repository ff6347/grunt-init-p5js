//
// Setup
//
var x = 320;
var y = 180;
var w = 10;
var h = 10;
var rotation = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
}

//
// Draw
//

function draw() {
  background(255, 255, 255);
  stroke(0); // black stroke
  push(); // set the matrix so it is always centered
  translate(x, y); // push it to our position
  rectMode(CENTER); // we want the rect to be centered
  rotate(radians(rotation)); // rotate it takes radians as arg
  rect(0, 0, w, h); // draw the particle
  pop(); // push the matrix back
  rotation++;
  x += random(-1, 1); // change it
  y += random(-1, 1); // change it
  x = constrain(x, 0, displayWidth); // constrain it to the screen
  y = constrain(y, 0, displayHeight); // constrain it to the screen
}