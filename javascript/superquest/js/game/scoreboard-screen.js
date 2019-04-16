/* eslint-disable object-curly-spacing */
import { render } from '../util.js';


const template = `<div class="end">
<div class="scoreboard">
  <h1>Мои лучшие результаты</h1>

  <table class="scores">
    <tbody>
      <tr>
        <td>
          <small>1.</small>
        </td>
        <td style="text-align: right;">5 сек</td>
        <td>????💗💗</td>
        <td>25.05.2018</td>
      </tr>
    </tbody>
  </table>
</div>
<br>
<div class="repeat"><span class="repeat-action">Сыграть заново</span>&nbsp;|&nbsp;<a class="repeat-action" href="https://google.com">Выйти</a>????</div>
</div>`;


export default render(template);
