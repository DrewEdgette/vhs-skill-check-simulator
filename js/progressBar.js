class ProgressBar {
    constructor(sz, p1, p2, p3, p4) {
      this.sz = sz;
      this.p1 = p1;
      this.p2 = p2;
      this.p3 = p3;
      this.p4 = p4;
  
      this.trap_offset_x = this.sz * 0.02;
      this.bar_height = this.sz * 0.04;
  
  
      this.COLOR_BAR_UNFILLED = color(35,8,29);
      this.COLOR_STROKE = color(79,50,92);
      }
  
      show() {
        stroke(this.COLOR_STROKE);
        fill(this.COLOR_BAR_UNFILLED);
        quad(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y, this.p4.x, this.p4.y);
        noStroke();
      }
  }
