/* eslint-disable object-curly-spacing */
import { INITIAL_GAME } from '../data/data';
import changeLevel from '../data/change-level';


export default class GameModel {
  data: any;
  playerName: any;

  private _state: any;

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
