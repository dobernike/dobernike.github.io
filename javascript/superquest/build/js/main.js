(function () {
  'use strict';

  const render = (template) => {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = template;
    return wrapper;
  };

  const mainElement = document.querySelector(`#main`);

  const changeScreen = (element) => {
    mainElement.innerHTML = ``;
    mainElement.appendChild(element);
  };

  /* eslint-disable object-curly-spacing */
  const render$1 = (html) => {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = html.trim();
    return wrapper;
  };

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error(`Template is required`);
    }

    get element() {
      if (this._element) {
        return this._element;
      }
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }

    render() {
      return render$1(this.template);
    }

    bind() {
      // bind handlers if required
    }
  }

  class HeaderView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
    }

    get template() {
      return `<header class="header">
    <div>Мир: ${this.state.level}</div>
    <div>Жизни:
    ${new Array(3 - this.state.lives)
        .fill(`<span class="heart__empty">♡</span>`).join(``)}
    ${new Array(this.state.lives)
        .fill(`<span class="heart__full">♥</span>`).join(``)}
    </div>
    <div>Время: ${this.state.time}</div>
    </header>`;
    }
  }

  /* eslint-disable object-curly-spacing */


  const ENTER_KEY_CODE = 13;


  class LevelView extends AbstractView {
    constructor(level) {
      super();
      this.level = level;
    }

    get template() {
      return `<div class="quest">
    <p class="text">${this.level.text}</p>

    <ul class="answers">
    ${this.level.answers.map((it) => `<li class="answer">${it.action.toUpperCase()}. ${it.title}</li>`).join(``)}
    </ul>
    <input type="text">
  </div>`;
    }

    bind() {
      const answersElement = this.element.querySelector(`.answers`);

      const answersElements = Array.from(answersElement.children);

      answersElement.addEventListener(`click`, (evt) => {
        const answerIndex = answersElements.indexOf(evt.target);
        const answer = this.level.answers[answerIndex];
        if (answer) {
          this.onAnswer(answer);

        }
      });

      this._answerInput = this.element.querySelector(`input`);
      this._answerInput.addEventListener(`keydown`, ({ keyCode }) => {
        if (keyCode === ENTER_KEY_CODE) {
          const current = this.level;
          const { value = `` } = this._answerInput;
          const userAnswer = value.toUpperCase();
          for (const answer of current.answers) {
            if (userAnswer === answer.action.toUpperCase()) {
              this.onAnswer(answer);
            }
          }
        }
      });
    }

    onAnswer() { }

    focus() {
      this._answerInput.focus();
    }
  }

  /* eslint-disable object-curly-spacing */
  const template = `<div>
<div class="result"></div>
<small>Для справки введите <i>help</i></small>
</div>`;


  var footer = render(template);

  const INITIAL_GAME = Object.freeze({
    level: 0,
    lives: 3,
    time: 0
  });

  const Result = {
    NOOP: 0,
    DIE: 1,
    WIN: 2,
    NEXT_LEVEL: 3
  };

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

  const die = (game) => {
    game.lives -= 1;
    return game;
  };

  /* eslint-disable object-curly-spacing */


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
          result: Result.DIE
        },
        {
          action: `right`,
          title: `Вы побежите вправо, прямо на гриб`,
          result: Result.DIE
        },
        {
          action: `jump`,
          title: `Вы прыгните вверх`,
          result: Result.NEXT_LEVEL
        }
      ]
    },

    'level-1': {
      text: `Теперь, когда угроза быть убитым грибом миновала, вы можете спокойно оглядеться по сторонам. Вы видите что над вами прямо в двумерном небе висят кирпичные блоки, которые перемещаются с непонятными металлическими конструкциями. Что вы предпримете?`,
      answers: [
        {
          action: `left`,
          title: `Вы побежите влево`,
          result: Result.DIE
        },
        {
          action: `right`,
          title: `Вы побежите вправо`,
          result: Result.DIE
        },
        {
          action: `jump`,
          title: `Как что, конечно же подпрыгну и со всей силы ударюсь головой о железяку!`,
          result: Result.NEXT_LEVEL
        }
      ]
    },

    'level-2': {
      text: `Вы проходите немного вперед и снова видите над головой кирпичную кладку. Вы хотите проверить свои новые силы и со всего размаху бьетесь об нее головой. На этот раз кирпичи разлетаются во все стороны. Вы начинаете радостно прыгать и разносить головой все кирпичи, но случайно ударяетесь о еще одну металлическую штуку и видите как из нее вырастает цветок. Ваши действия?`,
      answers: [
        {
          action: `left`,
          title: `Вы побежите влево`,
          result: Result.DIE
        },
        {
          action: `right`,
          title: `Вы побежите вправо`,
          result: Result.DIE
        },
        {
          action: `1`,
          title: `Конечно же съесть его!`,
          result: Result.WIN
        }
      ]
    }
  };

  class GameOverView extends AbstractView {
    constructor(game) {
      super();
      this.game = game;
    }

    get template() {
      return `
<div>
<div class="end">
  <p>Вы погибли =(!</p>
  <p>Продолжить с последнего уровня?</p>
  <div class="repeat"><span class="repeat-action">Да</span>|<span class="repeat-action">Не</span></div>
</div>
</div>`;
    }

    bind() {
      const repeatAction = this.element.querySelector(`.repeat-action`);
      repeatAction.addEventListener(`click`, () => {
        if (this.game.lives) {
          this.onRepeat();
        }
      });
    }

    onRepeat() { }
  }

  /* eslint-disable object-curly-spacing */


  const template$1 = `<div class="end">
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


  var scoreboard = render(template$1);

  /* eslint-disable object-curly-spacing */

  const ONE_SECOND = 1000; // 1000ms = 1s
  const gameContainerElement = render(``);
  const headerElement = render(``);
  const levelElement = render(``);

  // init game content
  gameContainerElement.appendChild(headerElement);
  gameContainerElement.appendChild(levelElement);
  gameContainerElement.appendChild(footer);

  let game;

  const tick = () => {
    game = Object.assign({}, game, {
      time: game.time + 1
    });
    updateHeader(game);
  };

  let timer;

  const startTimer = () => {
    timer = setTimeout(() => {
      tick();
      startTimer();
    }, ONE_SECOND);
  };

  const stopTimer = () => {
    clearTimeout(timer);
  };

  const getLevel = (state) => QUEST[`level-${state.level}`];

  const updateView = (container, view) => {
    container.innerHTML = ``;
    container.appendChild(view.element);
  };

  const showGameOver = (state) => {
    // const view = new GameOverView(getLevel(game));
    const view = new GameOverView(game);
    view.onRepeat = () => updateGame(state);
    updateView(levelElement, view);
  };

  const answerHandler = (answer) => {
    stopTimer();
    switch (answer.result) {
      case Result.NEXT_LEVEL:
        game = changeLevel(game, game.level + 1);
        updateGame(game);
        startTimer();
        break;
      case Result.DIE:
        game = die(game);
        showGameOver(game);
        break;
      case Result.WIN:
        changeScreen(scoreboard);
        break;
      case Result.NOOP:
        // just do nothing
        break;
      default:
        throw new Error(`Unknown result: ${answer.result}`);
    }
  };

  const updateHeader = (state) => {
    updateView(headerElement, new HeaderView(state));
  };

  const updateGame = (state) => {
    updateHeader(game);
    const levelView = new LevelView(getLevel(game));
    levelView.onAnswer = answerHandler;
    updateView(levelElement, levelView);
    levelView.focus();
  };


  const startGame = () => {
    game = Object.assign({}, INITIAL_GAME);

    updateGame(game);
    changeScreen(gameContainerElement);
    startTimer();
  };

  /* eslint-disable object-curly-spacing */


  const template$2 = `<div class="end">
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

  const element = render(template$2);

  const agreeButton = element.querySelector(`.repeat-action`);

  agreeButton.addEventListener(`click`, () => {
    startGame();
  });

  changeScreen(element);

}());

//# sourceMappingURL=main.js.map
