class InputHandler {
  constructor() {
    this.game = null;
    this.player1 = null;
    this.player2 = null;
    this.onPause = null;
  }
  setGame(game) {
    this.player1 = game.player1;
    this.player2 = game.player2;
    this.game = game;
    this.setUpInputHandlers();
  }
  setUpInputHandlers() {
    let players = [this.player1, this.player2];

    window.onkeydown = (e) => {
      //console.log(e.key);
      for (let player of players) {
        switch (e.key) {
          case player.controlKeys.up:
            player.paddle.moveUp();
            break;
          case player.controlKeys.down:
            player.paddle.moveDown();
            break;
          default:
            break;
        }
      }
    };

    window.onkeyup = (e) => {
      for (let player of players) {
        switch (e.key) {
          case player.controlKeys.up:
            player.paddle.moveStop();
            break;
          case player.controlKeys.down:
            player.paddle.moveStop();
            break;
          default:
            break;
        }
      }
    };

    window.onkeypress = (e) => {
      if (e.key === "p" && this.onPause != null) {
        this.onPause();
      }
      if (e.key === " ") {
        this.game.launchBall();
      }
    }
  }
}

export default InputHandler;