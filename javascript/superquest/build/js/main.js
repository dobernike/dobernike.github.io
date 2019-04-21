(function () {
  'use strict';

  const render = (html) => {
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
      return render(this.template);
    }

    bind() {
      // bind handlers if required
    }
  }

  /* eslint-disable object-curly-spacing */
  // import { render } from '../util.js';
  // import GameScreen from './game-screen.js';
  // import QuestModel from './model/quest-model.js';

  class WelcomeScreen extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `<div class="end">
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
    }

    bind() {
      const agreeButton = this.element.querySelector(`.repeat-action`);
      const playerName = this.element.querySelector(`input`);
      agreeButton.addEventListener(`click`, () => {
        // console.log(playerName.value);
        new Router().constructor.showGame(playerName.value);
        // const gameModel = new QuestModel(inputValue);
        // const gameScreen = new GameScreen(gameModel);

        // changeView(gameScreen.element);
        // gameScreen.startGame();
      });
    }
  }

  // const template =

  // const element = render(template);

  // const input = element.querySelector(`input`);

  // const agreeButton = element.querySelector(`.repeat-action`);
  // agreeButton.addEventListener(`click`, () => {
  // const inputValue = input.value();
  // const gameModel = new QuestModel(inputValue);
  // const gameScreen = new GameScreen(gameModel);
  // changeView(gameScreen.element);
  // gameScreen.startGame();
  // });


  // export default element;

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
    game = Object.assign({}, game, {
      lives: game.lives - 1
    });
    return game;
  };

  const tick = (state) => {
    state = Object.assign({}, state, {
      time: state.time + 1
    });
    return state;
  };

  class FooterView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `<div>
<div class="result"></div>
<small>Для справки введите <i>help</i></small>
</div>`;
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
  const DEBUG_STYLE = `style="color:red;"`;

  class LevelView extends AbstractView {
    constructor(level) {
      super();
      this.level = level;
    }

    get template() {
      return `<div class="quest">
    <p class="text">${this.level.text}</p>

    <ul class="answers">
    ${this.level.answers.map((it) => `<li class="answer" ${it.result > Result.DIE ? DEBUG_STYLE : ``}>${it.action.toUpperCase()}. ${it.title}</li>`).join(``)}
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

  class GameOverView extends AbstractView {
    constructor(win, canContinue) {
      super();
      this.win = win;
      this.canContinue = canContinue;
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
      const repeatActions = this.element.querySelectorAll(`.repeat-action`);

      repeatActions[0].addEventListener(`click`, () => {
        if (this.canContinue) {
          this.onRestart();
        }
      });

      repeatActions[1].addEventListener(`click`, () => {
        this.onExit();
      });
    }

    onRestart() { }

    onExit() { }
  }

  /* eslint-disable object-curly-spacing */


  class GameScreen {
    constructor(model) {
      // Инициализация и настройка игры
      this.model = model;
      this.header = new HeaderView(this.model.state);
      // console.log(this.model.state);
      this.content = new LevelView(this.model.getCurrentLevel());
      // console.log(this.model.getCurrentLevel);
      this.root = document.createElement(`div`);
      this.root.appendChild(this.header.element);
      this.root.appendChild(this.content.element);
      this.root.appendChild(new FooterView().element);

      this._timer = null;
    }

    get element() {
      return this.root;
    }

    stopGame() {
      // Остановка игры
      clearInterval(this._timer);
    }

    _tick() {
      this.model.tick();
      this.updateHeader();
      this._timer = setTimeout(() => this._tick(), 1000);
    }

    startGame() {
      // Старт игры
      this.changeLevel();
      this._tick();
    }

    answer(answer) {
      // Обрабтка ответа пользователя
      this.stopGame();
      switch (answer.result) {
        case Result.NEXT_LEVEL:
          this.model.nextLevel();
          this.startGame();
          break;
        case Result.DIE:
          this.model.die();
          this.endGame(false, !(this.model.isDead()));
          break;
        case Result.WIN:
          this.endGame(true, false);
          break;
        default:
          throw new Error(`Unknown result: ${answer.result}`);
      }
    }

    restart() {
      // Продолжение или сброс игры
      if (this.model.isDead()) {
        this.model.restart();
      }
      this.startGame();
    }

    exit() {
      // Выход из игры
      new Router().constructor.showStats(this.model);
    }

    updateHeader() {
      // Обновление статистики игрока
      const header = new HeaderView(this.model.state);

      this.root.replaceChild(header.element, this.root.firstChild);
    }

    changeLevel() {
      // Обновление текущего уровня
      this.updateHeader();

      const level = new LevelView(this.model.getCurrentLevel());
      level.onAnswer = this.answer.bind(this);
      this._changeContentView(level);
      level.focus();
    }

    endGame(win, canContinue$$1) {
      // Проигрыш игрока
      const gameOver = new GameOverView(win, canContinue$$1);
      gameOver.onRestart = this.restart.bind(this);
      gameOver.onExit = this.exit.bind(this);

      this._changeContentView(gameOver);
      this.updateHeader();
    }

    _changeContentView(view) {
      // Вспомогательный внутренний метод
      this.root.replaceChild(view.element, this.content.element);
      this.content = view;
    }
  }

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

  /* eslint-disable object-curly-spacing */

  const getLevel = (state) => QUEST[`level-${state.level}`];

  class QuestModel {
    constructor(playerName) {
      this.playerName = playerName;
      this.restart();
    }

    get state() {
      return Object.freeze(this._state);
    }

    hasNextLevel() {
      return getLevel(this._state.level + 1) !== void 0;
    }

    nextLevel() {
      this._state = changeLevel(this._state, this._state.level + 1);
    }

    die() {
      this._state = die(this.state);
    }

    restart() {
      this._state = INITIAL_GAME;
    }

    isDead() {
      return this._state.lives <= 0;
    }

    getCurrentLevel() {
      return getLevel(this._state);
    }

    tick() {
      this._state = tick(this._state);
    }
  }

  /* eslint-disable object-curly-spacing */

  class ScoreboardView extends AbstractView {
    constructor(model) {
      super();
      this.model = model;
    }

    get template() {
      return `<div class="end">
    <div class="scoreboard">
      <h1>Мои лучшие результаты</h1>

      <table class="scores">
        <tbody>
          <tr>
            <td>
              <small>1.</small>
            </td>
            <td style="text-align: right;">${this.model.state.time} сек</td>
            <td>${this.model.playerName} ${`💗`.repeat(this.model.state.lives)}</td>
            <td>25.05.2018</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <div class="repeat"><span class="repeat-action">Сыграть заново</span>&nbsp;|&nbsp;<a class="repeat-action" href="https://google.com">Выйти</a>????</div>
    </div>`;
    }

    bind() {
      const repeat = this.element.querySelector(`.repeat-action`);

      repeat.addEventListener(`click`, () => {
        this.onRepeat();
      });
    }

    onRepeat() { }
  }

  const mainElement = document.querySelector(`#main`);

  const changeScreen = (element) => {
    mainElement.innerHTML = ``;
    mainElement.appendChild(element);
  };

  /* eslint-disable object-curly-spacing */


  class Router {

    static showWelcome() {
      const welcome = new WelcomeScreen();
      changeScreen(welcome.element);
    }

    static showGame(playerName) {
      const gameScreen = new GameScreen(new QuestModel(playerName));
      changeScreen(gameScreen.element);
      gameScreen.startGame();
    }

    static showStats(model) {
      const statistics = new ScoreboardView(model);
      statistics.onRepeat = () => this.showWelcome();
      changeScreen(statistics.element);
    }

  }

  const router = new Router();
  router.constructor.showWelcome();

}());

//# sourceMappingURL=main.js.map
