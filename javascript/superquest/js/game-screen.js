/* eslint-disable object-curly-spacing */
import { render, changeScreen } from './util.js';
import renderHeader from './game/header.js'; // ./game/header.js
import footer from './game/footer.js';
import renderLevel from './game/level.js';
import { initialState } from './data/data.js'; //
import { INITIAL_GAME, changeLevel, canContinue, die } from './data/quest.js';
import QUEST from './data/quest-data.js';
import showGameOver from './game/gameover-screen.js';

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
    headerElement.innerHTML = renderHeader(state);
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

export default () => startGame(initialState);
