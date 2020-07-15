class ControlsScreen {
  constructor() {
    this.screen = document.getElementById("scrControls");
    this.buttonBack = document.getElementById("btnBack");

    this.onBack = () => {}

    this.buttonBack.onclick = () => {
      this.onBack();
    }
  }

  show() {
    this.screen.hidden = false;
  }

  hide() {
    this.screen.hidden = true;
  }
}

export default ControlsScreen;