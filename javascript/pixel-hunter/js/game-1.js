import { render, changeScreen } from './util.js';
import nextGame from './game-2.js';
import greeting from './greeting.js';


const template = `<header class="header">
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <!-- <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg> -->
    <svg xmlns="http://www.w3.org/2000/svg" width="38.687" height="36.969" viewBox="0 0 38.687 36.969">
      <path id="arrow_left" data-name="Left Arrow" d="M123.158,49.587l18.47,18.469-3.315,3.315L119.843,52.9Zm18.47-11.866-18.47,18.469-3.315-3.315,18.47-18.469Zm16.909,17.332H126.156V50.366h32.381v4.688Z" transform="translate(-119.844 -34.406)" />
    </svg>

    <!-- <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg> -->
    <svg xmlns="http://www.w3.org/2000/svg" width="101px" height="44px" viewBox="0 0 101 44">
      <path fill-rule="evenodd" d="M57.007,19.638 L57.007,0.979 L61.000,0.979 L61.000,16.085 L69.414,16.085 L69.414,19.638 L57.007,19.638 ZM53.793,19.638 L41.519,19.638 C41.284,19.638 41.093,19.448 41.093,19.213 L41.093,1.404 C41.093,1.169 41.284,0.979 41.519,0.979 L53.554,0.979 C53.789,0.979 53.979,1.169 53.979,1.404 L53.979,4.189 C53.979,4.424 53.789,4.614 53.554,4.614 L45.087,4.614 L45.087,8.368 L51.574,8.368 C51.809,8.368 51.999,8.558 51.999,8.793 L51.999,11.496 C51.999,11.731 51.809,11.921 51.574,11.921 L45.087,11.921 L45.087,16.085 L53.793,16.085 C54.028,16.085 54.218,16.275 54.218,16.510 L54.218,19.213 C54.218,19.448 54.028,19.638 53.793,19.638 ZM38.649,19.638 L35.030,19.638 C34.877,19.638 34.737,19.553 34.666,19.417 L31.775,13.816 C31.623,13.521 31.200,13.521 31.047,13.816 L28.156,19.417 C28.086,19.553 27.945,19.638 27.792,19.638 L24.173,19.638 C23.862,19.638 23.664,19.305 23.814,19.032 L28.879,9.800 L24.394,1.626 C24.245,1.353 24.442,1.020 24.754,1.020 L28.171,1.020 C28.323,1.020 28.462,1.103 28.533,1.237 L31.098,6.054 C31.252,6.344 31.667,6.344 31.821,6.054 L34.386,1.237 C34.457,1.103 34.596,1.020 34.747,1.020 L38.165,1.020 C38.476,1.020 38.674,1.353 38.524,1.626 L33.992,9.888 L39.008,19.032 C39.158,19.305 38.961,19.638 38.649,19.638 ZM21.023,19.597 L17.896,19.597 C17.647,19.597 17.446,19.396 17.446,19.147 L17.446,1.388 C17.446,1.140 17.647,0.938 17.896,0.938 L21.023,0.938 C21.272,0.938 21.473,1.140 21.473,1.388 L21.473,19.147 C21.473,19.396 21.272,19.597 21.023,19.597 ZM11.922,14.209 L4.434,14.209 L4.434,19.249 C4.434,19.475 4.251,19.659 4.024,19.659 L0.850,19.659 C0.624,19.659 0.440,19.475 0.440,19.249 L0.440,1.409 C0.440,1.183 0.624,0.999 0.850,0.999 L11.922,0.999 C13.272,0.999 14.367,2.094 14.367,3.444 L14.367,11.764 C14.367,13.114 13.272,14.209 11.922,14.209 ZM10.373,5.461 C10.373,5.005 10.003,4.635 9.547,4.635 L4.434,4.635 L4.434,10.568 L9.547,10.568 C10.003,10.568 10.373,10.198 10.373,9.741 L10.373,5.461 Z" />
      <path fill-rule="evenodd" style="transform: translateY(22px)" d="M100.019,18.615 L96.744,18.615 C96.581,18.615 96.432,18.521 96.363,18.373 L93.788,12.888 L90.332,12.888 L90.332,18.284 C90.332,18.517 90.144,18.706 89.911,18.706 L86.760,18.706 C86.527,18.706 86.339,18.517 86.339,18.284 L86.339,0.468 C86.339,0.235 86.527,0.047 86.760,0.047 L97.748,0.047 C99.138,0.047 100.265,1.174 100.265,2.564 L100.265,10.685 C100.265,11.901 99.279,12.888 98.062,12.888 L100.403,18.019 C100.530,18.298 100.326,18.615 100.019,18.615 ZM96.272,4.504 C96.272,4.050 95.903,3.682 95.449,3.682 L90.332,3.682 L90.332,9.247 L95.449,9.247 C95.903,9.247 96.272,8.878 96.272,8.424 L96.272,4.504 ZM83.126,18.651 L70.897,18.651 C70.650,18.651 70.450,18.451 70.450,18.204 L70.450,0.440 C70.450,0.192 70.650,-0.008 70.897,-0.008 L82.887,-0.008 C83.135,-0.008 83.335,0.192 83.335,0.440 L83.335,3.180 C83.335,3.427 83.135,3.627 82.887,3.627 L74.490,3.627 C74.464,3.627 74.443,3.648 74.443,3.674 L74.443,7.335 C74.443,7.360 74.464,7.381 74.490,7.381 L80.908,7.381 C81.155,7.381 81.355,7.582 81.355,7.829 L81.355,10.487 C81.355,10.734 81.155,10.934 80.908,10.934 L74.443,10.934 L74.443,15.098 L83.126,15.098 C83.374,15.098 83.574,15.298 83.574,15.546 L83.574,18.204 C83.574,18.451 83.374,18.651 83.126,18.651 ZM67.806,3.607 L63.258,3.607 L63.258,18.250 C63.258,18.472 63.078,18.651 62.856,18.651 L59.706,18.651 C59.484,18.651 59.305,18.472 59.305,18.250 L59.305,3.607 L54.763,3.607 C54.542,3.607 54.362,3.427 54.362,3.206 L54.362,0.393 C54.362,0.172 54.542,-0.008 54.763,-0.008 L67.806,-0.008 C68.027,-0.008 68.207,0.172 68.207,0.393 L68.207,3.206 C68.207,3.427 68.027,3.607 67.806,3.607 ZM51.904,18.665 L47.640,18.665 C47.561,18.665 47.488,18.620 47.453,18.548 L41.860,7.192 C41.762,6.994 41.463,7.063 41.463,7.285 L41.463,18.456 C41.463,18.571 41.369,18.665 41.254,18.665 L37.698,18.665 C37.583,18.665 37.489,18.571 37.489,18.456 L37.489,0.215 C37.489,0.099 37.583,0.006 37.698,0.006 L42.179,0.006 C42.260,0.006 42.333,0.052 42.368,0.125 L47.724,11.352 C47.821,11.553 48.123,11.485 48.123,11.262 L48.123,0.215 C48.123,0.099 48.216,0.006 48.332,0.006 L51.904,0.006 C52.019,0.006 52.113,0.099 52.113,0.215 L52.113,18.456 C52.113,18.571 52.019,18.665 51.904,18.665 ZM31.016,18.665 L21.729,18.665 C20.365,18.665 19.259,17.559 19.259,16.195 L19.259,0.416 C19.259,0.189 19.443,0.006 19.670,0.006 L22.876,0.006 C23.103,0.006 23.287,0.189 23.287,0.416 L23.287,14.343 C23.287,14.767 23.631,15.112 24.056,15.112 L28.689,15.112 C29.114,15.112 29.458,14.767 29.458,14.343 L29.458,0.416 C29.458,0.189 29.642,0.006 29.869,0.006 L33.076,0.006 C33.302,0.006 33.486,0.189 33.486,0.416 L33.486,16.195 C33.486,17.559 32.380,18.665 31.016,18.665 ZM14.813,18.665 L11.588,18.665 C11.366,18.665 11.187,18.485 11.187,18.264 L11.187,11.112 L4.974,11.112 L4.974,18.264 C4.974,18.485 4.795,18.665 4.573,18.665 L1.348,18.665 C1.126,18.665 0.947,18.485 0.947,18.264 L0.947,0.407 C0.947,0.185 1.126,0.006 1.348,0.006 L4.573,0.006 C4.795,0.006 4.974,0.185 4.974,0.407 L4.974,7.559 L11.187,7.559 L11.187,0.407 C11.187,0.185 11.366,0.006 11.588,0.006 L14.813,0.006 C15.035,0.006 15.214,0.185 15.214,0.407 L15.214,18.264 C15.214,18.485 15.035,18.665 14.813,18.665 Z" />
    </svg>

  </button>
  <div class="game__timer">NN</div>
  <div class="game__lives">
    <img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">
    <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
  </div>
</header>
<section class="game">
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  <ul class="stats">
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--correct"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
  </ul>
</section>`;

const game = render(template);

const back = game.querySelector(`.back`);
back.addEventListener(`click`, () => {
  changeScreen(greeting);
});

const gameAnswers = game.querySelectorAll(`.game__answer`);
gameAnswers.forEach((it) => {
  it.addEventListener(`change`, () => {
    if (game.querySelectorAll(`input:checked`).length > 1) {
      changeScreen(nextGame);
    }
  });
});

// const inputs = game.querySelectorAll(`input`);
// inputs.forEach((it) => {
// });
// const secondCheckboxes = game.querySelectorAll(`input[name=question2]`);
// console.log(firstCheckboxes)

// const isChecked = (...inputChecboxes) => {
//   // const allChecboxes = [inputChecboxes];
//   console.log(inputChecboxes);

//   inputChecboxes.forEach((it) => {
//     console.log(it.isChecked);
//     console.log(inputChecboxes);
//     if (it.isChecked) {
//       console.log('123');
//     }
//   });
//   // inputChecbox.forEach((it) => {
//   // console.log(it.checked);

//   // });
// };

// document.addEventListener(`click`, () => {
//   isChecked(firstCheckboxes);
// });
// console.log(isChecked(firstCheckboxes, secondCheckboxes));

export default game;
