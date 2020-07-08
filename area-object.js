class AreaObject {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.position = {x: 0, y: 0};
    this.color = "white";
    this.render = true;
  }
}

export default AreaObject;