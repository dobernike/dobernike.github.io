(function () {
  'use strict';

  const render = (template) => {
    const wrapper = document.createElement(`div`);
    // wrapper.innerHTML = template.trim();
    wrapper.innerHTML = template;
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

  /* eslint-disable object-curly-spacing */
  const template = `<div>
<div class="result"></div>
<small>Для справки введите <i>help</i></small>
</div>`;

  var footer = render(template);

  const getAnswer = (level) => {
    let answers = ``;
    for (const answer of level.answers) {
      answers += `<li class="answer"> ${answer.action.toUpperCase() + ` ` + answer.title}</li>`;
    }
    return answers;
  };

  var renderLevel = (lvl) => `
<div>
<div class="quest">
  <p class="text">
  ${lvl.text}
  </p>
  <input type="text">
  <ul class="answers">
  ${getAnswer(lvl)}
  </ul >
</div >
</div >
`;

  const initialState = {
    level: `level-0`,
    lives: 3,
    time: 0
  };

  const INITIAL_GAME = Object.freeze({
    level: 0,
    lives: 3,
    time: 0
  });

  const changeLevel = (game, level) => {
    if (typeof level !== `number`) {
      throw new Error(`Level should not be negative value`);
    }
    if (level < 0) {
      throw new Error(`Level should not be negative value`);
    }

    const newGame = Object.assign({}, game, {
      level
    });
    return newGame;
  };

  const canContinue = (game) => {
    return game.lives !== 0 ? game : false;
  };

  const die = (game) => {
    game.lives -= 1;
    return game;
  };

  var QUEST = {
    'level-0': {
      text: `Вас зовут Луиджи Марио, вы водопроводчик, но сейчас перед вами стоит очень важная миссия — спасти принцессу
  Грибного Королевства Тоадстул Пич. Её похитил злой повелитель черепах Боузер и вы отправились в Грибное Королевство,
  чтобы победить Боузера и освободить принцессу. Вы отправляетесь в первый замок, но, чтобы в него попасть нужно
  преодолеть несколько препятствий. Вы стоите посреди на одной из равнин Грибного Королевства и видите как на вас
  стремительно несется хмурый гриб вашего роста. Нужно срочно что-то предпринять`,
      answers: [
        {
          action: `left`,
          title: `Вы побежите влево, от гриба`,
          // result: die(),
          go: () => {
            return null;
          }
        },
        {
          action: `right`,
          title: `Вы побежите вправо, прямо на гриб`,
          // result: die()
          go: () => {
            return null;
          }
        },
        {
          action: `jump`,
          title: `Вы прыгните вверх`,
          // result: Result.NEXT_LEVEL
          go: () => {
            return 1;
          }
        }
      ]
    },

    'level-1': {
      text: `Теперь, когда угроза быть убитым грибом миновала, вы можете спокойно оглядеться по сторонам. Вы видите что над вами прямо в двумерном небе висят кирпичные блоки, которые перемещаются с непонятными металлическими конструкциями. Что вы предпримете?`,
      answers: [
        {
          action: `left`,
          title: `Вы побежите влево`,
          // result: die()
          go: () => {
            return null;
          }
        },
        {
          action: `right`,
          title: `Вы побежите вправо`,
          // result: die()
          go: () => {
            return null;
          }
        },
        {
          action: `jump`,
          title: `Вы прыгните вверх`,
          // result: die()
          go: () => {
            return null;
          }
        }
      ]
    }
  };

  /* eslint-disable object-curly-spacing */

  var showGameOver = (game) => {
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

  /* eslint-disable object-curly-spacing */

  const ENTER_KEY_CODE = 13; //

  let game; //

  const startGame = () => {
    game = Object.assign({}, INITIAL_GAME);

    const gameContainerElement = render(``);
    const headerElement = render(``);
    const levelElement = render(``);

    // init game content
    gameContainerElement.appendChild(headerElement);
    gameContainerElement.appendChild(levelElement);
    gameContainerElement.appendChild(footer);

    const getLevel = () => QUEST[`level-${game.level}`];

    const updateGame = (state) => {
      headerElement.innerHTML = header(state);
      levelElement.innerHTML = renderLevel(getLevel(state.level));
    };

    levelElement.addEventListener(`keydown`, ({ keyCode }) => {
      if (keyCode === ENTER_KEY_CODE) {
        const current = getLevel(game.level);
        const { value = `` } = levelElement.querySelector(`input`);
        const userAnswer = value.toUpperCase();

        for (const answer of current.answers) {
          if (userAnswer === answer.action.toUpperCase()) {
            const nextLevel = answer.go();
            try {
              game = changeLevel(game, nextLevel);
            } catch (e) {
              game = die(game);
            }
            updateGame(game);
            if (!canContinue(game)) {
              showGameOver(game);
            }
          }
        }
      }
    });

    updateGame(game);
    changeScreen(gameContainerElement);

  };

  var gameScreen = () => startGame(initialState);

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
