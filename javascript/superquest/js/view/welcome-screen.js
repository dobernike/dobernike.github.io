/* eslint-disable object-curly-spacing */
import AbstractView from './abstract-view.js';
import Router from '../router.js';
// import { render } from '../util.js';
// import GameScreen from './game-screen.js';
// import QuestModel from './model/quest-model.js';

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
      // console.log(playerName.value);
      new Router().constructor.showGame(playerName.value);
      // const gameModel = new QuestModel(inputValue);
      // const gameScreen = new GameScreen(gameModel);

      // changeView(gameScreen.element);
      // gameScreen.startGame();
    });
  }
}

// const template =

// const element = render(template);

// const input = element.querySelector(`input`);

// const agreeButton = element.querySelector(`.repeat-action`);
// agreeButton.addEventListener(`click`, () => {
// const inputValue = input.value();
// const gameModel = new QuestModel(inputValue);
// const gameScreen = new GameScreen(gameModel);
// changeView(gameScreen.element);
// gameScreen.startGame();
// });


// export default element;
