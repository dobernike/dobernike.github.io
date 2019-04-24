/* eslint-disable object-curly-spacing */
import { INITIAL_GAME, tick } from '../data/data.js';
import changeLevel from '../data/change-level.js';


export default class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  // hasNextLevel() {
  //   return getLevel(this._state.level + 1) !== void 0;
  // }

  nextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }

  // die() {
  //   this._state = die(this.state);
  // }

  restart() {
    this._state = INITIAL_GAME;
  }

  // isDead() {
  //   return this._state.lives <= 0;
  // }

  // getCurrentLevel() {
  //   return getLevel(this._state);
  // }

  tick() {
    this._state = tick(this._state);
  }
}
