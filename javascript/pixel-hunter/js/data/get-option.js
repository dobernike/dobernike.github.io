/* eslint-disable object-curly-spacing */
import { levels } from '../data/data.js';
import { paintings, photos } from '../data/mock.js';
import { resize } from '../data/resize.js';


export default (typeOfGame) => {
  let option = ``;
  // for double
  const expectedSizeDouble = levels.double.question.imgSize;
  const srcSizeDoubleImg1 = paintings.img1.size;
  const resizeDoubleImg1 = resize(expectedSizeDouble, srcSizeDoubleImg1);

  const srcSizeDoubleImg2 = paintings.img1.size;
  const resizeDoubleImg2 = resize(expectedSizeDouble, srcSizeDoubleImg2);
  // for wide
  const expectedSizeWide = levels.wide.question.imgSize;
  const srcSizeWideImg1 = paintings.img2.size;
  const resizeWideImg1 = resize(expectedSizeWide, srcSizeWideImg1);
  // for triple
  const expectedSizeTriple = levels.triple.question.imgSize;
  const srcSizeTripleImg1 = photos.img2.size;
  const resizeTripleImg1 = resize(expectedSizeTriple, srcSizeTripleImg1);

  const srcSizeTripleImg2 = paintings.img3.size;
  const resizeTripleImg2 = resize(expectedSizeTriple, srcSizeTripleImg2);

  const srcSizeTripleImg3 = photos.img3.size;
  const resizeTripleImg3 = resize(expectedSizeTriple, srcSizeTripleImg3);

  switch (typeOfGame) {
    case `double`:
      option = `<div class="game__option">
    <img src="${levels.double.question.answers.question1.src}" alt="Option 1" width="${resizeDoubleImg1.width}" height="${resizeDoubleImg1.height}">
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
    <img src="${levels.double.question.answers.question2.src}" alt="Option 2" width="${resizeDoubleImg2.width}" height="${resizeDoubleImg2.height}">
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
    case `wide`:
      option = `<div class="game__option">
    <img src="${levels.wide.question.answers.question1.src}" alt="Option 1" width="${resizeWideImg1.width}" height="${resizeWideImg1.height}">
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
    case `triple`:
      option = `<div class="game__option">
    <img src="${levels.triple.question.answers.question1.src}" alt="Option 1" width="${resizeTripleImg1.width}" height="${resizeTripleImg1.height}">
  </div>

  <div class="game__option  game__option--selected">
    <img src="${levels.triple.question.answers.question2.src}" alt="Option 2"  width="${resizeTripleImg2.width}" height="${resizeTripleImg2.height}">
  </div>

  <div class="game__option">
    <img src="${levels.triple.question.answers.question3.src}" alt="Option 3"  width="${resizeTripleImg3.width}" height="${resizeTripleImg3.height}">
  </div>`;
      break;

    default:
      option = `Тип игры имеет неправильный формат`;
      break;
  }

  return option;
};
