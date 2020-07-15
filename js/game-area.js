import Ball from "./ball.js";
import AreaObject from "./area-object.js";
import CollisionDetector from "./collision-detector.js";
import ScoreCounter from "./score-counter.js";

class GameArea {
  constructor(paddles) {
    this.width = 0;
    this.height = 0;
    this.sideWalls = [new SideWall(), new SideWall()];
    this.scoreZones = [new ScoreZone(), new ScoreZone()];
    this.counters = [new ScoreCounter(), new ScoreCounter()];
    this.centerline = new Centerline();
    this.paddle1 = paddles[0];
    this.paddle2 = paddles[1];
    this.ball = new Ball();
    this.collisionDetector = new CollisionDetector();
    this.onScore = (paddle) => {};
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;

    this.paddle1.position = {
      x: (1 * width / 16) - this.paddle1.width / 2, 
      y: (height / 2) - this.paddle1.height / 2
    };
    this.paddle2.position = {
      x: (15 * width / 16) - this.paddle2.width / 2, 
      y: (height / 2) - this.paddle2.height / 2
    };

    this.paddle1.MAXSPEED = height / 100;
    this.paddle2.MAXSPEED = height / 100;
    this.ball.MAXSPEED = (width + height) / 180;
    
    for (let i = 0; i < 2; i++) {
      let sideWall = this.sideWalls[i];
      let scoreZone = this.scoreZones[i];
      let scoreCounter = this.counters[i];

      sideWall.width = width;
      scoreZone.height = height;
      scoreCounter.width = 75;
      scoreCounter.height = 100;
      
      if (i == 0) {
        sideWall.position = {x: 0, y: 0};
        scoreZone.position = {x: 0, y: 0};
        scoreCounter.position = {
          x: (3 * width / 7) - (scoreCounter.width / 2), 
          y: height / 10
        };
      } else if (i == 1) {
        sideWall.position = {x: 0, y: height - sideWall.height};
        scoreZone.position = {x: width - scoreZone.width, y: 0};
        scoreCounter.position = {
          x: (4 * width / 7) - (scoreCounter.width / 2), 
          y: height / 10
        };
      }

      scoreCounter.build();
      scoreCounter.setScore(0);
    }

    this.centerline.build(
      (width / 2) - (this.sideWalls[0].height / 2), 
      this.sideWalls[0].height,
      this.sideWalls[0].height, 
      height - this.sideWalls[0].height * 2
    );

    this.resetBall();
  }

  update() {
    this.paddle1.move();
    this.paddle2.move();
    this.ball.move();
    
    this.collisionDetector.control(
      [this.paddle1, this.paddle2],
      this.sideWalls
    );

    this.collisionDetector.control(
      [this.ball],
      this.sideWalls.concat([this.paddle1, this.paddle2]),
      ({ overlap, staticObject }) => { 
        this.ball.bounce(overlap, staticObject);
      }
    );

    this.collisionDetector.control(
      [this.ball],
      this.scoreZones,
      ({ staticObject }) => {
        if (staticObject == this.scoreZones[0]) {
          this.onScore(this.paddle2);
        } else if (staticObject == this.scoreZones[1]) {
          this.onScore(this.paddle1);
        }
      }
    );
  }

  resetBall() {
    this.ball.position = {
      x: (this.width / 2) - (this.ball.width / 2), 
      y: (this.height / 2) - (this.ball.height / 2)
    };
    this.ball.setSpeed(0);
  }

  launchBall() {
    if (this.ball.speed > 0) {
      this.resetBall();
    } else {
      this.ball.setSpeed(this.ball.MAXSPEED);
      if (Math.random() < 0.5) {
        this.ball.setDirection({x: 1, y: 0});
      } else {
        this.ball.setDirection({x: -1, y: 0});
      }
    }
  }

  toggleBallVisibility() {
    this.ball.render = !this.ball.render;
  }

  setScoreCounters(scores) {
    this.counters[0].setScore(scores.player1);
    this.counters[1].setScore(scores.player2);
  }
}

class SideWall extends AreaObject {
  constructor() {
    super(100, 30);
    this.color = "gray";
  }
}

class ScoreZone extends AreaObject {
  constructor() {
    super(20, 100);
    this.color = "green";
  }
}

class Centerline {
  constructor() {
    this.tiles = [];
    this._tileNumber = 10;
    this._color = "gray";
  }

  build(x, y, width, height) {
    const tileHeight = height / (this._tileNumber * 2 - 1);
 
    this.tiles = [];
    for (let i = 0; i < this._tileNumber; i++) {
      let tile = new AreaObject(width, tileHeight);
      tile.color = this._color;
      tile.position.x = x;
      tile.position.y = y + i * tileHeight * 2;
      this.tiles.push(tile);
    }
  }
}

export default GameArea;