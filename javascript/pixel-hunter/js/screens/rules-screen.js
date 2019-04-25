/* eslint-disable object-curly-spacing */
import RulesView from '../view/rules-view.js';
import { changeScreen } from '../utils/util.js';
import GreetingScreen from './greeting-screen.js';
import { GameScreen } from './game-screen.js';
import GameModel from '../model/game-model.js';


export default class RulesScreen {
  constructor() {
    this.root = new RulesView();
    this.input = this.root.element.querySelector(`input`);
    this.onClick();
    this.onSubmit();
  }

  get element() {
    return this.root.element;
  }

  onClick() {
    this.root.onClick = () => changeScreen(new GreetingScreen().element);
  }

  onSubmit() {
    this.root.onSubmit = () => {
      const gameScreen = new GameScreen(new GameModel(this.input.value));
      changeScreen(gameScreen.element);
    };
  }
}
