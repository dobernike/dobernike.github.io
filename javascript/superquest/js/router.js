/* eslint-disable object-curly-spacing */
import WelcomeScreen from './view/welcome-screen.js';
import GameScreen from './game-screen.js';
import QuestModel from './model/quest-model.js';
import ScoreboardView from './view/scoreboard-view.js';
import { changeScreen } from './util.js';


export default class Router {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    changeScreen(welcome.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new QuestModel(playerName));
    changeScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(model) {
    const statistics = new ScoreboardView(model);
    changeScreen(statistics.element);
  }

}
