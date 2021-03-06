const maxLives = 3;

export default (answer: { [x: string]: string; }) => {
  let lives = maxLives;

  for (let index in answer) {
    if (answer[index] === `wrong`) {
      lives -= 1;
    }
  }

  return lives;
};
