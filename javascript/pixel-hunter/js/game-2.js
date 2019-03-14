import { render, changeScreen } from './util.js';
import nextGame from './game-3.js';
import greeting from './greeting.js';
import header from './header.js';
import { img } from './data/data.js';
import { statistic } from './stats';

const template = `${header}
<section class="game">
  <p class="game__task">Угадай, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
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
  </form>
  ${statistic}
</section>`;

const game = render(template);

const back = game.querySelector(`.back`);
back.addEventListener(`click`, () => {
  changeScreen(greeting);
});

const gameAnswers = game.querySelectorAll(`.game__answer`);
gameAnswers.forEach((it) => {
  it.addEventListener(`change`, () => {
    if (game.querySelectorAll(`input:checked`).length > 0) {
      changeScreen(nextGame);
    }
  });
});

export default game;
