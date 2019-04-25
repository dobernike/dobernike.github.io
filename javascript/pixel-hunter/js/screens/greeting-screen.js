/* eslint-disable object-curly-spacing */
import GreetingView from '../view/greeting-view.js';
import { changeScreen } from '../utils/util.js';
import RulesScreen from './rules-screen.js';
import IntroScreen from './intro-screen.js';


export default class GreetingScreen {
  constructor() {
    this.root = new GreetingView();
    this.onAsteriskClick();
    this.onContiueClick();
  }

  get element() {
    return this.root.element;
  }

  onAsteriskClick() {
    this.root.onAsteriskClick = () => changeScreen(new IntroScreen().element);
  }

  onContiueClick() {
    this.root.onContiueClick = () => changeScreen(new RulesScreen().element);
  }
}
