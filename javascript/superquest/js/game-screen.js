/* eslint-disable object-curly-spacing */
import { render, changeScreen } from './util.js';
import HeaderView from './game/header-view.js';
import LevelView from './game/level-view.js';
import footer from './game/footer.js';
import { Result, INITIAL_GAME, changeLevel, canContinue, die } from './data/quest.js';
import QUEST from './data/quest-data.js';
import GameOverView from './game/gameover-view.js';
import scoreboard from './game/scoreboard-screen.js';

const gameContainerElement = render(``);
const headerElement = render(``);
const levelElement = render(``);

// init game content
gameContainerElement.appendChild(headerElement);
gameContainerElement.appendChild(levelElement);
gameContainerElement.appendChild(footer);

let game;

const getLevel = (state) => QUEST[`level-${state.level}`];

const updateView = (container, view) => {
  container.innerHTML = ``;
  container.appendChild(view.element);
};

const showGameOver = (state) => {
  // const view = new GameOverView(getLevel(game));
  const view = new GameOverView(getLevel(game));
  view.onRepeat = () => updateGame(state);
  updateView(levelElement, view);
};

const answerHandler = (answer) => {
  switch (answer.result) {
    case Result.NEXT_LEVEL:
      game = changeLevel(game, game.level + 1);
      updateGame(game);
      break;
    case Result.DIE:
      game = die(game);
      updateGame(game);
      if (!canContinue(game)) {
        showGameOver(game);
      }
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

const updateGame = (state) => {
  updateView(headerElement, new HeaderView(state));
  const levelView = new LevelView(getLevel(game));
  levelView.onAnswer = answerHandler;
  updateView(levelElement, levelView);
  levelView.focus();
};


const startGame = () => {
  game = Object.assign({}, INITIAL_GAME);

  updateGame(game);
  changeScreen(gameContainerElement);
};


export default startGame;
