/* eslint-disable object-curly-spacing */
import StatsView from '../view/stats-view.js';
import Application from '../application.js';

export default class StatsScreen {
  constructor(stats) {
    this.root = new StatsView(stats);
    this.onClick();
  }

  get element() {
    return this.root.element;
  }

  onClick() {
    this.root.onClick = () => new Application().constructor.showWelcome();
  }
}
