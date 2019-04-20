import AbstractView from './abstract-view.js';


export default class GameOverView extends AbstractView {
  constructor(win, canContinue) {
    super();
    this.win = win;
    this.canContinue = canContinue;
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
    const repeatActions = this.element.querySelectorAll(`.repeat-action`);

    repeatActions[0].addEventListener(`click`, () => {
      if (this.canContinue) {
        this.onRestart();
      }
    });

    repeatActions[1].addEventListener(`click`, () => {
      this.onExit();
    });
  }

  onRestart() { }

  onExit() { }
}
