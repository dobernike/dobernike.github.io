import { render, changeScreen } from './util.js';
import nextGame from './game-2.js';
import greeting from './greeting.js';
import header from './header.js';
import { img } from './data/data.js';
import { statistic } from './stats.js';

const template = `${header}
<section class="game">
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
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
    if (game.querySelectorAll(`input:checked`).length > 1) {
      changeScreen(nextGame);
    }
  });
});

// const inputs = game.querySelectorAll(`input`);
// inputs.forEach((it) => {
// });
// const secondCheckboxes = game.querySelectorAll(`input[name=question2]`);
// console.log(firstCheckboxes)

// const isChecked = (...inputChecboxes) => {
//   // const allChecboxes = [inputChecboxes];
//   console.log(inputChecboxes);

//   inputChecboxes.forEach((it) => {
//     console.log(it.isChecked);
//     console.log(inputChecboxes);
//     if (it.isChecked) {
//       console.log('123');
//     }
//   });
//   // inputChecbox.forEach((it) => {
//   // console.log(it.checked);

//   // });
// };

// document.addEventListener(`click`, () => {
//   isChecked(firstCheckboxes);
// });
// console.log(isChecked(firstCheckboxes, secondCheckboxes));

export default game;
