/* eslint-disable object-curly-spacing */
import { assert } from 'chai';
import calcScores from './calc-scores.js';

const data = [`correct`, `fast`, `slow`];

const maxLives = 3;
const answersNotFull = new Array(9).fill(data[0]);
const answersDefault = new Array(10).fill(data[0]);
const answersRandom = new Array(10).fill(data).flat();
answersRandom.length = 10;
const answersFast = new Array(10).fill(data[1]);

describe(`Check score count`, () => {

  it(`should update score`, () => {
    assert.equal(calcScores(answersNotFull), -1);
    assert.equal(calcScores(answersNotFull, maxLives), -1);
    assert.equal(calcScores(answersDefault, maxLives), 1150);
    assert.equal(calcScores(answersDefault, 0), 1000);
    assert.equal(calcScores(answersRandom, 0), 1000);
    assert.equal(calcScores(answersFast, 2), 1600);
  });

});
