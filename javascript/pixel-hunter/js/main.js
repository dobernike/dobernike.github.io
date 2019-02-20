'use strict';

const KEY_CODE = {
  left: 37,
  right: 39
};

let currentScreen = 0;

const templates = [`intro`, `greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`]
  .map((template) => {
    return document.getElementById(`${template}`);
  });

const main = document.querySelector(`#main`);
const showCurrentScreen = (it) => {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  main.appendChild(templates[it].content.cloneNode(true));
  main.click();
}; showCurrentScreen(currentScreen);

document.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === KEY_CODE.right && currentScreen < templates.length - 1) {
    showCurrentScreen(++currentScreen);
  } else if (evt.keyCode === KEY_CODE.left && currentScreen > 1) {
    showCurrentScreen(--currentScreen);
  }
});

document.addEventListener(`click`, (evt) => {
  const asterisk = document.querySelector(`.asterisk`);
  if (evt.target === asterisk) {
    showCurrentScreen(++currentScreen);
  }

  const greetingContinue = document.querySelector(`.greeting__continue`);
  if (greetingContinue) {
    greetingContinue.addEventListener(`click`, () => {
      showCurrentScreen(++currentScreen);
    });
  }

  const back = document.querySelector(`.back`);
  if (back) {
    back.addEventListener(`click`, () => {
      showCurrentScreen(--currentScreen);
    });
  }
});
