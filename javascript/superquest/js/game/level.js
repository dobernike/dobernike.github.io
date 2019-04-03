const getAnswer = (level) => {
  let answers = ``;
  for (const answer of level.answers) {
    answers += `<li class="answer"> ${answer.action.toUpperCase() + ` ` + answer.title}</li>`;
  }
  return answers;
};

export default (lvl) => `
<div>
<div class="quest">
  <p class="text">
  ${lvl.text}
  </p>
  <input type="text">
  <ul class="answers">
  ${getAnswer(lvl)}
  </ul >
</div >
</div >
`;

