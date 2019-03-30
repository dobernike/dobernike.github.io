export default (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should not be negative value`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }

  const newGame = Object.assign({}, game, {
    level
  });
  return newGame;
};
