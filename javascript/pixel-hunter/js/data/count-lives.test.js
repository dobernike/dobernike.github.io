import { assert } from 'chai';
import countLives from './count-lives.js';

describe(`Check lives count`, () => {

  it(`should update lives`, () => {
    assert.equal(countLives(`uncorrect`), 2);
    assert.equal(countLives(`correct`), 3);
  });

});
