import AbstractView from './abstract-view.js';
import HeaderView from './header-view.js';


const header = new HeaderView();


export default class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `${header.template}
  <section class="rules">
  <h2 class="rules__title">Правила</h2>
  <ul class="rules__description">
    <li>Угадай 10 раз для каждого изображения фото
      <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
      <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
    <li>Фотографиями или рисунками могут быть оба изображения.</li>
    <li>На каждую попытку отводится 30 секунд.</li>
    <li>Ошибиться можно не более 3 раз.</li>
  </ul>
  <p class="rules__ready">Готовы?</p>
  <form class="rules__form">
    <input class="rules__input" type="text" placeholder="Ваше Имя">
    <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>
  </section>`;
  }

  bind() {
    // Вызывает метод bind класса HeaderView, который по нажатию на кнопку back вызывает метод onClick() этого класса
    header.bind(this);

    const rulesInput = this.element.querySelector(`.rules__input`);
    const rulesButton = this.element.querySelector(`.rules__button`);
    rulesInput.addEventListener(`input`, () => {
      if (rulesInput.value !== ``) {
        rulesButton.disabled = false;
      } else {
        rulesButton.disabled = true;
      }
    });

    const rulesForm = this.element.querySelector(`.rules__form`);
    rulesForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.onSubmit();
      // changeScreen(game);
      // gameScreen(levels[`double`], INITIAL_GAME);
    });
  }

  onClick() { }

  onSubmit() { }

}
