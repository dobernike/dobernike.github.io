/* eslint-disable object-curly-spacing */
import { render, changeScreen } from './util.js';
import renderHeader from './game/header.js';
import footer from './game/footer.js';
import renderLevel from './game/level.js';
import { INITIAL_GAME, changeLevel, canContinue, die, Result } from './data/quest.js';
import QUEST from './data/quest-data.js';
import showGameOver from './game/gameover-screen.js';


const ENTER_KEY_CODE = 13; //

const gameContainerElement = render(``);
const headerElement = render(``);
const levelElement = render(``);

// init game content
gameContainerElement.appendChild(headerElement);
gameContainerElement.appendChild(levelElement);
gameContainerElement.appendChild(footer);

const getLevel = (state) => QUEST[`level-${state.level}`];

const updateGame = (state) => {
  headerElement.innerHTML = renderHeader(state);
  levelElement.innerHTML = renderLevel(getLevel(state));
};

levelElement.addEventListener(`keydown`, ({ keyCode }) => {
  if (keyCode === ENTER_KEY_CODE) {
    const current = getLevel(game);
    const { value = `` } = levelElement.querySelector(`input`);
    const userAnswer = value.toUpperCase();

    for (const answer of current.answers) {
      if (userAnswer === answer.action.toUpperCase()) {
        switch (answer.result) {
          case Result.NEXT_LEVEL:
            game = changeLevel(game, game.level + 1);
            updateGame(game);
            break;
          case Result.DIE:
            game = die(game);
            if (!canContinue(game)) {
              showGameOver(game);
            }
            break;
          case Result.WIN:
            showGameOver(game);
            break;
          case Result.NOOP:
            // just do nothing
            break;
          default:
            throw new Error(`Unknown result:`);
        }
        updateGame(game);
      }
    }
  }
});

let game; //

const startGame = () => {
  game = Object.assign({}, INITIAL_GAME);

  updateGame(game);
  changeScreen(gameContainerElement);
};


export default startGame;
