import { render, changeScreen } from './util.js';
import { stats } from './stats.js';
import greeting from './greeting.js';
import header from './header.js';
import { img } from './data/data.js';
import { statistic } from './stats.js';

const template = `${header}
<section class="game">
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    <div class="game__option">
      <img src="${img[2]}" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option  game__option--selected">
      <img src="${img[2]}" alt="Option 2" width="304" height="455">
    </div>
    <div class="game__option">
      <img src="${img[2]}" alt="Option 3" width="304" height="455">
    </div>
  </form>
  ${statistic}
</section>`;

const game = render(template);

const back = game.querySelector(`.back`);
back.addEventListener(`click`, () => {
  changeScreen(greeting);
});

const gameAnswers = game.querySelectorAll(`.game__option`);
gameAnswers.forEach((it) => {
  it.addEventListener(`click`, () => {
    changeScreen(stats);
  });
});

export default game;
