class Renderer {
  constructor(context2d) {
    this.ctx = context2d;
    this.blur = false;
  }

  renderAreaObjects(objects) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    for (let object of objects) {
      if (!object.render) continue;
      this.ctx.fillStyle = object.color;
      this.ctx.fillRect(
        object.position.x,
        object.position.y, 
        object.width, 
        object.height
      );
    }

    if (this.blur) {
      this.ctx.filter = "blur(4px)";
    } else {
      this.ctx.filter = "none";
    }
  }
}

export default Renderer;