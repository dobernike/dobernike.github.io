import { render } from './util.js';
import { initialState } from './data/data.js';

const headerTemplate = (state) => `<header class="header">
<div>Мир: ${state.level}</div>
<div>Жизни:
${new Array(3 - state.lives)
    .fill(`<span class="heart__empty">♡</span>`).join(``)}
${new Array(state.lives)
    .fill(`<span class="heart__full">♥</span>`).join(``)}
</div>
<div>Время: ${state.time}</div>
</header>`;

export default render(headerTemplate(initialState));
