import Game from "./game.js";
import Renderer from "./renderer.js";
import InputHandler from "./input-handler.js";
import Menu from "./menu.js";

const body = document.getElementById("body");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const renderer = new Renderer(ctx);
const inputHandler = new InputHandler();
const menu = new Menu();
const game = new Game(renderer);

var animationRequestID = 0;
var inGameplay = false;

setCanvasSize();
inputHandler.setGame(game);

window.onresize = setCanvasSize;

function setCanvasSize() {
  canvas.width = window.innerWidth - 0;
  canvas.height = window.innerHeight - 0;
  game.gameArea.setSize(canvas.width, canvas.height);
  menu.setScreenSize(canvas.width, canvas.height);
}

function start() {
    animationRequestID = window.requestAnimationFrame(run);
    console.log("engine started");
}

function stop() {
    window.cancelAnimationFrame(animationRequestID);
    console.log("engine stopped");
}

menu.onStart = () => {
  inGameplay = true;
}

function run() {
  if (inGameplay) {
    game.run();
  } else {
    renderer.renderScreen(menu.screen);
  }  
  animationRequestID = window.requestAnimationFrame(run);
}

start();
inputHandler.onPause = stop;
