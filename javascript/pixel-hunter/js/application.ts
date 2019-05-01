/* eslint-disable no-return-assign */
/* eslint-disable object-curly-spacing */
import IntroScreen from './screens/intro-screen';
import { changeScreen } from './utils/util';
import GameModel from './model/game-model';
import GameScreen from './screens/game-screen';
import StatsScreen from './screens/stats-screen';
import SplashScreen from './screens/splash-screen';
import Loader from './utils/loader';


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
      Application.showWelcome();
    } catch (error) {
      throw new Error(error.statusText);
    } finally {
      splash.stop();
    }
  }

  static showWelcome() {
    const welcome = new IntroScreen();
    changeScreen(welcome.element);
  }

  static showGame(userName: any) {
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
