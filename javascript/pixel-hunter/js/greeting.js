/* eslint-disable object-curly-spacing */
import { render, changeScreen } from './util.js';
import rules from './rules.js';
import intro from './intro.js';


const template = `<section class="greeting central--blur">
<img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
<div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
<div class="greeting__challenge">
  <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
  <p class="greeting__challenge-text">Правила игры просты:</p>
  <ul class="greeting__challenge-list">
    <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
    <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
    <li>Фотореализм обманчив и коварен.</li>
    <li>Помни, главное — смотреть очень внимательно.</li>
  </ul>
</div>
<button class="greeting__continue" type="button">
  <span class="visually-hidden">Продолжить</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="59.374" height="56.719" viewBox="0 0 59.374 56.719">
    <path id="arrow" data-name=" &gt; Обычное" class="cls-1" d="M496.978,250.958l-28.336-28.335,5.086-5.086,28.335,28.335Zm-28.336,18.205,28.336-28.336,5.085,5.086-28.335,28.336ZM442.7,242.572h49.679v7.193H442.7v-7.193Z" transform="translate(-442.688 -217.531)" />
  </svg>

  <!-- <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-right"></use>
  </svg> -->
</button>
</section>`;

const greeting = render(template);

const greetingAsterisk = greeting.querySelector(`.greeting__asterisk`);
greetingAsterisk.addEventListener(`click`, () => {
  changeScreen(intro);
});

const greetingContinue = greeting.querySelector(`.greeting__continue`);
greetingContinue.addEventListener(`click`, () => {
  changeScreen(rules);
});


export default greeting;
