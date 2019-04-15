/* eslint-disable object-curly-spacing */
import GameView from '../view/game-view.js';

import { renderStats } from './stats.js';
import { changeScreen } from '../utils/util.js';
import greeting from './greeting.js';
import { levels, statsAnswers } from '../data/data.js';
import changeLevel from '../data/change-level.js';
import countLives from '../data/count-lives.js';


export let currentLevel = 0;
export let copyStatsAnswers = Object.assign({}, statsAnswers);

export const gameScreen = (gamelevels, state) => {

  const gameView = new GameView(gamelevels, copyStatsAnswers, levels, currentLevel, state);

  if (state.level === 10 || countLives(copyStatsAnswers) < 1) {
    changeScreen(renderStats(copyStatsAnswers).element);
    return;
  }
  gameView.onClick = () => {
    backButton();
  };

  gameView.onCheck = (it) => {
    gameScreen(levels[it], changeLevel(state, currentLevel += 1));
  };

  changeScreen(gameView.element);
};

export const backButton = () => {
  currentLevel = 0;
  copyStatsAnswers = Object.assign({}, statsAnswers);
  changeScreen(greeting().element);
};
