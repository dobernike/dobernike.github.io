/* eslint-disable object-curly-spacing */
import RulesView from '../view/rules-view.js';
import { changeScreen } from '../utils/util.js';
import GreetingScreen from './greeting-screen.js';
import Application from '../application.js';


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
      new Application().constructor.showGame(this.input.value);
    };
  }
}
