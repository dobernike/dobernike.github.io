/* eslint-disable object-curly-spacing */
import RulesView from '../view/rules-view.js';
import { changeScreen } from '../utils/util.js';
import greeting from './greeting-screen.js';
import { GameScreen } from './game-screen.js';
import GameModel from '../model/game-model.js';


export default () => {
  const rules = new RulesView();

  rules.onClick = () => changeScreen(greeting().element);

  const input = rules.element.querySelector(`input`);

  rules.onSubmit = () => {
    const gameScreen = new GameScreen(new GameModel(input.value));
    changeScreen(gameScreen.element);
  };
  return rules;
};
