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

  class LevelView extends AbstractView {
    constructor(level) {
      super();
      this.level = level;
    }

    get template() {
      return `<div class="quest">
    <p class="text">${this.level.text}</p>

    <ul class="answers">
    ${this.level.answers.map((it) => `<li class="answer" ${``}>${it.action.toUpperCase()}. ${it.title}</li>`).join(``)}
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
      this.content = new LevelView(this.model.getCurrentLevel());
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


  class QuestModel {
    constructor(data, playerName) {
      this.data = data;
      this.playerName = playerName;
      this.restart();
    }

    get state() {
      return Object.freeze(this._state);
    }

    hasNextLevel() {
      return this.getLevel(this._state.level + 1) !== void 0;
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

    getLevel(state) {
      return this.data[`level-${state.level}`];
    }

    getCurrentLevel() {
      return this.getLevel(this._state);
    }

    tick() {
      this._state = tick(this._state);
    }
  }

  /* eslint-disable object-curly-spacing */

  class ScoreBoardView extends AbstractView {
    constructor(model) {
      super();
      this.playerName = model.playerName;
      this.stats = model.state;
    }

    get template() {
      return `<div class="end">
    <p>Ну что ж, ${this.playerName}?! Вот и закончились твои приключения =(<br>
      А вот немного статистики о тебе: <br>
      Прошел за: ${this.stats.time}<br>
      Осталось жизней: ${this.stats.lives}<br>
      Дошел до уровня: ${this.stats.level}<br>
      <p>Начнем по новой?</p>
      <div class="repeat"><span class="repeat-action">Да</span></div>
    </div>`;
    }

    bind() {
      this.element.querySelector(`.repeat-action`).onclick = (evt) => {
        evt.preventDefault();

        Router.showGame();
      };
    }
  }

  const mainElement = document.querySelector(`#main`);

  const changeScreen = (element) => {
    mainElement.innerHTML = ``;
    mainElement.appendChild(element);
  };

  class SplashScreen extends AbstractView {
    constructor() {
      super();
      this.cursor = 0;
      this.symbolsSeq = `/-\\|`;
    }

    get template() {
      return `<div></div>`;
    }

    start() {
      this.cursor = ++this.cursor >= this.symbolsSeq.length ? 0 : this.cursor;
      this.element.textContent = this.symbolsSeq[this.cursor];
      this.timeout = setTimeout(() => this.start(), 50);
    }

    stop() {
      clearTimeout(this.timeout);
    }
  }

  class ErrorScreen extends AbstractView {

    constructor(error) {
      super();
      this.error = error;
    }

    get template() {
      return `<div class="end">
<p>Произошла ошибка: ${this.error.message}</p>
</div>`;
    }

  }

  /* eslint-disable quote-props */

  const Server2ResultMapper = {
    'die': Result.DIE,
    'win': Result.WIN,
    'next': Result.NEXT_LEVEL
  };

  const preprocessAnswers = (answers) => answers.map((answer) => {
    const [action, title] = answer.action.split(`.`);
    return {
      action: action.toLowerCase(),
      title: title.trim(),
      'result': Server2ResultMapper[answer.result]
    };
  });

  const adaptServerData = (data) => {
    for (const level of Object.values(data)) {
      level.answers = preprocessAnswers(level.answers);
    }
    return data;
  };

  /* eslint-disable no-return-assign */


  const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  let questData;
  class Router {

    static start() {
      const splash = new SplashScreen();
      changeScreen(splash.element);
      splash.start();
      window.fetch(`https://es.dump.academy/text-quest/quest`).
        then(checkStatus).
        then((response) => response.json()).
        then((data) => questData = adaptServerData(data)).
        then((response) => Router.showStats(new QuestModel(questData), `test`)).
        catch(Router.showError).
        then(() => splash.stop());
    }

    static showWelcome() {
      const welcome = new WelcomeScreen();
      changeScreen(welcome.element);
    }

    static showGame(playerName) {
      const gameScreen = new GameScreen(new QuestModel(questData, playerName));
      changeScreen(gameScreen.element);
      gameScreen.startGame();
    }

    static showStats(model) {
      const statistics = new ScoreBoardView(model);
      changeScreen(statistics.element);
    }

    static showError(error) {
      const errorScreen = new ErrorScreen(error);
      changeScreen(errorScreen.element);
    }

  }

  const router = new Router();
  // router.constructor.showWelcome();
  router.constructor.start();

}());

//# sourceMappingURL=main.js.map
