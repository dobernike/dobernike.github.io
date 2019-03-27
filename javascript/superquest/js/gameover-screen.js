/* eslint-disable object-curly-spacing */
import { render } from './util.js';

const template = `<div>
<header class="header">
  <div>Мир: 0</div>
  <div>Жизни: <span class="heart__empty">♡</span>
    <span class="heart__full">🖤</span>
    <span class="heart__full">🖤</span>
  </div>
  <div>Время: 2</div>
</header>
</div>
<div>
<div class="end">
  <p>Вы погибли =(!</p>
  <p>Продолжить с последнего уровня?</p>
  <div class="repeat"><span class="repeat-action">Да</span>|<span class="repeat-action">Не</span></div>
</div>
</div>
<div>
<div class="result"></div>
<small>Для справки введите <i>help</i></small>
</div>`;

export default render(template);
