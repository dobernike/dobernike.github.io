'use strict';
let firstScreen = 0;
const screens = [];
const templates = document.querySelectorAll(`template`);
templates.forEach((template) => screens.push(template));

const main = document.querySelector(`#main`);
const showScreen = (it) => {
  if (it >= 0) {
    console.log(main.children);
    if (main.children.length !== 0) {
      main.removeChild();
    }

    main.appendChild(screens[it].content);
  }
};
showScreen(firstScreen);

document.addEventListener(`keydown`, (evt) => {
  if (evt.keyCode === 37) {
    console.log('sss');
    showScreen(firstScreen++);
  }
});

