/* eslint-disable no-return-assign */
/* eslint-disable object-curly-spacing */
import WelcomeScreen from './view/welcome-screen.js';
import GameScreen from './game-screen.js';
import QuestModel from './model/quest-model.js';
import ScoreboardView from './view/scoreboard-view.js';
import { changeScreen } from './util.js';
import SplashScreen from './splash-screen.js';
import ErrorScreen from './error-screen.js';
import Loader from './loader.js';

let questData;
export default class Router {

  static start() {
    Router.load().catch(Router.showError);
  }

  // Router.showStats(new QuestModel(questData, `tester`))

  static async load() {
    const splash = new SplashScreen();
    changeScreen(splash.element);
    splash.start();
    try {
      questData = await Loader.loadData();
      Router.showWelcome();
    } finally {
      splash.stop();
    }
  }

  static showWelcome() {
    const welcome = new WelcomeScreen();
    changeScreen(welcome.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new QuestModel(questData, playerName));
    changeScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static async showStats(model) {
    const playerName = model.playerName;
    const scoreBoard = new ScoreboardView(playerName);
    changeScreen(scoreBoard.element);
    try {
      await Loader.saveResults(model.state, playerName);
      scoreBoard.showScores(await Loader.loadResults(playerName), playerName);
    } catch (e) {
      Router.showError(e);
    }
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    changeScreen(errorScreen.element);
  }

}
