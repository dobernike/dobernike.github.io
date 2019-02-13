'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены', 'как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var randomInteger = function (min, max, double) {
  if (double) {
    var newArr = [randomInteger(min), randomInteger(min)];
    if (newArr[0] !== newArr[1]) {
      return newArr;
    } else {
      var arr = [newArr[0]];
      return arr;
    }
  } else if (max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  } else {
    return min[Math.floor(Math.random() * min.length)];
  }
};

var doPhotosArray = function (arr) {
  for (var i = 0; i < 25; i++) {
    arr[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomInteger(15, 200),
      comments: randomInteger(COMMENTS, null, 'double?'),
      description: randomInteger(DESCRIPTION)
    };
  }
};

var photos = [];
doPhotosArray(photos);

var pictures = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

var addFragment = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPhoto(arr[i]));
  }
  pictures.appendChild(fragment);
};

addFragment(photos);

var bigPhoto = document.querySelector('.big-picture');

var onBigPhotoPressESC = function (evt) {
  if (evt.keyCode === ESCAPE_KEYCODE) {
    bigPhoto.classList.add('hidden');
    closeBigPhoto();
  }
};

var closeBigPhoto = function () {
  bigPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onBigPhotoPressESC);
};


var closeButtonBigPhoto = bigPhoto.querySelector('.big-picture__cancel');
closeButtonBigPhoto.addEventListener('click', function () {
  closeBigPhoto();
});


var doBigPhoto = function (photo) {

  bigPhoto.classList.remove('hidden');
  document.addEventListener('keydown', onBigPhotoPressESC);


  bigPhoto.querySelector('img').src = photo.url;
  bigPhoto.querySelector('.likes-count').textContent = photo.likes;
  bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
  bigPhoto.querySelector('.social__caption').textContent = photo.description;


  var socialComment = document.querySelectorAll('.social__comment');

  for (var i = 0; i < photo.comments.length; i++) {
    socialComment[i].querySelector('.social__picture').src = 'img/avatar-' + randomInteger(1, 6) + '.svg';
    socialComment[i].querySelector('.social__text').textContent = photo.comments[i];
  }

  return bigPhoto;
};


// doBigPhoto(photos[3]);

var addPictureLinkHandler = function (picture, photo) {
  picture.addEventListener('click', function (evt) {
    evt.preventDefault();
    doBigPhoto(photo);
  });
};

var picturesLinks = document.querySelectorAll('.picture');
// console.log(picturesLinks);

for (var j = 0; j < picturesLinks.length; j++) {
  var pictureItem = picturesLinks[j];
  addPictureLinkHandler(pictureItem, photos[j]);
}

// var closeBigPhoto =


var hide = function (needToHide) {
  needToHide.classList.add('visually-hidden');
};

hide(document.querySelector('.social__comment-count'));
hide(document.querySelector('.comments-loader'));


// preview-effect
var ESCAPE_KEYCODE = 27;
var SCALE_PIN_MAX = 100;
var SCALE_PIN_MIN = 0;
var EFFECT_CHROME_MIN = 0;
var EFFECT_CHROME_MAX = 1;
var EFFECT_SEPIA_MIN = 0;
var EFFECT_SEPIA_MAX = 1;
var EFFECT_MARVIN_MIN = 0;
var EFFECT_MARVIN_MAX = 100;
var EFFECT_FOBOS_MIN = 0;
var EFFECT_FOBOS_MAX = 5;
var EFFECT_HEAT_MIN = 0;
var EFFECT_HEAT_MAX = 3;

var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
var filterChecked = imgUploadOverlay.querySelector('.effects__radio:checked + .effects__label > .effects__preview');
var effectsPreviews = imgUploadOverlay.querySelectorAll('.effects__preview');
var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
var imagePreview = imgUploadOverlay.querySelector('.img-upload__preview > img');
var scalePin = imgUploadOverlay.querySelector('.effect-level__pin');
console.log(window.slider);

