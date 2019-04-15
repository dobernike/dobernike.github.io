/* eslint-disable object-curly-spacing */
import AbstractView from './abstract-view.js';

import HeaderView from '../view/header-view.js';
import { statistic } from '../screens/stats.js';
import getOption from '../data/get-option.js';
import timer from '../data/timer.js';


const header = new HeaderView();


export default class GameView extends AbstractView {
  constructor(gamelevels, copyStatsAnswers, levels, currentLevel, state) {
    super();
    this.gamelevels = gamelevels;
    this.copyStatsAnswers = copyStatsAnswers;
    this.levels = levels;
    this.currentLevel = currentLevel;
    this.state = state;
  }

  get template() {
    return `
      ${header.template}
      <section class="game">
        <p class="game__task">
          ${this.gamelevels.question.text}
        </p>
        <form class="game__content  game__content--${this.gamelevels.type}">
          ${getOption(this.gamelevels.type)}
        </form>
        ${statistic(this.copyStatsAnswers)}
      </section>
      `;
  }

  bind() {
    // Вызывает метод bind класса HeaderView, который по нажатию на кнопку back вызывает метод onClick() этого класса
    header.bind(this);

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
  }

  onClick() { }

  onCheck() { }

}
