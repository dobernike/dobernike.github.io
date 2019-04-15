/* eslint-disable object-curly-spacing */
import IntroView from '../view/intro-view.js';
import { changeScreen } from '../utils/util.js';
import greeting from './greeting.js';

export default () => {
  const intro = new IntroView();
  intro.onClick = () => changeScreen(greeting().element);

  return intro;
};
