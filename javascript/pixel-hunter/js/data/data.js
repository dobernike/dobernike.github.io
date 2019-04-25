/* eslint-disable object-curly-spacing */
import { paintings, photos } from './mock.js';


export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 0
});

export const levels = {
  'double': {
    type: `double`,
    question: {
      text: `Угадайте для каждого изображения фото или рисунок?`,
      imgSize: {
        width: 468,
        height: 458
      },
      answers: {
        question1: {
          answer: `paint`,
          src: paintings.img1.src
        },
        question2: {
          answer: `photo`,
          src: photos.img1.src
        }
      }
    },
    statistic: null
  },
  'wide': {
    type: `wide`,
    question: {
      text: `Угадай, фото или рисунок?`,
      imgSize: {
        width: 705,
        height: 455
      },
      answers: {
        question1: {
          answer: `paint`,
          src: paintings.img2.src
        }
      }
    },
    statistic: null
  },
  'triple': {
    type: `triple`,
    question: {
      text: `Найдите рисунок среди изображений`,
      imgSize: {
        width: 304,
        height: 455
      },
      answers: {
        question1: {
          answer: `photo`,
          src: photos.img2.src
        },
        question2: {
          answer: `paint`,
          src: paintings.img3.src
        },
        question3: {
          answer: `photo`,
          src: photos.img3.src
        }
      }
    },
    statistic: null
  }
};

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

export const statsAnswers = Object.freeze({
  'level-0': `unknown`,
  'level-1': `unknown`,
  'level-2': `unknown`,
  'level-3': `unknown`,
  'level-4': `unknown`,
  'level-5': `unknown`,
  'level-6': `unknown`,
  'level-7': `unknown`,
  'level-8': `unknown`,
  'level-9': `unknown`,
});

export const tick = (state) => {
  state = Object.assign({}, state, {
    time: state.time + 1
  });
  return state;
};
