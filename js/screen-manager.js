import StartScreen from "./screen-start.js";
import ControlsScreen from "./screen-controls.js";

class ScreenManager {
  constructor() {
    this.startScreen = new StartScreen();
    this.controlsScreen = new ControlsScreen();
    
    this.onStart = () => {}
    this.onFullscreen = () => {}

    this.startScreen.onStart = () => {
      this.onStart();
    }

    this.startScreen.onControls = () => {
      this.controlsScreen.show();
      this.startScreen.hide();
    }

    this.startScreen.onFullscreen = () => {
      this.onFullscreen();
    }

    this.controlsScreen.onBack = () => {
      this.controlsScreen.hide();
      this.startScreen.show();
    }

    this.initialize();
  }

  initialize() {
    this.startScreen.show();
    this.controlsScreen.hide();
  }

  hideScreens() {
    this.startScreen.hide();
    this.controlsScreen.hide();
  }
}

export default ScreenManager;