/* eslint-disable object-curly-spacing */
import { INITIAL_GAME, changeLevel, die, tick } from '../data/quest.js';

import QUEST from '../data/quest-data.js';

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
    this._state = die(this.tates);
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

export default QuestModel;
