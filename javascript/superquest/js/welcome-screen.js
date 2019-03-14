import { changeScreen, render } from './util.js';
import gameScreen from './game-screen.js';

const template = `<div class="end">
<p>Ghbdtn! Настало время приключений! Вы готовы сразится с неприятностями и получить принцессу прямо сейчас?!<br>
  А?!<br>
  Точно?!<br>
  Уверен?!<br>
  Стопудов?!</p>
<p>08 есть?</p>
<div class="repeat">
  Ваше имя:<input type="text"><br>
  <span class="repeat-action">Да</span>
</div>
</div>`;

const element = render(template);

const agreeButton = element.querySelector(`.repeat-action`);

agreeButton.addEventListener(`click`, () => {
  gameScreen();
});

export default element;
