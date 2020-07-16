'use strict';

import Game from "./game.js";
import Renderer from "./renderer.js";
import InputHandler from "./input-handler.js";
import Menu from "./screen-manager.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const renderer = new Renderer(ctx);
const inputHandler = new InputHandler();
const screenManager = new Menu();
const game = new Game();

var animationRequestID = 0;
var inGameplay = false;

inputHandler.setGame(game);
inputHandler.onBackToMenu = () => {
  if (inGameplay) {
    inGameplay = false;
    screenManager.initialize();
    renderBackgroundFrame();
    stop();
  }
}

screenManager.onStart = () => {
  inGameplay = true;
  screenManager.hideScreens();
  start();
}

screenManager.onFullscreen = () => {
  document.body.requestFullscreen();
  renderBackgroundFrame();
}

window.onresize = setCanvasSize;

function renderBackgroundFrame() {
  renderer.blur = true;
  renderer.renderAreaObjects(game.getObjectsToRender());
  renderer.blur = false;
}

function setCanvasSize() {
  canvas.width = window.innerWidth - 0;
  canvas.height = window.innerHeight - 0;
  game.gameArea.setSize(canvas.width, canvas.height);
  renderBackgroundFrame();
}

function start() {
    animationRequestID = window.requestAnimationFrame(run);
}

function stop() {
    window.cancelAnimationFrame(animationRequestID);
}

function run() {
  game.run();
  renderer.renderAreaObjects(game.getObjectsToRender());
  
  animationRequestID = window.requestAnimationFrame(run);
}

setCanvasSize();
renderBackgroundFrame();
