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
      this.counter += 0.056;
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

    updatePosition(oldWidth, newWidth) {
      this.sz = newWidth;
      this.midPoint.updatePosition(oldWidth, newWidth);
      this.midPoint.y = (newWidth * 0.04) / 2;
    }

    setRandomPosition() {
      this.counter = random(0,TWO_PI);
    }
  }