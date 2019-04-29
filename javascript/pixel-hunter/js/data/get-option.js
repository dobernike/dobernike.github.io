/* eslint-disable object-curly-spacing */
import { levels } from '../data/data.js';
import { paintings, photos } from '../data/mock.js';
import { resize } from '../data/resize.js';


const EXPPECTED = {
  TWO_OF_TWO: {
    width: 468,
    height: 458
  },
  TINDER_LIKE: {
    width: 450,
    height: 510
  },
  ONE_OF_THREE: {
    width: 450,
    height: 510
  }
};


export default (data) => {
  let option = ``;
  const typeOfGame = data.type;
  // const img = data.answers[0].image.url;
  console.log(data.answers[0].image);
  // for double
  const expectedSizeDouble = {
    width: data.answers[0].image.width,
    height: data.answers[0].image.height
  };

  const srcSizeDoubleImg1 = new Image();
  srcSizeDoubleImg1.onload = function () {
    let width = this.width;
    let height = this.height;
    console.log(width + ` ` + height);
  };
  srcSizeDoubleImg1.src = data.answers[0].image.src;

  console.log(srcSizeDoubleImg1)
  const resizeDoubleImg1 = resize(expectedSizeDouble, data.answers[0].image.url);

  const srcSizeDoubleImg2 = paintings.img1.size;

  const resizeDoubleImg2 = resize(expectedSizeDouble, srcSizeDoubleImg2);

  // for wide
  const expectedSizeWide = {
    width: data.answers[0].image.width,
    height: data.answers[0].image.height
  };

  const srcSizeWideImg1 = paintings.img2.size;
  const resizeWideImg1 = resize(expectedSizeWide, srcSizeWideImg1);

  // for triple
  const expectedSizeTriple = {
    width: data.answers[0].image.width,
    height: data.answers[0].image.height
  };

  const srcSizeTripleImg1 = photos.img2.size;
  const resizeTripleImg1 = resize(expectedSizeTriple, srcSizeTripleImg1);

  const srcSizeTripleImg2 = paintings.img3.size;
  const resizeTripleImg2 = resize(expectedSizeTriple, srcSizeTripleImg2);

  const srcSizeTripleImg3 = photos.img3.size;
  const resizeTripleImg3 = resize(expectedSizeTriple, srcSizeTripleImg3);

  switch (typeOfGame) {
    case `two-of-two`:
      option = `<div class="game__option" style="width: auto;">
    <img src="${data.answers[0].image.url}" alt="Option 1" width="${data.answers[0].image.width}" height="${data.answers[0].image.height}">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>

  <div class="game__option" style="width: auto;">
    <img src="${data.answers[1].image.url}" alt="Option 2" width="${data.answers[1].image.width}" height="${data.answers[1].image.height}">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question2" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question2" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;
      break;
    case `tinder-like`:
      option = `<div class="game__option" style="width: auto;">
    <img src="${data.answers[0].image.url}" alt="Option 1" width="${data.answers[0].image.width}" height="${data.answers[0].image.height}">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;
      break;
    case `one-of-three`:
      option = `<div class="game__option" style="width: auto;">
    <img src="${data.answers[0].image.url}" alt="Option 1" width="${data.answers[0].image.width}" height="${data.answers[0].image.height}">
  </div>

  <div class="game__option  game__option--selected" style="width: auto;">
    <img src="${data.answers[1].image.url}" alt="Option 2"  width="${data.answers[1].image.width}" height="${data.answers[1].image.height}">
  </div>

  <div class="game__option" style="width: auto;">
    <img src="${data.answers[2].image.url}" alt="Option 3"  width="${data.answers[2].image.width}" height="${data.answers[2].image.height}">
  </div>`;
      break;

    default:
      option = `Тип игры имеет неправильный формат`;
      break;
  }

  return option;
};
