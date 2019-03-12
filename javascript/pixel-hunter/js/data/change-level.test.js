// eslint-disable-next-line object-curly-spacing
import { assert } from 'chai';
// eslint-disable-next-line object-curly-spacing
import { changeLevel, INITIAL_GAME } from './change-level';

describe(`Check level changer`, () => {

  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 2).level, 2);
    assert.equal(changeLevel(INITIAL_GAME, 10).level, 10);
    assert.equal(changeLevel(INITIAL_GAME, 102).level, 102);
  });

  it(`should not allow set negative values`, () => {
    assert.throw(() => changeLevel(INITIAL_GAME, -1).level, 0);
  });

  it(`should not allow set non number value`, () => {
    assert.throw(() => changeLevel(INITIAL_GAME, []).level, 0);
    assert.throw(() => changeLevel(INITIAL_GAME, {}).level, 0);
    assert.throw(() => changeLevel(INITIAL_GAME, undefined).level, 0);
  });

});
