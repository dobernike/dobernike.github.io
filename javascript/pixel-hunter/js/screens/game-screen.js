/* eslint-disable object-curly-spacing */
import GameView from '../view/game-view.js';
import { statsAnswers } from '../data/data.js';
import { changeScreen } from '../utils/util.js';
import GreetingScreen from './greeting-screen.js';
import countLives from '../data/count-lives.js';
import timer from '../data/timer.js';
import Application from '../application.js';


export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.state = model.state;
    this.data = model.data;
    this.init();


    this.content = new GameView(this.level, this.copyStatsAnswers, this.data, this.currentLevel, this.state);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);

    this._timer = null;
  }

  get element() {
    return this.root;
  }

  changeLevel() {
    // Обновление текущего уровня
    const game = new GameView(this.level, this.copyStatsAnswers, this.data, this.currentLevel, this.state);

    game.onClick = () => {
      this.init();
      changeScreen(new GreetingScreen().element);
    };

    this._changeContentView(game);
    this.answer();

  }

  onCheck() {
    this.currentLevel += 1;
    this.level = this.data[this.currentLevel];

    this.model.nextLevel();

    this.state = this.model.state;
    this.nextLevel(this.canContinue());
  }

  init() {
    this.currentLevel = 0;
    this.copyStatsAnswers = Object.assign({}, statsAnswers);
    this.level = this.data[this.currentLevel];
  }

  startGame() {
    // Старт игры
    this.changeLevel();
    this._tick();
  }

  _tick() {
    this._time = 0;
    this._timer = setInterval(() => {
      this._time += 1;
    }, 1000);
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
    this.stopGame();
    if (canContinue) {
      this.startGame();
    } else {
      new Application().constructor.showStats(this.copyStatsAnswers);
    }
  }

  answer() {
    let gameAnswer = ``;
    switch (this.level.type) {
      case `two-of-two`:
        gameAnswer = this.element.querySelectorAll(`.game__answer`);
        gameAnswer.forEach((it) => {
          it.addEventListener(`change`, () => {
            if (this.element.querySelectorAll(`input:checked`).length > 1) {
              let answers = this.element.querySelectorAll(`input:checked`);
              if (this.data[this.currentLevel].answers[0].type.includes(answers[0].value) && this.data[this.currentLevel].answers[1].type.includes(answers[1].value)) {
                this.copyStatsAnswers[`level-${this.currentLevel}`] = timer(this._time);
              } else {
                this.copyStatsAnswers[`level-${this.currentLevel}`] = `wrong`;
              }
              this.onCheck();
            }
          });
        });
        break;
      case `tinder-like`:
        gameAnswer = this.element.querySelectorAll(`.game__answer`);
        gameAnswer.forEach((it) => {
          it.addEventListener(`change`, () => {
            let answer = this.element.querySelector(`input:checked`);
            if (this.data[this.currentLevel].answers[0].type.includes(answer.value)) {
              this.copyStatsAnswers[`level-${this.currentLevel}`] = timer(this._time);
            } else {
              this.copyStatsAnswers[`level-${this.currentLevel}`] = `wrong`;
            }
            this.onCheck();
          });
        });
        break;
      case `one-of-three`:
        gameAnswer = this.element.querySelectorAll(`.game__option`);
        gameAnswer.forEach((it) => {
          it.addEventListener(`click`, () => {
            if (it.classList.contains(`game__option--selected`)) {
              this.copyStatsAnswers[`level-${this.currentLevel}`] = timer(this._time);
            } else {
              this.copyStatsAnswers[`level-${this.currentLevel}`] = `wrong`;
            }
            this.onCheck();
          });
        });
        break;
      default:
        gameAnswer = `Тип игры имеет неправильный формат`;
        break;
    }
  }

  _changeContentView(view) {
    // Вспомогательный внутренний метод
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }
}
