/* eslint-disable object-curly-spacing */
import IntroScreen from './screens/intro-screen.js';
import { changeScreen } from './utils/util.js';
import GameModel from './model/game-model.js';
import GameScreen from './screens/game-screen.js';
import StatsScreen from './screens/stats-screen.js';


export default class Application {

  static showWelcome() {
    const welcome = new IntroScreen();
    changeScreen(welcome.element);
  }

  static showGame(userName) {
    const model = new GameModel(userName);
    const gameScreen = new GameScreen(model);
    changeScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(stats) {
    const statistics = new StatsScreen(stats);
    changeScreen(statistics.element);
  }

}
