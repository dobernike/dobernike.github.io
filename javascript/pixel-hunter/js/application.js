/* eslint-disable no-return-assign */
/* eslint-disable object-curly-spacing */
import IntroScreen from './screens/intro-screen.js';
import { changeScreen } from './utils/util.js';
import GameModel from './model/game-model.js';
import GameScreen from './screens/game-screen.js';
import StatsScreen from './screens/stats-screen.js';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

let gameData;
export default class Application {

  static start() {
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`).
      then(checkStatus).then(toJSON).
      then((data) => gameData = data).
      then(() => Application.showGame(`user`)).
      catch(Application.showError);
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
  }

}
