import Paddle from "./paddle.js";

class Player {
  constructor() {
    this.score = 0;
    this.paddle = new Paddle();
    this.controlKeys = null;
  }
}

export default Player;