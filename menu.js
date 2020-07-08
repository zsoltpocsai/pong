import StartScreen from "./start-screen.js";
import ControlsScreen from "./controls-screen.js";

class Menu {
  constructor() {
    this.startScreen = new StartScreen();
    this.controlsScreen = new ControlsScreen();
    this.screen = this.startScreen;
    this.onStart = null;

    this.startScreen.onStart = () => {
      if (this.onStart != null) {
        this.onStart();
      }
    }

    this.startScreen.onControls = () => {
      this.controlsScreen.toggleButtons();
      this.screen = this.controlsScreen;
    }

    this.controlsScreen.onBack = () => {
      this.startScreen.toggleButtons();
      this.screen = this.startScreen;
    }
  }

  setScreenSize(width, height) {
    this.startScreen.setSize(width, height);
    this.controlsScreen.setSize(width, height);
  }
}

export default Menu;