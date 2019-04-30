/* eslint-disable object-curly-spacing */
import StatsView from '../view/stats-view.js';
import Application from '../application.js';

export default class StatsScreen {
  constructor(stats) {
    this.root = new StatsView(stats);
    this.onClick();
  }

  get element() {
    return this.root.element;
  }

  onClick() {
    this.root.onClick = () => new Application().constructor.showWelcome();
  }

  showScores(scores, username = `o0`) {
    this.root.innerHTML = `<h1>Лучшие результаты игрока: ${username}</h1>

    <table class="scores">
      ${scores.map((it, i) => `<tr>
      <td><small>${i + 1}.</small></td>
      <td style="text-align: right;">${it.time} сек</td>
      <td>${new Array(3 - it.lives).fill(`♡`).concat(new Array(it.lives).fill(`♥`)).join(``)}</td>
      <td>${new Intl.DateTimeFormat(`ru-RU`).format(new Date(it.date))}</td>
      </tr>`).join(``)}
    </table> `;
  }
}
