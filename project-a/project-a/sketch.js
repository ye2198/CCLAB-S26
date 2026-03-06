let segments = 22;
let segLength = 16;

let wormX, wormY;
let targetX, targetY;

let wanderT = 0;
let following = false;

function setup() {
  let canvas= createCanvas(800,500);
  canvas.parent("p5-canvas-container");
  noStroke();

  wormX = width / 2;
  wormY = height / 2;

  targetX = wormX;
  targetY = wormY;
}

function draw() {
  background(40, 10, 20, 60);


  // random idle 
  if (!following) {
    targetX = map(noise(wanderT), 0, 1, 0, width);
    targetY = map(noise(wanderT + 100), 0, 1, 0, height);
    wanderT += 0.005;
  }


  // movemt
 
  wormX = lerp(wormX, targetX, 0.03);
  wormY = lerp(wormY, targetY, 0.03);
  if (following && dist(wormX, wormY, targetX, targetY) < 10) {
    following = false;
  }

  drawCreature(wormX, wormY);
}


// follow mouse option

function mousePressed() {
  targetX = mouseX;
  targetY = mouseY;
  following = true;
}

function drawCreature(x, y) {
  push();
  translate(x, y);

  let pulse = map(sin(frameCount * 0.12), -1, 1, 0.9, 1.2);
  scale(pulse);

  let angle = atan2(targetY - y, targetX - x);
  rotate(angle);

  drawBody();
  drawEyes();

  pop();
}


// bODY
function drawBody() {
  for (let i = 0; i < segments; i++) {
    push();

    let offset = i * segLength;
    let wave = sin(frameCount * 0.2 + i * 0.5) * 18;

    translate(offset, wave);
    rotate(sin(frameCount * 0.1 + i * 0.2) * 0.1);

    let size = map(i, 0, segments, 40, 10);

    let r = 255;
    let g = 60 + sin(frameCount * 0.1 + i) * 30;
    let b = 100 + sin(frameCount * 0.15 + i) * 40;

    fill(r, g, b);
    ellipse(0, 0, size, size * 0.85);

    pop();
  }
}


// eyes and pulsation

function drawEyes() {
  push();
  translate(0, -12);

  fill(255);
  ellipse(-10, 0, 14, 18);
  ellipse(10, 0, 14, 18);

  fill(0);

  let lookX = 3;
  ellipse(-10 + lookX, 0, 6, 8);
  ellipse(10 + lookX, 0, 6, 8);

  pop();
}
