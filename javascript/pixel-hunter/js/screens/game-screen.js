/* eslint-disable object-curly-spacing */
import GameView from '../view/game-view.js';
import { levels, statsAnswers } from '../data/data.js';
import changeLevel from '../data/change-level.js';
import { changeScreen } from '../utils/util.js';
import { renderStats } from './stats.js';
import greeting from './greeting.js';
import countLives from '../data/count-lives.js';


export const backButton = () => {
  GameScreen.currentLevel = 0;
  GameScreen.copyStatsAnswers = Object.assign({}, statsAnswers);
  changeScreen(greeting().element);
};

export class GameScreen {
  constructor(model) {
    this.model = model;
    this.state = model.state;
    this.init();


    this.content = new GameView(this.level, this.copyStatsAnswers, levels, this.currentLevel, this.state);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);

    this._timer = null;

    this.startGame();
  }

  get element() {
    return this.root;
  }

  changeLevel() {
    // Обновление текущего уровня

    const game = new GameView(this.level, this.copyStatsAnswers, levels, this.currentLevel, this.state);

    game.onClick = backButton.bind(this);
    game.onCheck = (it) => {
      this.level = levels[it];
      this.state = changeLevel(this.model.state, this.currentLevel += 1);
    };
    this._changeContentView(game);
  }

  init() {
    this.currentLevel = 0;
    this.copyStatsAnswers = Object.assign({}, statsAnswers);
    this.level = levels[`double`];
  }

  startGame() {
    // Старт игры
    this.changeLevel();
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

  canContinue() {
    if (this.state.level === 10 || countLives(this.copyStatsAnswers) < 1) {
      return false;
    } else {
      return true;
    }

  }

  nextLevel(canContinue) {
    if (canContinue) {
      changeScreen(this.view.element);
    } else {
      changeScreen(renderStats(this.copyStatsAnswers).element);
    }
  }

  _changeContentView(view) {
    // Вспомогательный внутренний метод
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }
}


// import GameView from '../view/game-view.js';

// export let currentLevel = 0;
// export let copyStatsAnswers = Object.assign({}, statsAnswers);

// export const gameScreen = (gamelevels, state) => {

// const gameView = new GameView(gamelevels, copyStatsAnswers, levels, currentLevel, state);

// if (state.level === 10 || countLives(copyStatsAnswers) < 1) {
//   changeScreen(renderStats(copyStatsAnswers).element);
//   return;
// }
// gameView.onClick = () => {
//   backButton();
// };

// gameView.onCheck = (it) => {
//   gameScreen(levels[it], changeLevel(state, currentLevel += 1));
// };

// changeScreen(gameView.element);
// };
