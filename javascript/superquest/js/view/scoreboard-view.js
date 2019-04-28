/* eslint-disable object-curly-spacing */
import AbstractView from './abstract-view.js';
import Router from '../router.js';

export default class ScoreBoardView extends AbstractView {
  constructor(username) {
    super();
    this.username = username;
  }

  get template() {
    return `<div class="end">
   <div class="scoreboard">Scoreboard is loading...</div>
   <br>
   <div class="repeat"><span class="repeat-action">Сыграть заново</span>&nbsp;|&nbsp;<a class="repeat-action" href="https://google.com">Выйти</a>????</div>
    </div>`;
  }

  bind() {
    this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();
      this.onRepeat();
    };

    this._scoreBoardContainer = this.element.querySelector(`div.scoreboard`);
  }

  showScores(scores, username) {
    this._scoreBoardContainer.innerHTML = `<h1>Лучшие результаты игрока: ${username}</h1>

    <table class="scores">
      ${scores.map((it, i) => `<tr>
      <td><small>${i + 1}.</small></td>
      <td style="text-align: right;">${it.time} сек</td>
      <td>${new Array(3 - it.lives).fill(`♡`).concat(new Array(it.lives).fill(`♥`)).join(``)}</td>
      <td>${new Intl.DateTimeFormat(`ru-RU`).format(new Date(it.date))}</td>
      </tr>`).join(``)}
    </table> `;
  }

  onRepeat() {
    Router.start();
  }
}
