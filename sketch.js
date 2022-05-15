new p5();

class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setX(value) {
    this.x = value;
  }

  setY(value) {
    this.y = value;
  }

  increment(value) {
    this.x += value;
  }
}



class ProgressBar {
  constructor(sz) {
    this.sz = sz;

    this.trap_offset_x = this.sz * 0.02;
    this.bar_height = this.sz * 0.04

    this.p1 = new Point(this.trap_offset_x, 0);
    this.p2 = new Point(0, this.bar_height);
    this.p3 = new Point(this.sz, this.bar_height);
    this.p4 = new Point(this.sz - this.trap_offset_x, 0);

    this.COLOR_BAR_UNFILLED = color(35,8,29);
    this.COLOR_STROKE = color(79,50,92);
    }

    show() {
      stroke(this.COLOR_STROKE);
      fill(this.COLOR_BAR_UNFILLED);
      quad(this.p1.getX(), this.p1.getY(), this.p2.getX(), this.p2.getY(), this.p3.getX(), this.p3.getY(), this.p4.getX(), this.p4.getY());
      noStroke();
    }
}



class Progress extends ProgressBar {
  constructor(sz) {
    super(sz);
    this.sz = sz;

    this.trap_offset_x = this.sz * 0.02;
    this.bar_height = this.sz * 0.04

    this.p1 = new Point(this.trap_offset_x, 0);
    this.p2 = new Point(0, this.bar_height);
    this.p3 = new Point(this.sz, this.bar_height);
    this.p4 = new Point(this.sz - this.trap_offset_x, 0)
    this.p5 = new Point(this.sz - this.trap_offset_x, 0)


    this.p1Bar = new Point(this.trap_offset_x, 0);
    this.p2Bar = new Point(0, this.bar_height);
    this.p3Bar = new Point(this.sz, this.bar_height);
    this.p4Bar = new Point(this.sz - this.trap_offset_x, 0);

    this.COLOR_BAR_FILLED = color(253,75,254);

    this.p3.setX(0);
    this.p4.setX(0);

    this.p1.setX(this.p3.getX());  
  }


  show() {
    fill(this.COLOR_BAR_FILLED);
    beginShape(TESS);
    vertex(this.p1.x, this.p1.y);
    vertex(this.p2.x, this.p2.y);
    vertex(this.p3.x, this.p3.y);
    vertex(this.p4.x, this.p4.y);
    vertex(this.p5.x, this.p5.y);
    endShape();
  }



  increaseProgress() {
    if (this.p3.x > windowWidth) {
      this.p3.x = 0;
      this.p4.x = 0;

      return;
    }

    var fps = getFrameRate();

    var incrementAmount = (1 / 42 / fps) * windowWidth;
    this.p3.increment(incrementAmount);
    this.p4.increment(incrementAmount);

    // current progress is left of the first trapezoid bit
    if (this.p3.getX() < this.trap_offset_x) {
      this.p1.setX(this.p3.getX());
      this.p1.setY(this.getDeterminant(this.p2Bar, this.p1Bar, this.p4, this.p3));
      this.p4.setY(this.getDeterminant(this.p2Bar, this.p1Bar, this.p4, this.p3));
    }

    // current progress is right of the second trapezoid bit
    if (this.p3.getX() > this.sz - this.trap_offset_x) {
      this.p4.setY(this.getDeterminant(this.p3Bar, this.p4Bar, this.p4, this.p3));
    }
    
    else {
      this.p5.x = this.p4.x;
      this.p5.y = this.p4.y;
    }

  }


  // gets the point of intersection at the trapezoid bits
  getDeterminant(A, B, C, D)
    {
        // Line AB represented as a1x + b1y = c1
        var a1 = B.getY() - A.getY();
        var b1 = A.getX() - B.getX();
        var c1 = a1*(A.getX()) + b1*(A.getY());
       
        // Line CD represented as a2x + b2y = c2
        var a2 = D.getY() - C.getY();
        var b2 = C.getX() - D.getX();
        var c2 = a2*(C.getX())+ b2*(C.getY());
       
        var determinant = a1*b2 - a2*b1;
  
        // var x = (b2*c1 - b1*c2)/determinant;
        var y = (a1*c2 - a2*c1)/determinant;

        return y;
    }
}



class SkillCheckLine {
  constructor(sz) {
    this.sz = sz
    this.midPoint = new Point(random(0,this.sz), (this.sz * 0.04) / 2);
    this.counter = 0;
    this.color = color(255);
  }

  show() {
    stroke(this.color);
    strokeWeight(3);
    point(this.midPoint.x, this.midPoint.y);
    line(this.midPoint.x, this.midPoint.y + (0.05*this.sz),  this.midPoint.x, this.midPoint.y - (0.05*this.sz));
    noStroke();
  }

  oscillate() {
    this.counter += 0.086;
    var cos_value = cos(this.counter);
    var skill_check_pos = map(cos_value, -1, 1, 0, this.sz);

    this.midPoint.x = skill_check_pos;
  }

  setColor(result) {
    if (result == "miss") {
      this.color = color(255, 0, 0);
    }

   else if (result == "good") {
      this.color = color(255);
    }

    else if (result == "great") {
      this.color = color(0, 255, 0);
    }
  }
}



