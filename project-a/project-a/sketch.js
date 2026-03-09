//landscape variables
let cols = 35;
let rows = 22;
let cellW, cellH;
let xyz = 0;

//creayure variables
let segments = 22;
let segLength = 16;

let x = [];
let y = [];

let targetX, targetY;

let wanderT = 0;
let following = false;

let alphaVal = 255;
let scaleVal = 1;

function setup() {
  let canvas= createCanvas(800,500);
  canvas.parent("p5-canvas-container");
  rectMode(CENTER);
  noStroke();
//creature position initiale
  for (let i = 0; i < segments; i++) {
    x[i] = width / 2;
    y[i] = height / 2;
  }
  targetX = width / 2;
  targetY = height / 2;

  cellW = width / cols;
  cellH = height / rows;
}

function draw() {
  //landscape draw
  background(15, 0, 0);
  drawbgcolor();
  drawLandscape();
  xyz += 0.01;

  // creature draw
  background(40, 10, 20, 60);

  // wandering mode
  if (!following) {
    targetX = map(noise(wanderT), 0, 1, 0, width);
    targetY = map(noise(wanderT + 100), 0, 1, 0, height);
    wanderT += 0.02;
  }

  x[0] = lerp(x[0], targetX, 0.15);
  y[0] = lerp(y[0], targetY, 0.15);
  x[0] += sin(frameCount * 0.25) * 1.2;
  y[0] += cos(frameCount * 0.22) * 1.2;

  if (following && dist(x[0], y[0], targetX, targetY) < 10) {
    following = false;
  }
  for (let i = 1; i < segments; i++) {
    let dx = x[i] - x[i - 1];
    let dy = y[i] - y[i - 1];
    let angle = atan2(dy, dx);

    let desired = segLength * 0.9;

    x[i] = x[i - 1] + cos(angle) * desired;
    y[i] = y[i - 1] + sin(angle) * desired;
  }

  // fade and scale change 
  if (mouseIsPressed) {
    alphaVal = lerp(alphaVal, 255, 0.05);
    scaleVal += 0.05;
  } else {
    alphaVal = lerp(alphaVal, 0, 0.005); // fade 
    scaleVal = lerp(scaleVal, 1, 0.01);  // shrink if mosue not pressed
  }

  drawCreature();
}

function mousePressed() {
  targetX = mouseX;
  targetY = mouseY;
  following = true;
}

//creature draw funct
function drawCreature() {
  for (let i = segments - 1; i >= 0; i--) {
    push();

    translate(x[i], y[i]);
    scale(scaleVal);

    if (i < segments - 1) {
      let angle = atan2(y[i] - y[i + 1], x[i] - x[i + 1]);
      rotate(angle);
    }

    let size = map(i, 0, segments, 40, 10);

    let r = 255;
    let g = 60 + sin(frameCount * 0.1 + i) * 30;
    let b = 100 + sin(frameCount * 0.15 + i) * 40;

    fill(r, g, b, alphaVal);
    ellipse(0, 0, size, size * 0.85);

    pop();
  }

  drawEyes();
}

function drawEyes() {
  push();
  translate(x[0], y[0] - 12);
  scale(scaleVal);

  fill(255, alphaVal);
  ellipse(-10, 0, 14, 18);
  ellipse(10, 0, 14, 18);

  fill(0, alphaVal);
  ellipse(-7, 0, 6, 8);
  ellipse(13, 0, 6, 8);

  pop();
}

// landscaoe functions
function drawbgcolor() {
  for (let yPixel = 0; yPixel < height; yPixel++) {
    let n = noise(yPixel * 0.01, xyz);
    let r = map(n, 0, 1, 60, 200);
    stroke(r, 0, 0);
    line(0, yPixel, width, yPixel);
  }
  noStroke();
}

function drawLandscape() {
  let noiseScale = map(mouseX, 0, width, 0.05, 0.25);
  let amplitude = map(mouseY, 0, height, 5, 50);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let baseX = i * cellW + cellW / 2;
      let baseY = j * cellH + cellH / 2;

      let n = noise(i * noiseScale, j * noiseScale, xyz);

      let offsetX = map(n, 0, 1, -amplitude, amplitude);
      let offsetY = map(n, 0, 1, -amplitude, amplitude);

      let px = baseX + offsetX;
      let py = baseY + offsetY;

      let redValue = map(n, 0, 1, 120, 255);
      fill(redValue, 10, 20, 180);

      let sizeVar = map(n, 0, 1, 0.5, 1.4);

      if ((i + j) % 2 == 0) {
        ellipse(px, py, cellW * 0.7 * sizeVar);
      } else {
        let angle = map(n, 0, 1, -PI, PI);
        let w = cellW * 0.7 * sizeVar;
        let h = cellH * 0.7 * sizeVar;
        let dx = w / 2;
        let dy = h / 2;

        let x1 = px + cos(angle) * (-dx) - sin(angle) * (-dy);
        let y1 = py + sin(angle) * (-dx) + cos(angle) * (-dy);

        let x2 = px + cos(angle) * (dx) - sin(angle) * (-dy);
        let y2 = py + sin(angle) * (dx) + cos(angle) * (-dy);

        let x3 = px + cos(angle) * (dx) - sin(angle) * (dy);
        let y3 = py + sin(angle) * (dx) + cos(angle) * (dy);

        let x4 = px + cos(angle) * (-dx) - sin(angle) * (dy);
        let y4 = py + sin(angle) * (-dx) + cos(angle) * (dy);

        quad(x1, y1, x2, y2, x3, y3, x4, y4);
      }
    }
  }
}
