import AbstractView from './abstract-view.js';


export default class GameOverView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    return `
<div>
<div class="end">
  <p>Вы погибли =(!</p>
  <p>Продолжить с последнего уровня?</p>
  <div class="repeat"><span class="repeat-action">Да</span>|<span class="repeat-action">Не</span></div>
</div>
</div>`;
  }

  bind() {
    const repeatAction = this.element.querySelector(`.repeat-action`);
    repeatAction.addEventListener(`click`, () => {
      this.onRepeat();
    });
  }

  onRepeat() { }
}
