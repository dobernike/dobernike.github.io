/* eslint-disable object-curly-spacing */
import GameView from '../view/game-view.js';
import { levels, statsAnswers } from '../data/data.js';

export class GameScreen {
  constructor(model) {
    this.model = model;

    this.startGame();

    this.view = new GameView(levels[`double`], this.copyStatsAnswers, levels, this.currentLevel, this.model.state);

    this.view.onClick = () => {
      backButton();
    };

    this.view.onCheck = (it) => {
      gameScreen(levels[it], changeLevel(this.model.state, this.currentLevel += 1));
    };

    this._timer = null;
  }

  init() {
    this.currentLevel = 0;
    this.copyStatsAnswers = Object.assign({}, statsAnswers);
  }

  startGame() {
    // Старт игры
    this.init();
    this._tick();
  }

  _tick() {
    this.model.tick();
    // this.updateHeader();
    this._timer = setTimeout(() => this._tick(), 1000);
  }

  stopGame() {
    // Остановка игры
    clearInterval(this._timer);
  }
}


// import GameView from '../view/game-view.js';

import { renderStats } from './stats.js';
import { changeScreen } from '../utils/util.js';
import greeting from './greeting.js';
import changeLevel from '../data/change-level.js';
import countLives from '../data/count-lives.js';


export let currentLevel = 0;
export let copyStatsAnswers = Object.assign({}, statsAnswers);

export const gameScreen = (gamelevels, state) => {

  const gameView = new GameView(gamelevels, copyStatsAnswers, levels, currentLevel, state);

  if (state.level === 10 || countLives(copyStatsAnswers) < 1) {
    changeScreen(renderStats(copyStatsAnswers).element);
    return;
  }
  gameView.onClick = () => {
    backButton();
  };

  gameView.onCheck = (it) => {
    gameScreen(levels[it], changeLevel(state, currentLevel += 1));
  };

  changeScreen(gameView.element);
};

export const backButton = () => {
  currentLevel = 0;
  copyStatsAnswers = Object.assign({}, statsAnswers);
  changeScreen(greeting().element);
};
