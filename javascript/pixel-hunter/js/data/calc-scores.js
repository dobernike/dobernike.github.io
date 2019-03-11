export default (answers, lives) => {
  let score = 0;
  if (answers.length !== 10) {
    return -1;
  }
  answers.forEach((it) => {
    if (it === `correct`) {
      score += 100;
    } else if (it === `fast`) {
      score += 150;
    } else if (it === `slow`) {
      score += 50;
    }
  });

  score += lives * 50;
  return score;
};
