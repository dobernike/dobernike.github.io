const maxLives = 3;

export default (answer) => {
  let lives = maxLives;
  if (answer === `uncorrect`) {
    lives -= 1;
  }

  return lives;
};
