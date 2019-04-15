/* eslint-disable object-curly-spacing */
import StatsView from '../view/stats-view.js';
import { backButton } from './game-screen.js';


export const statistic = (answers) => `
<ul class="stats">
          <li class="stats__result stats__result--${answers[`level-0`]}"></li>
          <li class="stats__result stats__result--${answers[`level-1`]}"></li>
          <li class="stats__result stats__result--${answers[`level-2`]}"></li>
          <li class="stats__result stats__result--${answers[`level-3`]}"></li>
          <li class="stats__result stats__result--${answers[`level-4`]}"></li>
          <li class="stats__result stats__result--${answers[`level-5`]}"></li>
          <li class="stats__result stats__result--${answers[`level-6`]}"></li>
          <li class="stats__result stats__result--${answers[`level-7`]}"></li>
          <li class="stats__result stats__result--${answers[`level-8`]}"></li>
          <li class="stats__result stats__result--${answers[`level-9`]}"></li>
        </ul>`;

export const renderStats = (arrayStats) => {
  const stats = new StatsView(arrayStats);

  stats.onClick = () => {
    backButton();
  };

  return stats;
};
