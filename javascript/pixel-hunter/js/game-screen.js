/* eslint-disable object-curly-spacing */
import header from './header';
import { render, changeScreen } from './util.js';
import { statistic } from './stats.js';
import greeting from './greeting.js';
import { levels, INITIAL_GAME, statsAnswers } from './data/data.js';
import { renderStats } from './stats.js';
import changeLevel from './data/change-level.js';
import timer from './data/timer.js';
// const mockPhoto = `https://k42.kn3.net/CF42609C8.jpg`;


const getOption = (typeOfGame) => {
  let option = ``;

  switch (typeOfGame) {
    case `double`:
      option = `<div class="game__option">
    <img src="${levels.double.question.answers.question1.src}" alt="Option 1" width="468" height="458">
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
    <img src="${levels.double.question.answers.question2.src}" alt="Option 2" width="468" height="458">
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
    <img src="${levels.wide.question.answers.question1.src}" alt="Option 1" width="705" height="455">
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
    <img src="${levels.triple.question.answers.question1.src}" alt="Option 1" width="304" height="455">
  </div>

  <div class="game__option  game__option--selected">
    <img src="${levels.triple.question.answers.question2.src}" alt="Option 2" width="304" height="455">
  </div>

  <div class="game__option">
    <img src="${levels.triple.question.answers.question3.src}" alt="Option 3" width="304" height="455">
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
            let answers = game.querySelectorAll(`input:checked`);
            if (answers[0].value === levels.double.question.answers.question1.answer && answers[1].value === levels.double.question.answers.question2.answer) {
              copyStatsAnswers[`level-${currentLevel}`] = timer();
            } else {
              copyStatsAnswers[`level-${currentLevel}`] = `wrong`;
            }
            // console.log();
            // initialState.level += 1;
            gameScreen(levels[`wide`], changeLevel(INITIAL_GAME, currentLevel += 1));
          }
        });
      });
      break;
    case `wide`:
      gameAnswer = game.querySelectorAll(`.game__answer`);
      gameAnswer.forEach((it) => {
        it.addEventListener(`change`, () => {
          let answer = game.querySelector(`input:checked`);
          if (answer.value === levels.wide.question.answers.question1.answer) {
            copyStatsAnswers[`level-${currentLevel}`] = timer();
          } else {
            copyStatsAnswers[`level-${currentLevel}`] = `wrong`;
          }
          // initialState.level += 1;
          gameScreen(levels[`triple`], changeLevel(INITIAL_GAME, currentLevel += 1));

        });
      });
      break;
    case `triple`:
      gameAnswer = game.querySelectorAll(`.game__option`);
      gameAnswer.forEach((it) => {
        it.addEventListener(`click`, () => {
          if (it.classList.contains(`game__option--selected`)) {
            copyStatsAnswers[`level-${currentLevel}`] = timer();
          } else {
            copyStatsAnswers[`level-${currentLevel}`] = `wrong`;
          }
          // initialState.level += 1;
          gameScreen(levels[`double`], changeLevel(INITIAL_GAME, currentLevel += 1));
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


export let currentLevel = 0;
export let copyStatsAnswers = Object.assign({}, statsAnswers);

export const gameScreen = (gamelevels, state) => {
  if (state.level === 10) {
    changeScreen(renderStats(copyStatsAnswers));
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
    ${statistic(copyStatsAnswers)}
  </section>
  `;

  const screen = render(content);

  const back = screen.querySelector(`.back`);
  addEventToBack(back);
  getAnswer(gamelevels.type, screen);

  mainElement.innerHTML = ``;
  mainElement.appendChild(screen);
};

export const addEventToBack = (button) => {
  button.addEventListener(`click`, () => {
    currentLevel = 0;
    copyStatsAnswers = Object.assign({}, statsAnswers);
    changeScreen(greeting);
  });
};
