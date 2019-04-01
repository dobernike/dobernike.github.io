/* eslint-disable object-curly-spacing */
import { render, mainElement, changeScreen } from './util.js';
import header from './game/header.js'; // ./game/header.js
import footer from './game/footer.js';
import renderLevel from './game/level.js';
import { levels, initialState } from './data/data.js'; //
import { INITIAL_GAME, changeLevel, canContinue, die } from './data/quest.js';
import QUEST from './data/quest-data.js';
import showGameOver from './game/gameover-screen.js';


const screenTemplate = (lvl) => `
<div>
<div class="quest">
  <p class="text">
  ${lvl.description}
  </p>
  <input type="text">
  <ul class="answers">
    ${[...Object.entries(lvl.answers)].map(([answer]) => `<li class="answer"> ${answer.toUpperCase()}</li>`).join(``)}
  </ul>
</div>
</div>
<div>
<div class="result"></div>
<small>Для справки введите <i>help</i></small>
</div>`;

const renderScreen = (state) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(render(header(state)));
  mainElement.appendChild(render(screenTemplate(levels[state.level])));

  const input = document.querySelector(`input`);
  input.onkeydown = (evt) => {
    if (evt.key === `Enter`) {
      // Переход на следующий экран
      const userAnswer = input.value.trim();
      const destination = userAnswer.toLowerCase() in levels[state.level].answers ? levels[state.level].answers[userAnswer] : null;
      // input.value = ``;
      if (destination) {
        renderScreen(Object.assign({}, state, {
          'level': destination
        }));
        // renderScreen()
      }
    }
  };
};

export default () => renderScreen(initialState);
