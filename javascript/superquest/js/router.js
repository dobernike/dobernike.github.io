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
    const splash = new SplashScreen();
    changeScreen(splash.element);
    splash.start();
    Loader.loadData().
      then((data) => questData = data).
      then(() => Router.showWelcome(questData)).
      catch(Router.showError).
      then(() => splash.stop());
  }

  // Router.showStats(new QuestModel(questData, `tester`))
  static showWelcome(data) {
    questData = data;
    const welcome = new WelcomeScreen();
    changeScreen(welcome.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new QuestModel(questData, playerName));
    changeScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(model) {
    const playerName = model.playerName;
    const scoreBoard = new ScoreboardView(playerName);
    changeScreen(scoreBoard.element);
    Loader.saveResults(model.state, playerName).
      then(() => Loader.loadResults(playerName)).then((data) => scoreBoard.showScores(data, playerName)).
      catch(Router.showError);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    changeScreen(errorScreen.element);
  }

}
