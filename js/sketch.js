new p5();



let THE_SIZE = windowWidth;

let point1 = new Point(THE_SIZE * 0.02, 0);
let point2 = new Point(0, THE_SIZE * 0.04);
let point3 = new Point(THE_SIZE, THE_SIZE * 0.04);
let point4 = new Point(THE_SIZE - (THE_SIZE * 0.02), 0);
let point5 = new Point(THE_SIZE - (THE_SIZE * 0.02), 0);

let progress_bar = new ProgressBar(THE_SIZE, point1, point2, point3, point4);
let current_progress = new Progress(THE_SIZE, point1, point2, point3, point4, point5);

let skill_check_line = new SkillCheckLine(THE_SIZE);
let target = new SkillCheckTarget(THE_SIZE);

let skill_check_in_progress = false;
let skill_check_ending = false;

let result_text = "SKILLCHECK";
let result_text_color = color(255);

let image_result_hammer;

var currentFrame = frameCount;



function preload() {
  the_font = loadFont('fonts/Oswald-DemiBold.ttf');

  image_hammer = loadImage('images/hammer.jpg');
  image_hammer_miss = loadImage('images/hammermiss.jpg');
  image_hammer_good = loadImage('images/hammergood.jpg');
  image_hammer_great = loadImage('images/hammergreat.jpg');
  

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
      image_result_hammer = image_hammer_miss;
    }

    else if (target.skill_check_result == "good") {
      result_text = "GOOD!"
      result_text_color = color(255);
      image_result_hammer = image_hammer_good;
    }

    else if (target.skill_check_result == "great") {
      result_text = "GREAT!"
      result_text_color = color(0, 255, 0);
      image_result_hammer = image_hammer_great;
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
      image(image_hammer, THE_SIZE / 2, -windowHeight/8, THE_SIZE * 0.1, THE_SIZE * 0.1);
    }

    else {
      image(image_result_hammer, THE_SIZE / 2, -windowHeight/8, THE_SIZE * 0.1, THE_SIZE * 0.1);
    }

    if (frameCount - currentFrame == 45) {
      skill_check_in_progress = false;
      skill_check_ending = false;
    }

    fill(result_text_color);
    text(result_text, THE_SIZE/2, -windowHeight/4);
  
    fill(255);
    text("[Space] Hit Target Zone", THE_SIZE/2, windowHeight/4);
    noFill();
  }

  else {
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