var pinEditor = function () {
  // imagePreview.style.filter = getComputedStyle(filterChecked).filter;


  // var EFFECT_SEPIA_MIN = 0;
  // var EFFECT_SEPIA_MAX = 1;
  // var SCALE_PIN_MAX = 100;
  // var filterValueTest = 'sepia(' + 1 + ')';
  // scalePinProcent = 100;
  // var math = ((SCALE_PIN_MIN + scalePinProcent) * 1);
  // console.log(math);
  // console.log(scalePinProcent);
  // var filterValueTest = 'invert(' + (SCALE_PIN_MIN + scalePinProcent) * 1 + '%)';
  // console.log(filterValueTest);
  // console.log(scalePinProcent);


  var filterValue = '';
  switch (imagePreview.className) {
    case 'effects__preview--none':
      filterValue = 0;
      break;
    case 'effects__preview--chrome':
      filterValue = 'grayscale(' + ((SCALE_PIN_MIN + scalePinProcent) * 0.01) + ')';
      break;
    case 'effects__preview--sepia':
      filterValue = 'sepia(' + ((SCALE_PIN_MIN + scalePinProcent) * 0.01) + ')';
      break;
    case 'effects__preview--marvin':
      filterValue = 'invert(' + (SCALE_PIN_MIN + scalePinProcent) * 1 + '%)';
      break;
    case 'effects__preview--phobos':
      filterValue = 'blur(' + ((SCALE_PIN_MIN + scalePinProcent) / 20) + 'px)';
      break;
    case 'effects__preview--heat':
      filterValue = 'brightness(' + ((SCALE_PIN_MIN + scalePinProcent) / 20) + ')';
      break;
    default:
      break;
  }


  imagePreview.style.filter = filterValue;
  // SCALE_PIN_MAX = 0;
  // resetEditor();
};


// scalePin.addEventListener('mouseup', function () {
//   pinEditor();
// });


var resetEditor = function () {
  effectLevelDepth.style.width = SCALE_PIN_MAX;
  scalePin.style.left = SCALE_PIN_MAX;
  scaleControlValue.value = SCALE_PIN_MAX + '%';
  imagePreview.className = '';
}; resetEditor();

// Делегирование еффектов
var addEventToEffect = function (effect) {
  effect.addEventListener('click', function () {
    imagePreview.className = effect.classList[1];
  });
};

var effectPreviews = imgUploadOverlay.querySelectorAll('.effects__preview');
for (var i = 0; i < effectPreviews.length; i++) {
  var effect = effectPreviews[i];
  addEventToEffect(effect);
}


// ------------------------------------------------------------
imgUploadOverlay.classList.remove('hidden');

// Открывание и закрывание редактора
var onEditorPressESC = function (evt) {
  if (evt.keyCode === ESCAPE_KEYCODE) {
    closeEditor();
  }
};

var openEditor = function () {
  imgUploadOverlay.classList.remove('hidden');

  document.addEventListener('keydown', onEditorPressESC);
  pinEditor();
};

var closeEditor = function () {
  imgUploadOverlay.classList.add('hidden');
  uploadFile.value = '';

  document.removeEventListener('keydown', onEditorPressESC);
};

uploadFile.addEventListener('change', function () {
  openEditor();
});

uploadCancel.addEventListener('click', function () {
  closeEditor();
});

var hashtagInput = document.querySelector('.text__hashtags');

hashtagInput.addEventListener('invalid', function () {
  if (hashtagInput.validity.tooShort) {
    hashtagInput.setCustomValidity('Больше хештегов, богу хештегов!');
  } else if (hashtagInput.validity.tooLong) {
    hashtagInput.setCustomValidity('Ну нет много, же...');
  } else {
    hashtagInput.setCustomValidity('');
  }
});

hashtagInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    hashtagInput.setCustomValidity('И это по твойму хештег?');
  } else {
    var arrTarget = target.value.split(' ');
    console.log(arrTarget);

    for (var k = 0; k < arrTarget.length; k++) {
      var targetElement = arrTarget[k];
      if (targetElement[0] !== '#' || targetElement[0] === '#' && targetElement[1] === '#') {
        console.log('error');
        hashtagInput.setCustomValidity('Больше хештегов, богу хештегов!');
        target.setCustomValidity('Больше хештегов, богу хештегов!');
      }
    }
    // target.setCustomValidity('bad');
  }
});
