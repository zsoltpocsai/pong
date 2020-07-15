import GameArea from "./game-area.js";
import Player from "./player.js";
import Sound from "./sound.js";

const MAX_SCORE = 10;

class Game {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.gameArea = new GameArea([
      this.player1.paddle,
      this.player2.paddle
    ]);
    this.sound = Sound;
    this._setUpControlKeys();
    this._setUpListeners();
  }

  run() {
    this.gameArea.update();
    this.gameArea.setScoreCounters({
      player1: this.player1.score,
      player2: this.player2.score
    });
  }

  launchBall() {
    this.gameArea.launchBall();
    this.sound.playLaunch();
  }

  getObjectsToRender() {
    return this.gameArea.sideWalls
      .concat(this.gameArea.centerline.tiles)
      .concat(this.gameArea.counters[0].getTiles())
      .concat(this.gameArea.counters[1].getTiles())
      .concat(
        [
          this.gameArea.ball,
          this.player1.paddle,
          this.player2.paddle
        ]
      );
  }

  _resetScores() {
    this.player1.score = 0;
    this.player2.score = 0;
  }

  _setUpListeners() {
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
          this._resetScores();
          this.sound.playScore();
          this.gameArea.toggleBallVisibility();
        });
      } else {
        this.sound.playScore();
      }
    }
  }

  _setUpControlKeys() {
    this.player1.controlKeys = {up: "w", down: "s"};
    this.player2.controlKeys = {up: "ArrowUp", down: "ArrowDown"};
  }
}

export default Game;