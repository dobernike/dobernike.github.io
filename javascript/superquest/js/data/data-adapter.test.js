/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */
import { assert } from 'chai';

import { Result } from './quest';
import { adaptServerData } from './data-adapter.js';

const serverData = {
  "level-0":
  {
    "text": "Вас зовут Луиджи Марио...",
    "answers":
      [
        {
          "action": "LEFT. Вы побежите влево, от гриба",
          "result": "die"
        },
        {
          "action": "RIGHT. Вы побежите вправо, прямо на гриб",
          "result": "die"
        },
        {
          "action": "JUMP. Вы прыгните вверх",
          "result": "next"
        }
      ]
  }
};

const localData = {
  'level-0': {
    text: `Вас зовут Луиджи Марио...`,
    answers: [
      {
        action: `left`,
        title: `Вы побежите влево, от гриба`,
        result: Result.DIE
      },
      {
        action: `right`,
        title: `Вы побежите вправо, прямо на гриб`,
        result: Result.DIE
      },
      {
        action: `jump`,
        title: `Вы прыгните вверх`,
        result: Result.NEXT_LEVEL
      }
    ]
  }
};

adaptServerData(serverData);

describe(`Adapt server data`, () => {

  it(`should have several format remote and local data`, () => {
    assert.deepEqual(localData, serverData);
  });

});
