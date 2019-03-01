import intro from './intro.js';
import { changeScreen } from './util.js';

changeScreen(intro);
// const KEY_CODE = {
//   left: 37,
//   right: 39
// };

// let currentScreen = 0;
// const templates = [`intro`, `greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`]
//   .map((template) => {
//     return document.getElementById(`${template}`);
//   });

// const main = document.querySelector(`#main`);
// const showCurrentScreen = (it) => {
//   while (main.firstChild) {
//     main.removeChild(main.firstChild);
//   }
//   main.appendChild(templates[it].content.cloneNode(true));
//   main.click();
// }; showCurrentScreen(currentScreen);

// document.addEventListener(`keydown`, (evt) => {
//   if (evt.keyCode === KEY_CODE.right && currentScreen < templates.length - 1) {
//     showCurrentScreen(++currentScreen);
//   } else if (evt.keyCode === KEY_CODE.left && currentScreen > 1) {
//     showCurrentScreen(--currentScreen);
//   }
// });


// let greetingContinue;
// let back;

// const showNextScreen = () => {
//   if (greetingContinue) {
//     greetingContinue.removeEventListener(`click`, showNextScreen);
//   }
//   showCurrentScreen(++currentScreen);
// };

// const showPrevScreen = () => {
//   if (back) {
//     back.removeEventListener(`click`, showPrevScreen);
//   }
//   showCurrentScreen(--currentScreen);
// };

// document.addEventListener(`click`, (evt) => {
//   const introAsterisk = document.querySelector(`.intro__asterisk`);
//   const greetingAsterisk = document.querySelector(`.greeting__asterisk`);
//   greetingContinue = document.querySelector(`.greeting__continue`);
//   back = document.querySelector(`.back`);
//   if (evt.target === introAsterisk) {
//     showNextScreen();
//   }
//   if (evt.target === greetingAsterisk) {
//     showPrevScreen();
//   }
//   if (greetingContinue) {
//     greetingContinue.addEventListener(`click`, showNextScreen);
//   }
//   if (back) {
//     back.addEventListener(`click`, showPrevScreen);
//   }
// });
