class ControlsScreen {
  constructor() {
    this.image = new Image();
    this.image.src = "./images/controls.png";
    this.backButton = document.createElement("button");
    this.onBack = null;
    this.initialize();
  }

  initialize() {
    this.backButton.className = "btn-1";
    this.backButton.innerText = "BACK";
    this.backButton.hidden = true;
    this.backButton.onclick = () => {
      if (this.onBack != null) {
        this.toggleButtons();
        this.onBack();
      }
    }
    document.body.append(this.backButton);
  }

  toggleButtons() {
    this.backButton.hidden = !this.backButton.hidden;
  }

  setSize(width, height) {
    let btnWidth = 0;
    if (this.backButton.hidden) {
      this.toggleButtons();
      btnWidth = this.backButton.offsetWidth;
      this.toggleButtons();
    } else {
      btnWidth = this.backButton.offsetWidth;
    }

    this.backButton.setAttribute("style", 
    `top: ${2 * height / 3}px; left: ${(width / 2) - (btnWidth / 2)}px`);
  }

  getImage() {
    return this.image;
  }
}

export default ControlsScreen;