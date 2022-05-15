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
