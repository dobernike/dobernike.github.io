/* eslint-disable object-curly-spacing */
import { assert } from 'chai';
import { calcSummaryScores } from './calc-scores.js';

const data = [`correct`, `fast`, `slow`];

const maxLives = 3;
const answersDefault = new Array(10).fill(data[0]);
const answersRandom = new Array(10).fill(data).flat();
answersRandom.length = 10;
const answersFast = new Array(10).fill(data[1]);

describe(`Check score count`, () => {

  it(`should update score`, () => {
    assert.equal(calcSummaryScores(answersDefault, maxLives), 1150);
    assert.equal(calcSummaryScores(answersDefault, 0), 1000);
    assert.equal(calcSummaryScores(answersRandom, 0), 1000);
    assert.equal(calcSummaryScores(answersFast, 2), 1600);
  });

});
