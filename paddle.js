import MovingObject from "./moving-object.js";

class Paddle extends MovingObject {
  constructor() {
    super(20, 80);
    this.time = 0;
  }

  moveUp() {
    this.setDirection({x: 0, y: -1});
    this.setSpeed(this.MAXSPEED);
  }

  moveDown() {
    this.setDirection({x: 0, y: 1});
    this.setSpeed(this.MAXSPEED);
  }

  moveStop() {
    this.setDirection({x: 0, y: 0});
  }

  moveNonLinear() {
    //not in use
    const speed = Math.min(this.MAXSPEED, 2 * this.time);
    this.setSpeed(speed);
    if (this.direction.x == 0 && this.direction.y == 0) {
      this.time = 0;
    } else {
      console.log(this.speed);
      this.time += 1;
    }
    this.move();
  }

  flash(callback) {
    let times = 18;
    const id = setInterval(() => {
      if (this.color === "white") {
        this.color = "black";
      } else {
        this.color = "white";
      }
      times -= 1;
      if (times <= 0) {
        clearInterval(id);
        callback();
      }
    }, 125);
  }
}

export default Paddle;