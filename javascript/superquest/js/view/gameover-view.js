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
    console.log(`bind`);
    const repeatAction = this.element.querySelector(`.repeat-action`);
    console.log(repeatAction)
    repeatAction.addEventListener(`click`, () => {
      console.log(this.game);
      if (this.game.lives) {
        console.log(`s`)
        this.onRepeat();
      }
    });
  }

  onRepeat() { }
}
