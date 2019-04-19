/* eslint-disable object-curly-spacing */
import { Result } from './data/quest.js';
import FooterView from './view/footer-view.js';
import HeaderView from './view/header-view.js';
import LevelView from './game/level-view.js';
import GameOverView from './view/gameover-view.js';
import Router from './router.js';


export default class GameScreen {
  constructor(model) {
    // Инициализация и настройка игры
    this.model = model;
    this.header = new HeaderView(this.model.state);
    // console.log(this.model.state);
    this.content = new LevelView(this.model.getCurrentLevel());
    // console.log(this.model.getCurrentLevel);
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(new FooterView().element);

    this._timer = null;
  }

  get element() {
    return this.root;
  }

  stopGame() {
    // Остановка игры
    clearInterval(this._timer);
  }

  _tick() {
    this.model.tick();
    this.updateHeader();
    this._timer = setTimeout(() => this._tick(), 1000);
  }

  startGame() {
    // Старт игры
    this.changeLevel();
    this._tick();
  }

  answer(answer) {
    // Обрабтка ответа пользователя
    this.stopGame();
    switch (answer.result) {
      case Result.NEXT_LEVEL:
        this.model.nextLevel();
        this.startGame();
        break;
      case Result.DIE:
        this.model.die();
        this.endGame(false, !(this.model.isDead()));
        break;
      case Result.WIN:
        this.endGame(true, false);
        break;
      default:
        throw new Error(`Unknown result: ${answer.result}`);
    }
  }

  restart(continueGame) {
    // Продолжение или сброс игры
    if (!continueGame) {
      this.model.restart();
    }
    this.startGame();
  }

  exit() {
    // Выход из игры
    new Router().showStats(this.model);
  }

  updateHeader() {
    // Обновление статистики игрока
    const header = new HeaderView(this.model.state);

    this.root.replaceChild(header.element, this.root.firstChild);
  }

  changeLevel() {
    // Обновление текущего уровня
    this.updateHeader();

    const level = new LevelView(this.model.getCurrentLevel());
    level.onAnswer = this.answer.bind(this);
    this._changeContentView(level);
    level.focus();
  }

  endGame(win, canContinue) {
    // Проигрыш игрока
    const gameOver = new GameOverView(win, canContinue);
    gameOver.onRestart = this.restart.bind(this);
    gameOver.onExit = this.exit.bind(this);

    this._changeContentView(gameOver);
    this.updateHeader();
  }

  _changeContentView(view) {
    // Вспомогательный внутренний метод
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }
}
