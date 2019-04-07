/* eslint-disable object-curly-spacing */
import GreetingView from '../view/greeting-view.js';
import { changeScreen } from '../utils/util.js';
import rules from './rules.js';
import intro from './intro.js';


export default () => {
  const greeting = new GreetingView();

  greeting.onAsteriskClick = () => changeScreen(intro().element);

  greeting.onContiueClick = () => changeScreen(rules);

  return greeting;
};
