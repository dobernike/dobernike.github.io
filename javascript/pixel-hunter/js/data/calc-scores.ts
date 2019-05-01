export const calcSummaryScores = (answers, lives) => {
  let score = 0;

  for (let index in answers) {
    if (answers[index] === `correct`) {
      score += 100;
    } else if (answers[index] === `fast`) {
      score += 150;
    } else if (answers[index] === `slow`) {
      score += 50;
    }
  }

  score += lives * 50;
  return score;
};

export const calcCorrect = (answers) => {
  let correct = 0;

  for (let index in answers) {
    if (answers[index] !== `wrong`) {
      correct += 1;
    }
  }

  return correct;
};

export const calcFast = (answers) => {
  let fast = 0;
  for (let index in answers) {
    if (answers[index] === `fast`) {
      fast += 1;
    }
  }

  return fast;
};

export const calcSlow = (answers) => {
  let slow = 0;
  for (let index in answers) {
    if (answers[index] === `slow`) {
      slow += 1;
    }
  }

  return slow;
};
