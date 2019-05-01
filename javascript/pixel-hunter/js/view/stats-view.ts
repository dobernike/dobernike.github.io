/* eslint-disable object-curly-spacing */
import AbstractView from './abstract-view';

import HeaderView from './header-view';
import countLives from '../data/count-lives';
import { statistic } from '../data/data';
import { calcSummaryScores, calcCorrect, calcFast, calcSlow } from '../data/calc-scores';


const header = new HeaderView();
const BONUS = {
  CORRECT: 100,
  FAST: 50,
  LIVES: 50,
  SLOW: -50
};

export default class StatsView extends AbstractView {
  copyStatsAnswers: any
  lives: any
  victoryTitle: string = ``;
  victoryOrFail: string = ``;

  constructor(copyStatsAnswers) {
    super();
    this.copyStatsAnswers = copyStatsAnswers;
    this.lives = countLives(copyStatsAnswers);

  }

  get template() {
    if (this.lives > 0) {
      this.victoryTitle = `
      <h2 class="result__title">Победа!</h2>
      `;

      this.victoryOrFail = `
      <td class="result__points">× ${BONUS.CORRECT}</td>
      <td class="result__total">${calcCorrect(this.copyStatsAnswers) * BONUS.CORRECT}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${calcFast(this.copyStatsAnswers)} <span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× ${BONUS.FAST}</td>
      <td class="result__total">${calcFast(this.copyStatsAnswers) * BONUS.FAST}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${this.lives} <span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× ${BONUS.LIVES}</td>
      <td class="result__total">${this.lives * BONUS.LIVES}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${calcSlow(this.copyStatsAnswers)} <span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× ${BONUS.SLOW}</td>
      <td class="result__total">${calcSlow(this.copyStatsAnswers) * BONUS.SLOW}</td>
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">${calcSummaryScores(this.copyStatsAnswers, this.lives)}</td>
    </tr>
      `;
    } else {
      this.victoryOrFail = `
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
    </tr>
      `;
    }

    return `
    ${header.template}
    <section class="result">
    ${this.victoryTitle}
      <table class="result__table">
        <tr>
          <td colspan="2">
            ${statistic(this.copyStatsAnswers)}
          </td>
          ${this.victoryOrFail}
      </table>
    </section>
    `;
  }

  bind() {
    // Вызывает метод bind класса HeaderView, который по нажатию на кнопку back вызывает метод onClick() этого класса
    header.bind(this);
  }

  onClick() { }

}
