// eslint-disable-next-line object-curly-spacing
import { render, mainElement, changeScreen } from './util.js';
import { levels, initialState } from './data/data.js';
import header from './header.js';

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
/* <li class="answer">LEFT. Вы побежите влево, от гриба</li>
<li class="answer">RIGHT. Вы побежите вправо, прямо на гриб</li>
<li class="answer">JUMP. Вы подпрыгните вверх</li> */
const renderScreen = (state) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(render(header(state)));
  mainElement.appendChild(render(screenTemplate(levels[state.level])));
  // changeScreen(render(screenTemplate(levels[state.level])));
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

export default renderScreen(initialState);

// changeScreen(render(screenTemplate(levels[initialState.level])));
// export default render(screenTemplate(levels[initialState.level]));

// export default render(screenTemplate(levels[initialState.level]));
