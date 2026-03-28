/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new YasmineDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class YasmineDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.m = 0
    this.eyeball = color(0)
    this.eyeColor = color(255)
    this.bodycolor= color(252,186,3)
    this.wingcolor = color(242,237,223,100)
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    
    // update properties here to achieve
    // your dancer's desired moves and behaviour
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    noStroke()
    translate(this.x+50*sin(frameCount*0.1), this.y+20*sin(frameCount*0.05));
    fill(this.bodycolor)
    ellipse(0,0,20,40)
    fill(this.wingcolor)
    arc(-25,-10,40,40,0,PI+PI/4+20*sin(frameCount*0.05),CHORD)
    scale(-1,1)
    arc(-25,-10,40,40,0,PI+PI/4+20*sin(frameCount*0.05),CHORD)
    arc()
    push()
    fill(this.eyeColor)
    circle(-5,-20,10)
    fill(this.eyeball)
    circle(-5,-20,5)
    scale(-1,1)
    fill(this.eyeColor)
    circle(-5,-20,10)
    fill(this.eyeball)
    circle(-5,-20,5)
    pop()
    stroke(255)
    line(10,10,20,30)
    line(20,30,20,120)
    ellipse(25,120,20,10)
    scale(-1,1)
    line(10,10,20,30)
    line(20,30,20,120)
    ellipse(25,120,20,10)
    //arc(-20,0,30,30,0,PI)



    // ******** //
    // ⬇️ draw your dancer from here ⬇️






    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    //this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/