export const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 0
});

export const Result = {
  NOOP: 0,
  DIE: 1,
  WIN: 2,
  NEXT_LEVEL: 3
};

export const changeLevel = (game, level) => {
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

export const canContinue = (game) => {
  return game.lives !== 0 ? game : false;
};

export const die = (game) => {
  game.lives -= 1;
  return game;
};
