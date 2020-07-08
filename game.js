import GameArea from "./gamearea.js";
import Player from "./player.js";
import Sound from "./sound.js";

var MAX_SCORE = 10;

class Game {
  constructor(renderer) {
    this.player1 = new Player();
    this.player2 = new Player();
    this.renderer = renderer;
    this.gameArea = new GameArea([
      this.player1.paddle,
      this.player2.paddle
    ]);
    this.sound = Sound;
    this.setUpControlKeys();
    this.setUpListeners();
  }

  setUpListeners() {
    this.gameArea.onScore = (paddle) => {
      this.gameArea.resetBall();

      switch(paddle) {
        case this.player1.paddle:
          this.player1.score += 1;
          break;
        case this.player2.paddle:
          this.player2.score += 1;
          break;
        default:
          break;
      }

      if (this.player1.score >= MAX_SCORE || this.player2.score >= MAX_SCORE) {
        this.sound.playMaximumScore();
        this.gameArea.toggleBallVisibility();
        paddle.flash(() => {
          this.resetScores();
          this.registerScores();
          this.gameArea.toggleBallVisibility();
        });
      } else {
        this.registerScores();
      }
    }
  }

  run() {
    this.update();
    this.render();
  }

  update() {
    this.gameArea.update();
  }

  render() {
    this.renderer.render(
      this.gameArea.sideWalls
      .concat(this.gameArea.centerline.tiles)
      .concat(this.gameArea.counters[0].getTiles())
      .concat(this.gameArea.counters[1].getTiles())
      .concat(
        [
          this.gameArea.ball,
          this.player1.paddle,
          this.player2.paddle
        ]
      )
    );
  }

  resetScores() {
    this.player1.score = 0;
    this.player2.score = 0;
  }

  registerScores() {
    this.gameArea.setScoreCounters({
      player1: this.player1.score,
      player2: this.player2.score
    });
    this.sound.playScore();
  }

  launchBall() {
    this.gameArea.launchBall();
    this.sound.playLaunch();
  }

  setUpControlKeys() {
    this.player1.controlKeys = {up: "w", down: "s"};
    this.player2.controlKeys = {up: "ArrowUp", down: "ArrowDown"};
  }
}

export default Game;