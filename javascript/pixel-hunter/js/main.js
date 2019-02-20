'use strict';

const KEYCODE_ARROW_RIGHT = 39;
const KEYCODE_ARROW_LEFT = 37;

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
}; showCurrentScreen(currentScreen);

document.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === KEYCODE_ARROW_RIGHT && currentScreen < templates.length - 1) {
    showCurrentScreen(++currentScreen);
  } else if (evt.keyCode === KEYCODE_ARROW_LEFT && currentScreen > 0) {
    showCurrentScreen(--currentScreen);
  }
});
