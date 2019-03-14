import { render, changeScreen } from './util.js';
import game from './game-1.js';
import greeting from './greeting.js';
import header from './header.js';

const template = `${header}
<section class="rules">
<h2 class="rules__title">Правила</h2>
<ul class="rules__description">
  <li>Угадай 10 раз для каждого изображения фото
    <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
    <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
  <li>Фотографиями или рисунками могут быть оба изображения.</li>
  <li>На каждую попытку отводится 30 секунд.</li>
  <li>Ошибиться можно не более 3 раз.</li>
</ul>
<p class="rules__ready">Готовы?</p>
<form class="rules__form">
  <input class="rules__input" type="text" placeholder="Ваше Имя">
  <button class="rules__button  continue" type="submit" disabled>Go!</button>
</form>
</section>`;

const rules = render(template);

const back = rules.querySelector(`.back`);
back.addEventListener(`click`, () => {
  changeScreen(greeting);
});

const rulesForm = rules.querySelector(`.rules__form`);
const rulesInput = rules.querySelector(`.rules__input`);
const rulesButton = rules.querySelector(`.rules__button`);

rulesInput.addEventListener(`input`, () => {
  if (rulesInput.value !== ``) {
    rulesButton.disabled = false;
  } else {
    rulesButton.disabled = true;
  }
});

rulesForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  changeScreen(game);
});

export default rules;
