/* eslint-disable object-curly-spacing */
import { assert } from 'chai';
import countLives from './count-lives.js';

const wrong = {
  'level-0': `wrong`,
  'level-1': `unknown`,
  'level-2': `unknown`,
  'level-3': `unknown`,
  'level-4': `unknown`,
  'level-5': `unknown`,
  'level-6': `unknown`,
  'level-7': `unknown`,
  'level-8': `unknown`,
  'level-9': `unknown`,
};

const correct = {
  'level-0': `correct`,
  'level-1': `correct`,
  'level-2': `correct`,
  'level-3': `correct`,
  'level-4': `correct`,
  'level-5': `correct`,
  'level-6': `correct`,
  'level-7': `correct`,
  'level-8': `correct`,
  'level-9': `correct`,
};

describe(`Check lives count`, () => {

  it(`should update lives`, () => {
    assert.equal(countLives(wrong), 2);
    assert.equal(countLives(correct), 3);
  });

});
