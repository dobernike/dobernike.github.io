/* eslint-disable object-curly-spacing */
import IntroView from '../view/intro-view.js';
import { changeScreen } from '../utils/util.js';
import GreetingScreen from './greeting-screen.js';

export default class IntroScreen {
  constructor() {
    this.root = new IntroView();
    this.onClick();
  }

  get element() {
    return this.root.element;
  }

  onClick() {
    this.root.onClick = () => changeScreen(new GreetingScreen().element);
  }

}

// export default () => {
//   const intro = new IntroView();
//   intro.onClick = () => changeScreen(greeting().element);

//   return intro;
// };
