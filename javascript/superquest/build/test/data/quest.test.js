'use strict';

var chai = require('chai');

const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 2,
  time: 0
});

const changeLevel = (game, level) => {
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

// eslint-disable-next-line object-curly-spacing

describe(`Check level changer`, () => {

  it(`should update level of the game`, () => {
    chai.assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    chai.assert.equal(changeLevel(INITIAL_GAME, 2).level, 2);
    chai.assert.equal(changeLevel(INITIAL_GAME, 10).level, 10);
    chai.assert.equal(changeLevel(INITIAL_GAME, 102).level, 102);
  });

  it(`should not allow set negative values`, () => {
    chai.assert.throw(() => changeLevel(INITIAL_GAME, -1).level, 0);
  });

  it(`should not allow set non number value`, () => {
    chai.assert.throw(() => changeLevel(INITIAL_GAME, []).level, 0);
    chai.assert.throw(() => changeLevel(INITIAL_GAME, {}).level, 0);
    chai.assert.throw(() => changeLevel(INITIAL_GAME, undefined).level, 0);
  });

});
