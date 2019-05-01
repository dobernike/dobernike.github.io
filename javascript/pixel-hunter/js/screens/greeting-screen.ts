/* eslint-disable object-curly-spacing */
import GreetingView from '../view/greeting-view';
import { changeScreen } from '../utils/util';
import RulesScreen from './rules-screen';
import IntroScreen from './intro-screen';


export default class GreetingScreen {
  root: any = new GreetingView();

  constructor() {
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
