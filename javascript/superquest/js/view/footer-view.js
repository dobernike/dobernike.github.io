import AbstractView from './abstract-view.js';

export default class FooterView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div>
<div class="result"></div>
<small>Для справки введите <i>help</i></small>
</div>`;
  }
}
