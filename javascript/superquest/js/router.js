import WelcomeScreen from './view/welcome-screen.js';
import GameScreen from './game-screen.js';
import QuestModel from './model/quest-model.js';
// import StatsScreen from './stats-screen.js';

const main = document.getElementById(`main`);
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

export default class Router {

  static showWelcome() {
    const welcome = new WelcomeScreen();
    changeView(welcome.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new QuestModel(playerName));
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(model) {
    const statistics = new StatsScreen(model);
    changeView(statistics.element);
  }

}

// Router.showWelcome();
