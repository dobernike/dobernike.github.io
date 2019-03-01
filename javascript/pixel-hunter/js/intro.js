import { render, changeScreen } from './util.js';
import greeting from './greeting.js';

const template = `<section class="intro">
<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
<p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`;

const introAsterisk = document.querySelector(`.intro__asterisk`);
// console.log(introAsterisk);

// introAsterisk.onclick = () => {
//   changeScreen(greeting);
// };
// introAsterisk.addEventListener(`click`, () => {
//   changeScreen(greeting);
// });

export default render(template);
