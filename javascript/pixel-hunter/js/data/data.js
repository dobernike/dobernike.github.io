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
      answers: {
        first: {
          itIsPhoto: true,
          src: `url(...)`
        },
        second: {
          itIsPhoto: false,
          src: `url(...)`
        }
      }
    },
    statistic: null
  },
  'wide': {
    type: `wide`,
    question: {
      text: `Угадайте для каждого изображения фото или рисунок?`,
      answers: {
        first: {
          itIsPhoto: true,
          src: `url(...)`
        },
        second: {
          itIsPhoto: false,
          src: `url(...)`
        }
      }
    },
    statistic: null
  },
  'triple': {
    type: `triple`,
    question: {
      text: `Угадайте для каждого изображения фото или рисунок?`,
      answers: {
        first: {
          itIsPhoto: true,
          src: `url(...)`
        },
        second: {
          itIsPhoto: false,
          src: `url(...)`
        }
      }
    },
    statistic: null
  }
};


// export default {
//   greeting: `Привет!`,
//   content: {
//     title: `Приготовься!`,
//     text: `Тебе предстоит сразится с тремя соперниками!`
//   },
//   creationDate: `2016 — 2017`
// };
