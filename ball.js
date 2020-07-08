import MovingObject from "./moving-object.js";
import Paddle from "./paddle.js";
import Sound from "./sound.js";

class Ball extends MovingObject {
  constructor() {
    super(15, 15);
    this.spinRate = 0.5;
    this.sound = Sound;
  }

  bounce(overlap, object) {
    
    if (object instanceof Paddle) {
      this.calculateSpin(object);
      this.sound.playBounce1();
    } else {
      this.sound.playBounce2();
    }

    let direction = Object.assign({}, this.direction);
    if (overlap.x < overlap.y) {
      direction.x *= -1;
    } else {
      direction.y *= -1;
    }
    this.setDirection(direction);
  }
  
  calculateSpin(paddle) {
    let d = Object.assign({}, this.velocity);
    d.y += paddle.velocity.y * this.spinRate;
    this.setDirection(d);
  }
}

export default Ball;