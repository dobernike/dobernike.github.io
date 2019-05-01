/* eslint-disable object-curly-spacing */
import IntroView from '../view/intro-view';
import { changeScreen } from '../utils/util';
import GreetingScreen from './greeting-screen';


export default class IntroScreen {
  root: any = new IntroView();

  constructor() {
    this.onClick();
  }

  get element() {
    return this.root.element;
  }

  onClick() {
    this.root.onClick = () => changeScreen(new GreetingScreen().element);
  }
}
