/* eslint-disable quote-props */
/* eslint-disable object-curly-spacing */
import { Result } from "./quest";

const Server2ResultMapper = {
  'die': Result.DIE,
  'win': Result.WIN,
  'next': Result.NEXT_LEVEL
};

const preprocessAnswers = (answers) => answers.map((answer) => {
  const [action, title] = answer.action.split(`.`);
  return {
    action: action.toLowerCase(),
    title: title.trim(),
    'result': Server2ResultMapper[answer.result]
  };
});

export const adaptServerData = (data) => {
  for (const level of Object.values(data)) {
    level.answers = preprocessAnswers(level.answers);
  }
  return data;
};
