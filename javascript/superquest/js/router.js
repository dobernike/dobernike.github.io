/* eslint-disable no-return-assign */
/* eslint-disable object-curly-spacing */
import WelcomeScreen from './view/welcome-screen.js';
import GameScreen from './game-screen.js';
import QuestModel from './model/quest-model.js';
import ScoreboardView from './view/scoreboard-view.js';
import { changeScreen } from './util.js';
import SplashScreen from './splash-screen.js';
import ErrorScreen from './error-screen.js';
import { adaptServerData } from './data/data-adapter.js';


const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let questData;
export default class Router {

  static start() {
    const splash = new SplashScreen();
    changeScreen(splash.element);
    splash.start();
    window.fetch(`https://es.dump.academy/text-quest/quest`).
      then(checkStatus).
      then((response) => response.json()).
      then((data) => questData = adaptServerData(data)).
      then((response) => Router.showStats(new QuestModel(questData), `test`)).
      catch(Router.showError).
      then(() => splash.stop());
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

  static showStats(model) {
    const statistics = new ScoreboardView(model);
    changeScreen(statistics.element);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    changeScreen(errorScreen.element);
  }

}
