import MovingObject from "./moving-object.js";
import Paddle from "./paddle.js";
import Sound from "./sound.js";

class Ball extends MovingObject {
  constructor() {
    super(15, 15);
    this._spinRate = 0.5;
    this._sound = Sound;
  }

  bounce(overlap, object) {
    
    if (object instanceof Paddle) {
      this._calculateSpin(object);
      this._sound.playBounce1();
    } else {
      this._sound.playBounce2();
    }

    let direction = Object.assign({}, this.direction);
    if (overlap.x < overlap.y) {
      direction.x *= -1;
    } else {
      direction.y *= -1;
    }
    this.setDirection(direction);
  }
  
  _calculateSpin(paddle) {
    let d = Object.assign({}, this.velocity);
    d.y += paddle.velocity.y * this._spinRate;
    this.setDirection(d);
  }
}

export default Ball;