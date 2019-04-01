(function () {
  'use strict';

  const render = (template) => {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = template.trim();
    return wrapper;
  };

  const mainElement = document.querySelector(`#main`);

  const changeScreen = (element) => {
    mainElement.innerHTML = ``;
    // element.forEach((it) => {
    mainElement.appendChild(element);
    // });

  };

  // import { render } from './util.js';
  // import { initialState } from './data/data.js';
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

  const INITIAL_GAME = Object.freeze({
    level: 0,
    lives: 2,
    time: 0
  });

  /* eslint-disable object-curly-spacing */

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

  render(template);

  /* eslint-disable object-curly-spacing */


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

  var gameScreen = () => renderScreen(initialState);

  const template$1 = `<div class="end">
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

  const element = render(template$1);

  const agreeButton = element.querySelector(`.repeat-action`);

  agreeButton.addEventListener(`click`, () => {
    gameScreen();
  });

  // for development

  // import welcomeScreen from './game-screen.js';

  changeScreen(element);

}());

//# sourceMappingURL=main.js.map
