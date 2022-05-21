window.addEventListener('click', function(e){   
  if (document.getElementById('top-nav').contains(e.target)){
    // Clicked in box
  } else{
    document.getElementById("menu-toggle").checked = false;
  }
});

var is_mobile = false;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && screenWidth <= 810) {
  is_mobile = true;
}

new p5();

let currentWindowWidth = windowWidth;
let currentWindowHeight = windowHeight;

let bar_height = windowWidth * 0.04;
let trap_offset_x = windowWidth * 0.02;

let point1 = new Point(trap_offset_x, 0);
let point2 = new Point(0, bar_height);
let point3 = new Point(windowWidth, bar_height);
let point4 = new Point(windowWidth - trap_offset_x, 0);
let point5 = new Point(windowWidth - trap_offset_x, 0);

let progress_bar = new ProgressBar(windowWidth, point1, point2, point3, point4);
let current_progress = new Progress(windowWidth, point1, point2, point3, point4, point5, progress_bar);

let skill_check_line = new SkillCheckLine(windowWidth);
let target = new SkillCheckTarget(windowWidth);

let skill_check_in_progress = false;
let skill_check_ending = false;

let result_text = "SKILLCHECK";
let result_text_color = color(255);

let image_result_hammer;

var currentFrame = frameCount;

var rdm = 0;



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
  audio_crafting = loadSound('sounds/crafting.mp3');
  audio_ping_blank = loadSound('sounds/pingblank.mp3');
  audio_ping_danger = loadSound('sounds/pingdanger.mp3');
  audio_tension = loadSound('sounds/tensionloop.mp3');
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  textFont(the_font);
  textAlign(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);

  print(windowWidth);

  audio_crafting.setVolume(0);
  audio_crafting.loop();
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


  if (document.querySelector('#checkbox_crafting').checked && keyCode == 69) {
    audio_crafting.setVolume(1);
  }

}

function keyReleased(){
  if (keyCode === 69){
    audio_crafting.setVolume(0, 0.5);
  }

}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  progress_bar.updatePosition(currentWindowWidth, windowWidth);
  current_progress.updatePosition(currentWindowWidth, windowWidth);
  skill_check_line.updatePosition(currentWindowWidth, windowWidth);
  target.updatePosition(currentWindowWidth, windowWidth);

  currentWindowWidth = windowWidth;
  currentWindowHeight = windowHeight;
}


function draw() {
  textSize(windowWidth * 0.03776);
  background(0);
  translate(0, windowHeight/2);
  progress_bar.show();

  if (skill_check_in_progress) {
    target.show();
    skill_check_line.show();

    if (!skill_check_ending) {
      skill_check_line.oscillate();
      image(image_hammer, windowWidth / 2, -windowHeight/8, windowWidth * 0.1, windowWidth * 0.1);
    }

    else {
      image(image_result_hammer, windowWidth / 2, -windowHeight/8, windowWidth * 0.1, windowWidth * 0.1);
    }

    if (frameCount - currentFrame == 45) {
      skill_check_in_progress = false;
      skill_check_ending = false;
    }

    fill(result_text_color);
    text(result_text, windowWidth/2, -windowHeight/4);
  
    fill(255);
    text("[Space] Hit Target Zone", windowWidth/2, windowHeight/4);
    noFill();
  }

  else if (!skill_check_in_progress) {
    skill_check_line.setRandomPosition();
    skill_check_line.setColor("good");
    result_text = "SKILLCHECK";
    result_text_color = color(255);


    if (keyIsDown(69) || is_mobile) {
      current_progress.increaseProgress();

      rdm = int(random(1,200));

      if (rdm == 1) {
        skill_check_in_progress = true;

        if (document.querySelector('#checkbox_skill_check_start').checked) {
          audio_skill_check_begin.play();
        }
        
      }
    }

    else {
      fill(255);
      text("Hold [E] To Craft Weapon", windowWidth/2, windowHeight/4);
      noFill();
    }

    current_progress.show();
  }

  rdm = int(random(1,500));
  if (rdm == 1 && document.querySelector('#checkbox_pings').checked) {
    audio_ping_blank.play();
  }

  rdm = int(random(1,500));
  if (rdm == 1 && document.querySelector('#checkbox_pings').checked) {
    audio_ping_danger.play();
  }

  rdm = int(random(1,500));
  if (rdm == 1 && document.querySelector('#checkbox_tension').checked && !audio_tension.isPlaying()) {
    audio_tension.play();
    audio_tension.setVolume(0.5);
  }
}