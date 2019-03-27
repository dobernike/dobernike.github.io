/* eslint-disable object-curly-spacing */
import header from './header';
import { render, changeScreen } from './util.js';
import { statistic } from './stats.js';
import greeting from './greeting.js';
import { levels, INITIAL_GAME } from './data/data.js';
import { stats } from './stats.js';
const mockPhoto = `https://k42.kn3.net/CF42609C8.jpg`;

let initialState = Object.assign({}, INITIAL_GAME, {
});

const getOption = (typeOfGame) => {
  let option = ``;

  switch (typeOfGame) {
    case `double`:
      option = `<div class="game__option">
    <img src="${mockPhoto}" alt="Option 1" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>

  <div class="game__option">
    <img src="${mockPhoto}" alt="Option 2" width="468" height="458">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question2" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question2" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;
      break;
    case `wide`:
      option = `<div class="game__option">
    <img src="${mockPhoto}" alt="Option 1" width="705" height="455">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;
      break;
    case `triple`:
      option = `<div class="game__option">
    <img src="${mockPhoto}" alt="Option 1" width="304" height="455">
  </div>

  <div class="game__option  game__option--selected">
    <img src="${mockPhoto}" alt="Option 2" width="304" height="455">
  </div>

  <div class="game__option">
    <img src="${mockPhoto}" alt="Option 3" width="304" height="455">
  </div>`;
      break;

    default:
      option = `Тип игры имеет неправильный формат`;
      break;
  }

  return option;
};

const getAnswer = (typeOfGame, game) => {
  let gameAnswer = ``;

  switch (typeOfGame) {
    case `double`:
      gameAnswer = game.querySelectorAll(`.game__answer`);
      gameAnswer.forEach((it) => {
        it.addEventListener(`change`, () => {
          if (game.querySelectorAll(`input:checked`).length > 1) {
            initialState.level += 1;
            gameScreen(levels[`wide`], initialState);
          }
        });
      });
      break;
    case `wide`:
      gameAnswer = game.querySelectorAll(`.game__answer`);
      gameAnswer.forEach((it) => {
        it.addEventListener(`change`, () => {
          if (game.querySelectorAll(`input:checked`).length > 0) {
            initialState.level += 1;
            gameScreen(levels[`triple`], initialState);
          }
        });
      });
      break;
    case `triple`:
      gameAnswer = game.querySelectorAll(`.game__option`);
      gameAnswer.forEach((it) => {
        it.addEventListener(`click`, () => {
          initialState.level += 1;
          gameScreen(levels[`double`], initialState);
        });
      });
      break;

    default:
      gameAnswer = `Тип игры имеет неправильный формат`;
      break;
  }

  return gameAnswer;
};

const mainElement = document.querySelector(`#main`);


export const gameScreen = (gamelevels, state) => {
  console.log(state);
  console.log(state.level);
  if (state.level === 10) {
    changeScreen(stats);
    return;
  }
  const content = `
  ${header}
  <section class="game">
    <p class="game__task">
      ${gamelevels.question.text}
    </p>
    <form class="game__content  game__content--${gamelevels.type}">
      ${getOption(gamelevels.type)}
    </form>
    ${statistic}
  </section>
  `;

  const screen = render(content);

  const back = screen.querySelector(`.back`);
  back.addEventListener(`click`, () => {
    changeScreen(greeting);
  });

  getAnswer(gamelevels.type, screen);

  mainElement.innerHTML = ``;
  mainElement.appendChild(screen);
};
