/* eslint-disable no-return-assign */
/* eslint-disable object-curly-spacing */
import IntroScreen from './screens/intro-screen.js';
import { changeScreen } from './utils/util.js';
import GameModel from './model/game-model.js';
import GameScreen from './screens/game-screen.js';
import StatsScreen from './screens/stats-screen.js';
import SplashScreen from './screens/splash-screen.js';
import Loader from './utils/loader.js';


let gameData;
export default class Application {

  static start() {
    Application.load();
  }

  static async load() {
    const splash = new SplashScreen();
    changeScreen(splash.element);
    splash.start();
    try {
      gameData = await Loader.loadData();
      Application.showWelcome(gameData);
    } catch (error) {
      throw new Error(error.statusText);
    } finally {
      splash.stop();
    }
  }

  static showWelcome(data) {
    gameData = data;
    const welcome = new IntroScreen();
    changeScreen(welcome.element);
  }

  static showGame(userName) {
    const model = new GameModel(gameData, userName);
    const gameScreen = new GameScreen(model);
    changeScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static async showStats(stats) {
    const statistics = new StatsScreen(stats);
    changeScreen(statistics.element);
    // try {
    //   await Loader.saveResults(stats);
    //   statistics.showScores(await Loader.loadResults());
    // } catch (error) {
    //   throw new Error(error.statusText);
    // }
  }

}
