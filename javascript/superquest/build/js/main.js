(function () {
  'use strict';

  const render = (template) => {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = template.trim();
    return wrapper;
  };

  const mainElement = document.querySelector(`#main`);

  const initialState = {
    level: `level-0`,
    lives: 3,
    time: 0
  };

  const levels = {
    'level-0': {
      description: `Вас зовут Луиджи Марио, вы водопроводчик, но сейчас перед вами стоит очень важная миссия — спасти принцессу
  Грибного Королевства Тоадстул Пич. Её похитил злой повелитель черепах Боузер и вы отправились в Грибное Королевство,
  чтобы победить Боузера и освободить принцессу. Вы отправляетесь в первый замок, но, чтобы в него попасть нужно
  преодолеть несколько препятствий. Вы стоите посреди на одной из равнин Грибного Королевства и видите как на вас
  стремительно несется хмурый гриб вашего роста. Нужно срочно что-то предпринять`,
      answers: {
        'left': null,
        'jump': null,
        'right': `level-1`
      }
    },

    'level-1': {
      description: `И вот вы справа. Тут ничего нет, похоже, остается только вернуться назад`,
      answers: {
        'left': `level-0`
      }
    }
  };

  // const headerTemplate =
  var header = (state) => `<header class="header">
<div>Мир: ${state.level}</div>
<div>Жизни:
${new Array(3 - state.lives)
    .fill(`<span class="heart__empty">♡</span>`).join(``)}
${new Array(state.lives)
    .fill(`<span class="heart__full">♥</span>`).join(``)}
</div>
<div>Время: ${state.time}</div>
</header>`;

  // export default render(headerTemplate(initialState));

  // eslint-disable-next-line object-curly-spacing

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

  renderScreen(initialState);

  // changeScreen(render(screenTemplate(levels[initialState.level])));
  // export default render(screenTemplate(levels[initialState.level]));

  // export default render(screenTemplate(levels[initialState.level]));

}());

//# sourceMappingURL=main.js.map
