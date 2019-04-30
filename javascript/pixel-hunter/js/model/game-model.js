/* eslint-disable object-curly-spacing */
import { INITIAL_GAME } from '../data/data.js';
import changeLevel from '../data/change-level.js';


export default class GameModel {
  constructor(gameData, playerName) {
    this.data = gameData;
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  nextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }

  restart() {
    this._state = INITIAL_GAME;
  }

}
