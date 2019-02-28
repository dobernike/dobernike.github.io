const main = document.querySelector(`#main`);
const welcomeScreen = document.querySelector(`#welcome`).cloneNode(true).content.querySelector(`.end`);
main.appendChild(welcomeScreen);
