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

  /* eslint-disable object-curly-spacing */
  const template = `<div>
<div class="result"></div>
<small>Для справки введите <i>help</i></small>
</div>`;


  var footer = render(template);

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
      return render(this.template);
    }

    bind(element) {
      // bind handlers if required
    }
  }

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

    onAnswer(answer) { }

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
  }

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
          title: `Вы прыгните вверх`,
          result: Result.DIE
        }
      ]
    }
  };

  /* eslint-disable object-curly-spacing */

  /* eslint-disable object-curly-spacing */


  // const ENTER_KEY_CODE = 13; //

  const gameContainerElement = render(``);
  const headerElement = render(``);
  const levelElement = render(``);

  // init game content
  gameContainerElement.appendChild(headerElement);
  gameContainerElement.appendChild(levelElement);
  gameContainerElement.appendChild(footer);

  const getLevel = (state) => QUEST[`level-${state.level}`];

  const updateGame = (state) => {
    const currentLevel = getLevel(state);
    const levelViewElement = new LevelView(currentLevel).element;

    headerElement.innerHTML = header(state);
    levelElement.innerHTML = ``;
    levelElement.appendChild(levelViewElement);

    // const answersElement = levelElement.querySelector(`.answers`);

    // const answersElements = Array.from(answersElement.children);

    // answersElement.addEventListener(`click`, (evt) => {
    //   const answerIndex = answersElements.indexOf(evt.target);
    //   const answer = currentLevel.answers[answerIndex];
    //   if (answer) {
    //     onAnswer(answer);
    //   }
    // });

  };

  // levelElement.addEventListener(`keydown`, ({ keyCode }) => {
  //   if (keyCode === ENTER_KEY_CODE) {
  //     const current = getLevel(game);
  //     const { value = `` } = levelElement.querySelector(`input`);
  //     const userAnswer = value.toUpperCase();

  //     for (const answer of current.answers) {
  //       if (userAnswer === answer.action.toUpperCase()) {
  //         onAnswer(answer);
  //         updateGame(game);
  //       }
  //     }
  //   }
  // });

  let game; //

  const startGame = () => {
    game = Object.assign({}, INITIAL_GAME);

    updateGame(game);
    changeScreen(gameContainerElement);
  };

  /* eslint-disable object-curly-spacing */


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
    startGame();
  });

  changeScreen(element);

}());

//# sourceMappingURL=main.js.map
