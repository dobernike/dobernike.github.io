import { render, changeScreen } from './util.js';
import greeting from './greeting.js';

const template = `<section class="intro">
<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
<p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`;

const intro = render(template);
const introAsterisk = intro.querySelector(`.intro__asterisk`);

introAsterisk.addEventListener(`click`, () => {
  changeScreen(greeting);
});

export default intro;
