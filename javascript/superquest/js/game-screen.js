/* eslint-disable object-curly-spacing */
import { Result } from './data/quest.js';
import FooterView from './view/footer-view.js';
import HeaderView from './view/header-view.js';
import LevelView from './game/level-view.js';
import GameOverView from './view/gameover-view.js/index.js';
import Application from './application.js';

class GameScreen {
  constructor(model) {
    // Инициализация и настройка игры
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.content = new LevelView(this.model.getCurrentLevel);

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
    Application.showStats(this.model);
  }

  updateHeader() {
    // Обновление статистики игрока
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
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

export default GameScreen;

// import footer from './game/footer.js';

// import { render, changeScreen } from './util.js';

// import QUEST from './data/quest-data.js';

// import scoreboard from './game/scoreboard-screen.js';

// const ONE_SECOND = 1000; // 1000ms = 1s

// const gameContainerElement = render(``);
// const headerElement = render(``);
// const levelElement = render(``);

// // init game content
// gameContainerElement.appendChild(headerElement);
// gameContainerElement.appendChild(levelElement);
// gameContainerElement.appendChild(footer);

// let game;

// const tick = () => {
//   game = Object.assign({}, game, {
//     time: game.time + 1
//   });
//   updateHeader(game);
// };

// let timer;

// const startTimer = () => {
//   timer = setTimeout(() => {
//     tick();
//     startTimer();
//   }, ONE_SECOND);
// };

// const stopTimer = () => {
//   clearTimeout(timer);
// };

// const getLevel = (state) => QUEST[`level-${state.level}`];

// const updateView = (container, view) => {
//   container.innerHTML = ``;
//   container.appendChild(view.element);
// };

// const showGameOver = (state) => {
//   // const view = new GameOverView(getLevel(game));
//   const view = new GameOverView(game);
//   view.onRepeat = () => updateGame(state);
//   updateView(levelElement, view);
// };

// const answerHandler = (answer) => {
//   stopTimer();
//   switch (answer.result) {
//     case Result.NEXT_LEVEL:
//       game = changeLevel(game, game.level + 1);
//       updateGame(game);
//       startTimer();
//       break;
//     case Result.DIE:
//       game = die(game);
//       showGameOver(game);
//       break;
//     case Result.WIN:
//       changeScreen(scoreboard);
//       break;
//     case Result.NOOP:
//       // just do nothing
//       break;
//     default:
//       throw new Error(`Unknown result: ${answer.result}`);
//   }
// };

// const updateHeader = (state) => {
//   updateView(headerElement, new HeaderView(state));
// };

// const updateGame = (state) => {
//   updateHeader(game);
//   const levelView = new LevelView(getLevel(game));
//   levelView.onAnswer = answerHandler;
//   updateView(levelElement, levelView);
//   levelView.focus();
// };


// const startGame = () => {
//   game = Object.assign({}, INITIAL_GAME);

//   updateGame(game);
//   changeScreen(gameContainerElement);
//   startTimer();
// };


// export default startGame;
