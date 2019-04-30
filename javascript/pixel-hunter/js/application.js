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
    const splash = new SplashScreen();
    changeScreen(splash.element);
    splash.start();
    Loader.loadData().
      then((data) => gameData = data).
      then(() => Application.showWelcome(gameData)).
      catch((error) => {
        throw new Error(error.statusText);
      }).
      then(() => splash.stop());
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

  static showStats(stats) {
    const statistics = new StatsScreen(stats);
    changeScreen(statistics.element);
    Loader.saveResults(stats).
      then(() => Loader.loadResults()).then((data) => statistics.showScores(data)).
      catch((error) => {
        throw new Error(error.statusText);
      });
  }

}


// static start() {
//   const splash = new SplashScreen();
//   changeScreen(splash.element);
//   splash.start();
//   Loader.loadData().
//     then((data) => questData = data).
//     then(() => Router.showWelcome(questData)).
//     catch(Router.showError).
//     then(() => splash.stop());
// }

// // Router.showStats(new QuestModel(questData, `tester`))
// static showWelcome(data) {
//   questData = data;
//   const welcome = new WelcomeScreen();
//   changeScreen(welcome.element);
// }

// static showGame(playerName) {
//   const gameScreen = new GameScreen(new QuestModel(questData, playerName));
//   changeScreen(gameScreen.element);
//   gameScreen.startGame();
// }

// static showStats(model) {
//   const playerName = model.playerName;
//   const scoreBoard = new ScoreboardView(playerName);
//   changeScreen(scoreBoard.element);
//   Loader.saveResults(model.state, playerName).
//     then(() => Loader.loadResults(playerName)).then((data) => scoreBoard.showScores(data, playerName)).
//     catch(Router.showError);
// }


