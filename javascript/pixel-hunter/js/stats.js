/* eslint-disable object-curly-spacing */
import { render } from './util.js';
import header from './header.js';
import { copyStatsAnswers, addEventToBack } from './game-screen.js';
import countLives from './data/count-lives.js';
import { calcSummaryScores, calcCorrect, calcFast, calcSlow } from './data/calc-scores.js';


export const statistic = (answers) => `
<ul class="stats">
          <li class="stats__result stats__result--${answers[`level-0`]}"></li>
          <li class="stats__result stats__result--${answers[`level-1`]}"></li>
          <li class="stats__result stats__result--${answers[`level-2`]}"></li>
          <li class="stats__result stats__result--${answers[`level-3`]}"></li>
          <li class="stats__result stats__result--${answers[`level-4`]}"></li>
          <li class="stats__result stats__result--${answers[`level-5`]}"></li>
          <li class="stats__result stats__result--${answers[`level-6`]}"></li>
          <li class="stats__result stats__result--${answers[`level-7`]}"></li>
          <li class="stats__result stats__result--${answers[`level-8`]}"></li>
          <li class="stats__result stats__result--${answers[`level-9`]}"></li>
        </ul>`;

const BONUS = {
  CORRECT: 100,
  FAST: 50,
  LIVES: 50,
  SLOW: -50
};

export const renderStats = (arrayStats) => {
  let victoryTitle = ``;
  let victoryOrFail;
  const lives = countLives(arrayStats);

  if (lives > 0) {
    victoryTitle = `
    <h2 class="result__title">Победа!</h2>
    `;

    victoryOrFail = `
    <td class="result__points">× ${BONUS.CORRECT}</td>
    <td class="result__total">${calcCorrect(copyStatsAnswers) * BONUS.CORRECT}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${calcFast(copyStatsAnswers)} <span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">× ${BONUS.FAST}</td>
    <td class="result__total">${calcFast(copyStatsAnswers) * BONUS.FAST}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${lives} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× ${BONUS.LIVES}</td>
    <td class="result__total">${lives * BONUS.LIVES}</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">${calcSlow(copyStatsAnswers)} <span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">× ${BONUS.SLOW}</td>
    <td class="result__total">${calcSlow(copyStatsAnswers) * BONUS.SLOW}</td>
  </tr>
  <tr>
    <td colspan="5" class="result__total  result__total--final">${calcSummaryScores(copyStatsAnswers, lives)}</td>
  </tr>
    `;
  } else {
    victoryOrFail = `
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>
  </tr>
    `;
  }

  const template = `
  ${header}
  <section class="result">
  ${victoryTitle}
    <table class="result__table">
      <tr>
        <td colspan="2">
          ${statistic(copyStatsAnswers)}
        </td>
        ${victoryOrFail}
    </table>
  </section>
  `;

  const stats = render(template);

  const back = stats.querySelector(`.back`);
  addEventToBack(back);

  return stats;
};
