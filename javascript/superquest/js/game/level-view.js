/* eslint-disable object-curly-spacing */
import AbstractView from '../view/abstract-view.js';
import { Result } from '../data/quest.js';
import { DEBUG } from '../settings.js';

const ENTER_KEY_CODE = 13;
const DEBUG_STYLE = `style="color:red;"`;

export default class LevelView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `<div class="quest">
    <p class="text">${this.level.text}</p>

    <ul class="answers">
    ${this.level.answers.map((it) => `<li class="answer" ${DEBUG && it.result > Result.DIE ? DEBUG_STYLE : ``}>${it.action.toUpperCase()}. ${it.title}</li>`).join(``)}
    </ul>
    <input type="text">
  </div>`;
  }

  bind() {
    const answersElement = this.element.querySelector(`.answers`);

    const answersElements = Array.from(answersElement.children);

    answersElement.addEventListener(`click`, (evt) => {
      const answerIndex = answersElements.indexOf(evt.target);
      const answer = this.level.answers[answerIndex];
      if (answer) {
        this.onAnswer(answer);

      }
    });

    this._answerInput = this.element.querySelector(`input`);
    this._answerInput.addEventListener(`keydown`, ({ keyCode }) => {
      if (keyCode === ENTER_KEY_CODE) {
        const current = this.level;
        const { value = `` } = this._answerInput;
        const userAnswer = value.toUpperCase();
        for (const answer of current.answers) {
          if (userAnswer === answer.action.toUpperCase()) {
            this.onAnswer(answer);
          }
        }
      }
    });
  }

  onAnswer() { }

  focus() {
    this._answerInput.focus();
  }
}

