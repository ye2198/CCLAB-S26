let sections = [];
let particles = [];
let images = [];

let currentIndex = 0;
let finalFaceShown = false;

let face = { size: 300 };

// face tracking
let faceMesh, video, faces = [];

// text
let texts = [];

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1 });

  for (let i = 1; i <= 5; i++) {
    images.push(loadImage("img_" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  video.style("transform", "scaleX(-1)");

  faceMesh.detectStart(video, (r) => faces = r);

  let h = face.size / 5;
  for (let i = 0; i < 5; i++) {
    sections.push(new Section(i, h));
  }
}

function draw() {
  background(0);

  let allGone = true;

  for (let s of sections) {
    s.update();
    s.display();
    if (s.state != "gone") allGone = false;
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].alpha <= 0) particles.splice(i, 1);
  }

  if (allGone && particles.length == 0) {
    finalFaceShown = true;
  }

  if (finalFaceShown) drawFace();

  // text rmb yourself
  fill(255);
  noStroke();
  textSize(20);
  for (let t of texts) {
    text("Remember yourself", t.x, t.y);
  }
}

function mousePressed() {
  if (!finalFaceShown) {
    if (currentIndex < sections.length) {
      sections[currentIndex].start();
      currentIndex++;
    }
  } else {
    texts.push({
      x: random(width),
      y: random(height)
    });
  }
}

// face tracking focus ojn nose

function getNose() {
  if (faces.length > 0) {
    let n = faces[0].keypoints[1];
    return { x: width - n.x, y: n.y };
  }
  return null;
}

// sections

class Section {
  constructor(i, h) {
    this.i = i;
    this.h = h;
    this.state = "idle";
    this.offset = 0;
    this.t = 0;
  }

  start() {
    this.state = "wiggle";
    this.t = 0;
  }

  update() {
    if (this.state == "wiggle") {
      this.t++;
      this.offset = sin(frameCount * 0.5) * 5;

      if (this.t > 30) {
        for (let j = 0; j < 120; j++) {
          let x = random(width / 2 - face.size / 2, width / 2 + face.size / 2);
          let y = height / 2 - face.size / 2 + this.i * this.h + random(this.h);
          particles.push(new Particle(x, y));
        }
        this.state = "gone";
      }
    }
  }

  display() {
    if (this.state == "gone") return;

    let x = width / 2 + this.offset;
    let y = height / 2 - face.size / 2 + this.i * this.h + this.h / 2;

    image(images[this.i], x, y, face.size, this.h);
  }
}

// particles

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 4;
  }

  display() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, 2);
  }
}

// face second ohase

function drawFace() {
  let x = width / 2;
  let y = height / 2;
  let s = face.size;

  fill(255);
  stroke(0);
  ellipse(x, y, s, s * 1.2);

  let ex = s * 0.2;
  let ey = y - s * 0.15;

  let nose = getNose();
  let dx = 0;
  let dy = 0;

  if (nose) {
    dx = constrain((nose.x - width / 2) * 0.05, -4, 4);
    dy = constrain((nose.y - height / 2) * 0.05, -4, 4);
  }

  // eyes
  fill(255);
  stroke(0);
  ellipse(x - ex, ey, 56, 56);
  ellipse(x + ex, ey, 56, 56);

  fill(0);
  noStroke();
  ellipse(x - ex + dx, ey + dy, 26, 26);
  ellipse(x + ex + dx, ey + dy, 26, 26);

  // nose
  noFill();
  stroke(0);
  beginShape();
  vertex(x, y - 10);
  vertex(x - 5, y + 20);
  vertex(x + 5, y + 20);
  endShape();

  // mouth
  line(x - s * 0.15, y + s * 0.2, x + s * 0.15, y + s * 0.2);
}