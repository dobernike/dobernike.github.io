/* eslint-disable object-curly-spacing */
import { render, changeScreen } from './util.js';
import renderHeader from './game/header.js'; // import HeaderView from './game/header-view.js';
import LevelView from './game/level-view.js';
import footer from './game/footer.js';
import { Result, INITIAL_GAME, changeLevel, canContinue, die } from './data/quest.js';
import QUEST from './data/quest-data.js';
// import GameOverView from './game/gameover-view.js';
// import scoreboard from './game/scoreboard-screen.js';

const gameContainerElement = render(``);
const headerElement = render(``);
const levelElement = render(``);

// init game content
gameContainerElement.appendChild(headerElement);
gameContainerElement.appendChild(levelElement);
gameContainerElement.appendChild(footer);

let game;

const getLevel = (state) => QUEST[`level-${state.level}`];

// const onAnswer = (answer) => {
//   switch (answer.result) {
//     case Result.NEXT_LEVEL:
//       game = changeLevel(game, game.level + 1);
//       updateGame(game);
//       break;
//     case Result.DIE:
//       game = die(game);
//       if (!canContinue(game)) {
//         showGameOver(game);
//       } else {
//         updateGame(game);
//       }
//       break;
//     case Result.WIN:
//       showGameOver(game);
//       break;
//     case Result.NOOP:
//       // just do nothing
//       break;
//     default:
//       throw new Error(`Unknown result:`);
//   }
// };

const updateGame = (state) => {
  const currentLevel = getLevel(state);
  const levelViewElement = new LevelView(currentLevel).element;

  headerElement.innerHTML = renderHeader(state);
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

const startGame = () => {
  game = Object.assign({}, INITIAL_GAME);

  updateGame(game);
  changeScreen(gameContainerElement);
};


export default startGame;
