import AreaObject from "./area-object.js";

class ScoreCounter {
  constructor() {
    this.position = {x: 0, y: 0};
    this.width = 50;
    this.height = 100;
    this.tilesMatrix = [];
    this.tilesArray = [];
    this.rows = 5;
    this.cols = 3;
  }

  build() {
    this.tilesArray = [];
    for(let i = 0; i < this.rows; i++) {
      this.tilesMatrix[i] = [];
      for(let j = 0; j < this.cols; j++) {
        let tile = new AreaObject(
          this.width / this.cols, 
          this.height / this.rows
        );
        tile.position.x = Math.floor(this.position.x + j * tile.width);
        tile.position.y = Math.floor(this.position.y + i * tile.height);
        this.tilesMatrix[i][j] = tile;
        this.tilesArray.push(tile);
      }
    }
  }

  setScore(value) {
    if (value > 9) return;

    this._setTilesInitial();
    let pattern = [];
    switch(value) {
      case 0:
        pattern = [0, 1, 2, 3, 5, 6, 8, 9, 11, 12, 13, 14];
        break;
      case 1:
        pattern = [2, 5, 8, 11, 14];
        break;
      case 2:
        pattern = [0, 1, 2, 5, 6, 7, 8, 9, 12, 13, 14];
        break;
      case 3:
        pattern = [0, 1, 2, 5, 6, 7, 8, 11, 12, 13, 14];
        break;
      case 4:
        pattern = [0, 2, 3, 5, 6, 7, 8, 11, 14];
        break;
      case 5:
        pattern = [0, 1, 2, 3, 6, 7, 8, 11, 12, 13, 14];
        break;
      case 6:
        pattern = [0, 1, 2, 3, 6, 7, 8, 9, 11, 12, 13, 14];
        break;
      case 7:
        pattern = [0, 1, 2, 5, 8, 11, 14];
        break;
      case 8:
        pattern = [0, 1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14];
        break;
      case 9:
        pattern = [0, 1, 2, 3, 5, 6, 7, 8, 11, 14];
        break;
      default:
        pattern = [];
        break;
    }
    this._lightUpTiles(pattern);
  }

  getTiles(){
    return this.tilesArray;
  }

  _setTilesInitial() {
    let setting = {
      4: "black",
      10: "black",
      default: "dimgrey"
    };
    for(let i = 0; i < this.tilesArray.length; i++) {
      if (typeof setting[i] === "undefined") {
        this.tilesArray[i].color = setting.default;
      } else {
        this.tilesArray[i].color = setting[i];
      }
    }
  }

  _lightUpTiles(tiles) {
    for(const tile of tiles) {
      this.tilesArray[tile].color = "white";
    }
  }
}

export default ScoreCounter;