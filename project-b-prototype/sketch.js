let sections = [];
let particles = [];
let images = [];

let currentIndex = 0;

let face;
let fading = false;
let fadeAlpha = 0;

function preload() {
  for (let i = 1; i <= 5; i++) {
    images.push(loadImage("assets/img_" + i + ".png"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  face = {
    x: width / 2,
    y: height / 2,
    size: 300
  };

  let numSections = 5;
  let h = face.size / numSections;

  for (let i = 0; i < numSections; i++) {
    sections.push(new Section(i, h));
  }

  imageMode(CENTER);
}

function draw() {
  background(0);

  for (let s of sections) {
    s.update();
    s.display();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  if (fading) {
    fill(0, fadeAlpha);
    rect(0, 0, width, height);
    fadeAlpha += 3;
  }
}

function mousePressed() {
  if (currentIndex < sections.length) {
    sections[currentIndex].start();
    currentIndex++;
  } else {
    fading = true;
  }
}

// -------- SECTION --------

class Section {
  constructor(index, h) {
    this.index = index;
    this.h = h;
    this.state = "idle";
    this.offset = 0;
    this.timer = 0;
  }

  start() {
    this.state = "wiggle";
    this.timer = 0;
  }

  update() {
    if (this.state == "wiggle") {
      this.timer++;
      this.offset = sin(frameCount * 0.5) * 5;

      if (this.timer > 30) {
        this.breakApart();
        this.state = "gone";
      }
    }
  }

  breakApart() {
    for (let i = 0; i < 120; i++) {
      let x = random(face.x - face.size / 2, face.x + face.size / 2);

      let y = map(
        this.index,
        0,
        sections.length,
        face.y - face.size / 2,
        face.y + face.size / 2
      );

      y += random(this.h);

      particles.push(new Particle(x, y));
    }
  }

  display() {
    if (this.state == "gone") return;

    let img = images[this.index];

    let x = face.x + this.offset;
    let y = face.y - face.size / 2 + this.index * this.h + this.h / 2;

    image(img, x, y, face.size, this.h);
  }
}

// -------- PARTICLES --------

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.alpha = 255;
    this.size = random(1, 3);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 4;
  }

  display() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}