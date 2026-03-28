let cloud;
function setup() {
  createCanvas(400, 400);
  cloud = new Cloud();
}

function draw() {
  background(220);
  cloud.update();
  cloud.display();
}

class Cloud {
  //constructor is like the setup
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.x0 = this.x;
    this.y0 = this.y;
    this.s = 1;
  }
  //what it will draw the cloud
  display() {
    push();
    translate(this.x, this.y);
    scale(this.s);
    this.drawArms();
    noStroke();
    //body
    circle(0, 0, 100);
    //circles around
    for (let a = 0; a < 2 * PI; a += PI / 6) {
      push();
      rotate(a);
      circle(50, 30, 50);
      pop();
    }
    //eyes
    fill(0);
    circle(-30, 0, 5);
    circle(30, 0, 5);
    arc(0, 0, 30, 30, 0, PI);
    pop();
  }
  //updating the variables
  update() {
    //this.y = noise(frameCount * 0.01) * height;
    this.y = 30*sin(frameCount * 0.1);
    this.x = 30*cos(frameCount * 0.1);
    this.s = map(sin(frameCount * 0.05), -1, 1, 0.5, 1);

  }
  drawArms() {
    //arms
    push();
    beginShape();
    let lineLength = 100;
    noFill();
    for (let i = -lineLength; i <= lineLength; i += lineLength / 20) {
    strokeWeight(10);
    let v =  15*sin(frameCount * 0.1 - i/(20));
      vertex(i, v);
    }
    endShape();
    pop();
  }
}
