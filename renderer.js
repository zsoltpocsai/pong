class Renderer {
  constructor(context2d) {
    this.ctx = context2d;
  }

  render(objects) {
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
  }

  renderScreen(screen) {
    const image = screen.getImage();
    const { width, height } = this.ctx.canvas;
    this.ctx.drawImage(image, 0, 0, width, height);
  }
}

export default Renderer;