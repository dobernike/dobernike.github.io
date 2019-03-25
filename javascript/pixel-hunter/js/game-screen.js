
import header from './header';
import data from './data/data.js';
import { render, changeScreen } from './util.js';
import { statistic } from './stats.js';
import greeting from './greeting.js';
const mockPhoto = `https://k42.kn3.net/CF42609C8.jpg`;

const getOption = (typeOfGame) => {
  const option = ``;

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
  const gameAnswer = ``;

  switch (typeOfGame) {
    case `double`:
      gameAnswer = game.querySelectorAll(`.game__answer`);
      gameAnswers.forEach((it) => {
        it.addEventListener(`change`, () => {
          if (game.querySelectorAll(`input:checked`).length > 1) {
            // changeScreen(nextGame);
          }
        });
      });
      break;
    case `wide`:
      gameAnswers = game.querySelectorAll(`.game__answer`);
      gameAnswers.forEach((it) => {
        it.addEventListener(`change`, () => {
          if (game.querySelectorAll(`input:checked`).length > 0) {
            // changeScreen(nextGame);
          }
        });
      });
      break;
    case `triple`:
      const gameAnswers = game.querySelectorAll(`.game__option`);
      gameAnswers.forEach((it) => {
        it.addEventListener(`click`, () => {
          // changeScreen(nextGame);
        });
      });
      break;

    default:
      gameAnswers = `Тип игры имеет неправильный формат`;
      break;
  }

  return gameAnswers;
};

const mainElement = document.querySelector(`#main`);

const gameScreen = (gameData) => {

  const content = `
  ${header}
  <section class="game">
    <p class="game__task">
      ${gameData.question.text}
    </p>
    <form class="game__content  game__content--${gameData.type}">
      ${getOption(gameData.type)}
    </form>
    ${statistic}
  </section>
  `;

  const screen = render(content);

  const back = screen.querySelector(`.back`);
  back.addEventListener(`click`, () => {
    changeScreen(greeting);
  });

  getAnswer(gameData.type, screen);

  mainElement.innerHTML = ``;
  mainElement.appendChild(screen);
  // return gameScreen;
}; gameScreen(data);

// export default

/*  3
    <div class="game__option">
      <img src="${img[2]}" alt="Option 1" width="304" height="455">
    </div>

    <div class="game__option  game__option--selected">
      <img src="${img[2]}" alt="Option 2" width="304" height="455">
    </div>

    <div class="game__option">
      <img src="${img[2]}" alt="Option 3" width="304" height="455">
    </div>
*/

/*  2
    <div class="game__option">
      <img src="${img[1]}" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
*/

/*  1
    <div class="game__option">
      <img src="${img[0]}" alt="Option 1" width="468" height="458">
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
      <img src="${img[0]}" alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
*/
