/* eslint-disable object-curly-spacing */
import RulesView from '../view/rules-view.js';
import { changeScreen } from '../utils/util.js';
import greeting from './greeting.js';
import { levels, INITIAL_GAME } from '../data/data.js';
import { gameScreen } from './game-screen.js';


export default () => {
  const rules = new RulesView();

  rules.onClick = () => changeScreen(greeting().element);

  rules.onSubmit = () => gameScreen(levels[`double`], INITIAL_GAME);

  return rules;
};
