class StartScreen {
  constructor() {
    this.screen = document.getElementById("scrStart");
    this.buttonStart = document.getElementById("btnStart");
    this.buttonControls = document.getElementById("btnControls");
    this.buttonFullscreen = document.getElementById("btnFullscreen");

    this.onStart = () => {}
    this.onControls = () => {}
    this.onFullscreen = () => {}

    this.buttonStart.onclick = () =>{
      this.onStart();
    }

    this.buttonControls.onclick = () => { 
      this.onControls();
    }

    this.buttonFullscreen.onclick = () => {
      this.onFullscreen();
    }
  }

  show() {
    this.screen.hidden = false;
  }

  hide() {
    this.screen.hidden = true;
  }
}

export default StartScreen;