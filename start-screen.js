class StartScreen {
  constructor() {
    this.image = new Image();
    this.image.src = "./images/screenImage.png";
    this.startButton = document.createElement("button");
    this.controlsButton = document.createElement("button");
    this.fullScreenButton = document.createElement("button");
    this.onStart = null;
    this.onControls = null;
    this.initialize();
  }

  initialize() {
    this.startButton.className = "btn-1";
    this.startButton.innerText = "START";
    this.startButton.onclick = () => {
      if (this.onStart != null) {
        this.toggleButtons();
        this.onStart();
      }
    }

    this.controlsButton.className = "btn-1";
    this.controlsButton.innerText = "CONTROLS";
    this.controlsButton.onclick = () => {
      if (this.onControls != null) {
        this.toggleButtons();
        this.onControls();
      }
    }

    this.fullScreenButton.className = "btn-1";
    this.fullScreenButton.innerText = "FULLSCREEN";
    this.fullScreenButton.onclick = () => {
      document.body.requestFullscreen();
    };

    document.body.append(this.startButton);
    document.body.append(this.controlsButton);
    document.body.append(this.fullScreenButton);
  }

  toggleButtons() {
    this.startButton.hidden = !this.startButton.hidden;
    this.controlsButton.hidden = !this.controlsButton.hidden;
    this.fullScreenButton.hidden = !this.fullScreenButton.hidden;
  }

  setSize(width, height) {
    let btnHeight = 0;
    let btnWidth = 0;
    let gap = 20;

    if (this.startButton.hidden) {
      this.toggleButtons();
      btnWidth = this.startButton.offsetWidth;
      btnHeight = this.startButton.offsetHeight;
      this.toggleButtons();
    } else {
      btnWidth = this.startButton.offsetWidth;
      btnHeight = this.startButton.offsetHeight;
    }

    this.startButton.setAttribute("style", 
    `top: ${(height / 2) + 0 * (btnHeight + gap)}px; left: ${(width / 2) - (btnWidth / 2)}px`);
    this.controlsButton.setAttribute("style", 
    `top: ${(height / 2) + 1 * (btnHeight + gap)}px; left: ${(width / 2) - (btnWidth / 2)}px`);
    this.fullScreenButton.setAttribute("style", 
    `top: ${(height / 2) + 2 * (btnHeight + gap)}px; left: ${(width / 2) - (btnWidth / 2)}px`);
  }

  getImage() {
    return this.image;
  }
}

export default StartScreen;