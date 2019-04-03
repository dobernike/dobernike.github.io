/* eslint-disable object-curly-spacing */
import { render, changeScreen } from '../util.js';
import header from './header.js';

export default (game) => {
  const template = `${header(game)}
<div>
<div class="end">
  <p>Вы погибли =(!</p>
  <p>Продолжить с последнего уровня?</p>
  <div class="repeat"><span class="repeat-action">Да</span>|<span class="repeat-action">Не</span></div>
</div>
</div>`;
  const gameover = render(template);
  return changeScreen(gameover);
};