class SkillCheckTarget {
  constructor(sz) {
    this.trap_offset_x = sz * 0.02;

    this.midPoint = new Point(random(this.trap_offset_x*8,sz-this.trap_offset_x*8), (sz * 0.04) / 2);

    this.width_good = sz * 0.18;
    this.width_great = this.width_good / 2.222;

    this.height = sz * 0.04;

    this.skill_check_result = "miss";


    this.COLOR_GOOD = color(72,96,102);
    this.COLOR_GREAT = color(71,157,139);
    this.COLOR_STROKE_GOOD = color(80,110,120);
    this.COLOR_STROKE_GREAT = color(105,170,149);
  }

  show() {
    strokeWeight(3);
    stroke(this.COLOR_STROKE_GOOD);
    rectMode(CENTER);
    fill(this.COLOR_GOOD);
    rect(this.midPoint.x, this.midPoint.y, this.width_good, this.height);

    stroke(this.COLOR_STROKE_GREAT)
    fill(this.COLOR_GREAT);
    rect(this.midPoint.x, this.midPoint.y, this.width_great, this.height);
    noFill();
    noStroke();
  }

  playSound(skill_check_point) {
    var lower_bound_good = this.midPoint.x - (this.width_good / 2);
    var upper_bound_good = this.midPoint.x + (this.width_good / 2);

    var lower_bound_great = this.midPoint.x - (this.width_great / 2);
    var upper_bound_great = this.midPoint.x + (this.width_great / 2);

    // missed skill check
    if ((skill_check_point < lower_bound_good) || (skill_check_point > upper_bound_good)) {
      audio_skill_check_miss.play();
      this.skill_check_result = "miss";
    }

    // good skill check
    else if ((lower_bound_good <= skill_check_point && skill_check_point < lower_bound_great) || (upper_bound_great < skill_check_point && skill_check_point <= upper_bound_good)) {
      audio_skill_check_good.play();
      this.skill_check_result = "good";
    }

    // great skill check
    else if (lower_bound_great <= skill_check_point && skill_check_point <= upper_bound_great) {
      audio_skill_check_great.play();
      this.skill_check_result = "great";
    }
  }
}

let THE_SIZE = windowWidth;

let progress_bar = new ProgressBar(THE_SIZE);
let current_progress = new Progress(THE_SIZE);
let skill_check_line = new SkillCheckLine(THE_SIZE);
let target = new SkillCheckTarget(THE_SIZE);

let skill_check_in_progress = false;
let skill_check_ending = false;

let result_text = "SKILLCHECK";
let result_text_color = color(255);

var currentFrame = frameCount;



function preload() {
  the_font = loadFont('fonts/Oswald-DemiBold.ttf');
  img = loadImage('images/hammer.jpg');
  audio_skill_check_great = loadSound('sounds/skillcheckgreat.mp3');
  audio_skill_check_good = loadSound('sounds/skillcheckgood.mp3');
  audio_skill_check_miss = loadSound('sounds/skillcheckmiss.mp3');
  audio_skill_check_begin = loadSound('sounds/skillcheckbegin.mp3');
}


function setup() {
  createCanvas(THE_SIZE, windowHeight);
  frameRate(60);
  textFont(the_font);
  textSize(THE_SIZE * 0.03776);
  textAlign(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);
}

function keyPressed() {
  if (skill_check_in_progress && keyCode === 32 && !skill_check_ending) {
    currentFrame = frameCount;
    skill_check_ending = true;
    target.playSound(skill_check_line.midPoint.x);
    skill_check_line.setColor(target.skill_check_result);
    
    if (target.skill_check_result == "miss") {
      result_text = "MISS!"
      result_text_color = color(255, 0, 0);
    }

    else if (target.skill_check_result == "good") {
      result_text = "GOOD!"
      result_text_color = color(255);
    }

    else if (target.skill_check_result == "great") {
      result_text = "GREAT!"
      result_text_color = color(0, 255, 0);
    }
  } 
}


function draw() {
  resizeCanvas(THE_SIZE, windowHeight);
  background(0);
  translate(0, windowHeight/2);
  progress_bar.show();

  if (skill_check_in_progress) {
    target.show();
    skill_check_line.show();

    if (!skill_check_ending) {
      skill_check_line.oscillate();
    }

    if (frameCount - currentFrame == 45) {
      skill_check_in_progress = false;
      skill_check_ending = false;
    }

    fill(result_text_color);
    text(result_text, THE_SIZE/2, -windowHeight/4);
    image(img, THE_SIZE / 2, -windowHeight/8, THE_SIZE * 0.1, THE_SIZE * 0.1);
  
    fill(255);
    text("[Space] Hit Target Zone", THE_SIZE/2, windowHeight/4);
    noFill();
  }

  else {
    loop();
    skill_check_line.setColor("good");
    result_text = "SKILLCHECK";
    result_text_color = color(255);


    if (keyIsDown(69)) {
      current_progress.increaseProgress();

      var rdm = int(random(1,200));

      if (rdm == 1) {
        skill_check_in_progress = true;
        audio_skill_check_begin.play();
      }
    }

    else {
      fill(255);
      text("Hold [E] To Craft Weapon", THE_SIZE/2, windowHeight/4);
      noFill();
    }

    current_progress.show();
  }


}