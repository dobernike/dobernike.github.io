/* eslint-disable object-curly-spacing */
import RulesView from '../view/rules-view';
import { changeScreen } from '../utils/util';
import GreetingScreen from './greeting-screen';
import Application from '../application';


export default class RulesScreen {
  root: any = new RulesView();
  input: any = this.root.element.querySelector(`input`);

  constructor() {
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
      Application.showGame(this.input.value);
    };
  }
}
