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

    updatePosition(oldWidth, newWidth) {
      let newXPos = map(this.x, 0, oldWidth, 0, newWidth);
      this.x = newXPos;
    }

  }  