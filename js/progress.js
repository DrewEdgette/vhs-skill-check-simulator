class Progress extends ProgressBar {
    constructor(sz, p1, p2, p3, p4, p5) {
      super(sz, p1, p2, p3, p4);

      this.trap_offset_x = this.sz * 0.02;
      this.bar_height = this.sz * 0.04;
  
      this.p1 = new Point(p1.x, p1.y);
      this.p2 = new Point(p2.x, p2.y);
      this.p3 = new Point(p3.x, p3.y);
      this.p4 = new Point(p4.x, p4.y)
      this.p5 = new Point(p4.x, p4.y)
  
      this.p1Bar = new Point(p1.x, p1.y);
      this.p2Bar = new Point(p2.x, p2.y);
      this.p3Bar = new Point(p3.x, p3.y);
      this.p4Bar = new Point(p4.x, p4.y)
  
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
    getDeterminant(A, B, C, D) {
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

    updatePosition(oldWidth, newWidth) {
      this.sz = newWidth;

      this.trap_offset_x = this.sz * 0.02;
      this.bar_height = this.sz * 0.04;

      let points = [this.p1, this.p2, this.p3, this.p4, this.p5, this.p1Bar, this.p2Bar, this.p3Bar, this.p4Bar];

      for (let i in points) {
        points[i].updatePosition(oldWidth, newWidth);
      }

      this.p2.y = newWidth * 0.04;
      this.p3.y = newWidth * 0.04;

      this.p2Bar.y = newWidth * 0.04;
      this.p2Bar.y = newWidth * 0.04;
    }
  }