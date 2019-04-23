/* eslint-disable object-curly-spacing */
import GameView from '../view/game-view.js';
import { levels, statsAnswers } from '../data/data.js';
import changeLevel from '../data/change-level.js';
import { changeScreen } from '../utils/util.js';
import { renderStats } from './stats.js';
import greeting from './greeting.js';
import countLives from '../data/count-lives.js';
import timer from '../data/timer.js';


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

    // this._changeContentView(game);
  }

  onCheck(it) {
    console.log(it)
    this.level = levels[it];
    console.log(this.level);
    this.state = changeLevel(this.model.state, this.currentLevel += 1);
    this.nextLevel(this.canContinue);
  }

  init() {
    this.currentLevel = 0;
    this.copyStatsAnswers = Object.assign({}, statsAnswers);
    this.level = levels[`double`];
  }

  startGame() {
    // Старт игры
    this.changeLevel();
    this.answer();
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
      console.log(`safa`)
      changeScreen(this.content.element);
      this.changeLevel();
    } else {
      changeScreen(renderStats(this.copyStatsAnswers).element);
    }
  }

  answer() {
    let gameAnswer = ``;
    switch (this.level.type) {
      case `double`:
        gameAnswer = this.element.querySelectorAll(`.game__answer`);
        gameAnswer.forEach((it) => {
          it.addEventListener(`change`, () => {
            if (this.element.querySelectorAll(`input:checked`).length > 1) {
              let answers = this.element.querySelectorAll(`input:checked`);
              if (answers[0].value === levels.double.question.answers.question1.answer && answers[1].value === levels.double.question.answers.question2.answer) {
                this.copyStatsAnswers[`level-${this.currentLevel}`] = timer();
              } else {
                this.copyStatsAnswers[`level-${this.currentLevel}`] = `wrong`;
              }
              this.onCheck(`wide`);
            }
          });
        });
        break;
      case `wide`:
        gameAnswer = this.element.querySelectorAll(`.game__answer`);
        gameAnswer.forEach((it) => {
          it.addEventListener(`change`, () => {
            let answer = this.element.querySelector(`input:checked`);
            if (answer.value === this.levels.wide.question.answers.question1.answer) {
              this.copyStatsAnswers[`level-${this.currentLevel}`] = timer();
            } else {
              this.copyStatsAnswers[`level-${this.currentLevel}`] = `wrong`;
            }
            this.onCheck(`triple`);
          });
        });
        break;
      case `triple`:
        gameAnswer = this.element.querySelectorAll(`.game__option`);
        gameAnswer.forEach((it) => {
          it.addEventListener(`click`, () => {
            if (it.classList.contains(`game__option--selected`)) {
              this.copyStatsAnswers[`level-${this.currentLevel}`] = timer();
            } else {
              this.copyStatsAnswers[`level-${this.currentLevel}`] = `wrong`;
            }
            this.onCheck(`double`);
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


/*
let gameAnswer = ``;
    switch (this.gamelevels.type) {
      case `double`:
        gameAnswer = this.element.querySelectorAll(`.game__answer`);
        gameAnswer.forEach((it) => {
          it.addEventListener(`change`, () => {
            if (this.element.querySelectorAll(`input:checked`).length > 1) {
              let answers = this.element.querySelectorAll(`input:checked`);
              if (answers[0].value === this.levels.double.question.answers.question1.answer && answers[1].value === this.levels.double.question.answers.question2.answer) {
                this.copyStatsAnswers[`level-${this.currentLevel}`] = timer();
              } else {
                this.copyStatsAnswers[`level-${this.currentLevel}`] = `wrong`;
              }
              this.onCheck(`wide`);
            }
          });
        });
        break;
      case `wide`:
        gameAnswer = this.element.querySelectorAll(`.game__answer`);
        gameAnswer.forEach((it) => {
          it.addEventListener(`change`, () => {
            let answer = this.element.querySelector(`input:checked`);
            if (answer.value === this.levels.wide.question.answers.question1.answer) {
              this.copyStatsAnswers[`level-${this.currentLevel}`] = timer();
            } else {
              this.copyStatsAnswers[`level-${this.currentLevel}`] = `wrong`;
            }
            this.onCheck(`triple`);
          });
        });
        break;
      case `triple`:
        gameAnswer = this.element.querySelectorAll(`.game__option`);
        gameAnswer.forEach((it) => {
          it.addEventListener(`click`, () => {
            if (it.classList.contains(`game__option--selected`)) {
              this.copyStatsAnswers[`level-${this.currentLevel}`] = timer();
            } else {
              this.copyStatsAnswers[`level-${this.currentLevel}`] = `wrong`;
            }
            this.onCheck(`double`);
          });
        });
        break;
      default:
        gameAnswer = `Тип игры имеет неправильный формат`;
        break;
    }


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
*/


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
