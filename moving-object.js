import AreaObject from "./area-object.js";

class MovingObject extends AreaObject {
  constructor(width, height) {
    super(width, height);
    this.MAXSPEED = 0;
    this.speed = 0;
    this.direction = {x: 0, y: 0};
    this.velocity = {x: 0, y: 0};
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  setSpeed(value) {
    if (value > this.MAXSPEED) {
      this.speed = this.MAXSPEED;
    } else {
      this.speed = value;
    }
    this.setVelocity();
  }

  setDirection(vector) {
    if (vector.x != 0 || vector.y != 0) {
      this.direction = this.changeMagnitude(vector, 1);
    } else {
      this.direction = {x: 0, y: 0};
    }
    this.setVelocity();
  }

  setVelocity() {
    this.velocity.x = this.direction.x * this.speed;
    this.velocity.y = this.direction.y * this.speed;
  }

  changeMagnitude(v, m) {
    const x = Math.abs(v.x);
    const y = Math.abs(v.y);
    const c = m / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    let v2 = {x: x * c, y: y * c};

    if (v.x < 0) v2.x *= -1;
    if (v.y < 0) v2.y *= -1;

    return v2;
  }
}

export default MovingObject;