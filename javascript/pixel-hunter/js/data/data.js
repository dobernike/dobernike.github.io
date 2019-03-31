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
          src: paintings[0]
        },
        question2: {
          answer: `photo`,
          src: photos[0]
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
          src: paintings[1]
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
          src: photos[1]
        },
        question2: {
          answer: `paint`,
          src: paintings[2]
        },
        question3: {
          answer: `photo`,
          src: photos[2]
        }
      }
    },
    statistic: null
  }
};

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


// export default {
//   greeting: `Привет!`,
//   content: {
//     title: `Приготовься!`,
//     text: `Тебе предстоит сразится с тремя соперниками!`
//   },
//   creationDate: `2016 — 2017`
// };
