/* eslint-disable object-curly-spacing */
import AbstractView from './abstract-view.js';

import HeaderView from '../view/header-view.js';
import { statistic } from '../data/data.js';
import getOption from '../data/get-option.js';


const header = new HeaderView();


export default class GameView extends AbstractView {
  constructor(option, copyStatsAnswers, levels, currentLevel, state) {
    super();
    this.option = option;
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
          ${this.option.question}
        </p>
        <form class="game__content  game__content--${this.option.type}">
          ${getOption(this.option)}
        </form>
        ${statistic(this.copyStatsAnswers)}
      </section>
      `;
  }

  bind() {
    // Вызывает метод bind класса HeaderView, который по нажатию на кнопку back вызывает метод onClick() этого класса
    header.bind(this);

  }

  onClick() { }

  onCheck() { }

}
