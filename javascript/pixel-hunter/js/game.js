const games = {
  'double': {
    question: {
      text: `Угадайте для каждого изображения фото или рисунок?`,
      option: `<div class="game__option">
      <img src="${games.answers.first.src}" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`,
      answers: {
        first: {
          itIsPhoto: true,
          src: `img[0]`
        },
        second: {
          itIsPhoto: false,
          src: `http://`
        }
      }
    },
    statistic: null
  },
  'wide': {
    question: {
      text: ``,
      isPhoto: false,
      answers: {
        first: {
          itIsPhoto: true,
          src: `http://`
        }
      }
    },
    statistic: null
  },
  'triple': {
    question: {
      text: ``,
      isPhoto: false,
      answers: {
        first: {
          itIsPhoto: true,
          src: `http://`
        },
        second: {
          itIsPhoto: false,
          src: `http://`
        },
        third: {
          itIsPhoto: false,
          src: `http://`
        }
      }
    },
    statistic: null
  }
};
