import AreaObject from "./area-object.js";

class Background {
  constructor() {
    this.centerline = null;
    this.walls = [];
    this.scoreZones = [];
    this.scoreCounters = [];
  }
}

class Centerline {
  constructor(x, y, width, height) {
    this.tiles = [];
    this.tileNumber = 10;
    this.color = "gray";
    this.build(x, y, width, height);
  }
  build(x, y, width, height) {
    let tileHeight = height / this.tileNumber;
    let tile = new AreaObject(width, tileHeight);
    tile.color = this.color;
    for (let i = 0; i < this.tileNumber; i++) {
      tile.position.x = x;
      tile.position.y = y + i * tileHeight;
      this.tiles.push(tile);
    }
  }
}

export default Background;