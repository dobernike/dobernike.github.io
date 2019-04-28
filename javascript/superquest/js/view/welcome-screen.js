/* eslint-disable object-curly-spacing */
import AbstractView from './abstract-view.js';
import Router from '../router.js';


export default class WelcomeScreen extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div class="end">
    <p>Ghbdtn! Настало время приключений! Вы готовы сразится с неприятностями и получить принцессу прямо сейчас?!<br>
      А?!<br>
      Точно?!<br>
      Уверен?!<br>
      Стопудов?!</p>
    <p>08 есть?</p>
    <div class="repeat">
      Ваше имя:<input type="text"><br>
      <span class="repeat-action">Да</span>
    </div>
    </div>`;
  }

  bind() {
    const agreeButton = this.element.querySelector(`.repeat-action`);
    const playerName = this.element.querySelector(`input`);
    agreeButton.addEventListener(`click`, () => {
      new Router().constructor.showGame(playerName.value);
    });
  }
}
