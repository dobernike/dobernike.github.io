/* eslint-disable object-curly-spacing */
import { INITIAL_GAME, changeLevel, die, tick } from '../data/quest.js';


export default class QuestModel {
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
