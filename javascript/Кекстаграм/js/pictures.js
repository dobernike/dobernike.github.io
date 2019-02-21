'use strict';

(function () {
  // var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены', 'как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  // var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

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

  // var doPhotosArray = function (arr) {
  //   for (var i = 0; i < 25; i++) {
  //     arr[i] = {
  //       url: 'photos/' + (i + 1) + '.jpg',
  //       likes: randomInteger(15, 200),
  //       comments: randomInteger(COMMENTS, null, 'double?'),
  //       description: randomInteger(DESCRIPTION)
  //     };
  //   }
  // };

  // var photos = [];
  // doPhotosArray(photos);


  // var successHandler = function (wizards) {
  //   var fragment = document.createDocumentFragment();

  //   for (var i = 0; i < 4; i++) {
  //     fragment.appendChild(renderWizard(wizards[i]));
  //   }
  //   similarListElement.appendChild(fragment);

  //   document.querySelector('.setup-similar').classList.remove('hidden');
  // };

  // var errorHandler = function (errorMessage) {
  //   var node = document.createElement('div');
  //   node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  //   node.style.position = 'absolute';
  //   node.style.left = 0;
  //   node.style.right = 0;
  //   node.style.fontSize = '30px';

  //   node.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', node);
  // };


  var pictures = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPhoto = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

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

  var socialComment = document.querySelector('.social__comment');
  var renderComments = function (comment) {
    var commentElement = socialComment.cloneNode(true);

    commentElement.querySelector('img').src = comment.avatar;
    commentElement.querySelector('img').title = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };


  var doBigPhoto = function (photo) {

    bigPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onBigPhotoPressESC);


    bigPhoto.querySelector('img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.social__caption').textContent = photo.description;


    var socialComments = document.querySelector('.social__comments');

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photo.comments.length; i++) {
      fragment.appendChild(renderComments(photo.comments[i]));
      // socialComment[i].querySelector('.social__picture').src = photo.comments[i].avatar;
      // socialComment[i].querySelector('.social__text').textContent = photo.comments[i].message;
    }


    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }

    socialComments.appendChild(fragment);


    // socialComments.removeChild();


    return bigPhoto;
  };


  // doBigPhoto(photos[3]);

  var addPictureLinkHandler = function (picture, photo) {
    picture.addEventListener('click', function (evt) {
      evt.preventDefault();
      doBigPhoto(photo);
    });
  };


  // console.log(picturesLinks);


  // var photos = [];

  var successHandler = function (photoArr) {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photoArr.length; i++) {
      fragment.appendChild(renderPhoto(photoArr[i]));
    }
    pictures.appendChild(fragment);

    var picturesLinks = document.querySelectorAll('.picture');
    for (var j = 0; j < picturesLinks.length; j++) {
      var pictureItem = picturesLinks[j];
      addPictureLinkHandler(pictureItem, photoArr[j]);
    }
  };


  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


  window.backend.load(successHandler, errorHandler);
  // console.log(photos);

  // var closeBigPhoto =


  var hide = function (needToHide) {
    needToHide.classList.add('visually-hidden');
  };

  hide(document.querySelector('.social__comment-count'));
  hide(document.querySelector('.comments-loader'));


  // preview-effect
  var ESCAPE_KEYCODE = 27;
  var SCALE_PIN_MAX = 450;
  var SCALE_PIN_MAX_PERCENT = 100;


  // var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  // var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
  // var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');

  // var effectsPreviews = imgUploadOverlay.querySelectorAll('.effects__preview');
  var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');

  var scalePin = imgUploadOverlay.querySelector('.effect-level__pin');
  // console.log(window.slider);
  var imagePreview = document.querySelector('.img-upload__preview > img');

  window.pinEditor = function (scalePinProcent) {
    var filterChecked = document.querySelector('.effects__radio:checked + .effects__label > .effects__preview');
    imagePreview.style.filter = getComputedStyle(filterChecked).filter;

    var EFFECT_CHROME_COEFICIENT = 0.01;
    var EFFECT_SEPIA_COEFICIENT = 0.01;
    var EFFECT_MARVIN_COEFICIENT = 1;
    var EFFECT_FOBOS_COEFICIENT = 20;
    var EFFECT_HEAT_COEFICIENT = 20;


    var filterValue = '';
    switch (imagePreview.className) {
      case 'effects__preview--none':
        filterValue = '';
        break;
      case 'effects__preview--chrome':
        filterValue = 'grayscale(' + scalePinProcent * EFFECT_CHROME_COEFICIENT + ')';
        break;
      case 'effects__preview--sepia':
        filterValue = 'sepia(' + scalePinProcent * EFFECT_SEPIA_COEFICIENT + ')';
        break;
      case 'effects__preview--marvin':
        filterValue = 'invert(' + scalePinProcent * EFFECT_MARVIN_COEFICIENT + '%)';
        break;
      case 'effects__preview--phobos':
        filterValue = 'blur(' + scalePinProcent / EFFECT_FOBOS_COEFICIENT + 'px)';
        break;
      case 'effects__preview--heat':
        filterValue = 'brightness(' + scalePinProcent / EFFECT_HEAT_COEFICIENT + ')';
        break;
      default:
        break;
    }


    imagePreview.style.filter = filterValue;
  };


  var resetEditor = function () {
    effectLevelDepth.style.width = SCALE_PIN_MAX + 'px';
    scalePin.style.left = SCALE_PIN_MAX + 'px';
    scaleControlValue.value = SCALE_PIN_MAX_PERCENT + '%';
    imagePreview.className = '';
  }; resetEditor();

  // Делегирование еффектов
  var addEventToEffect = function (effect) {
    effect.addEventListener('click', function () {
      resetEditor();
      imagePreview.className = effect.classList[1];
      window.pinEditor(SCALE_PIN_MAX_PERCENT);
    });
  };

  var effectPreviews = imgUploadOverlay.querySelectorAll('.effects__preview');
  for (var i = 0; i < effectPreviews.length; i++) {
    var effect = effectPreviews[i];
    addEventToEffect(effect);
  }


  // ------------------------------------------------------------
  // imgUploadOverlay.classList.remove('hidden');

  // // Открывание и закрывание редактора
  // var onEditorPressESC = function (evt) {
  //   if (evt.keyCode === ESCAPE_KEYCODE) {
  //     closeEditor();
  //   }
  // };

  // var openEditor = function () {
  //   imgUploadOverlay.classList.remove('hidden');

  //   document.addEventListener('keydown', onEditorPressESC);
  //   window.pinEditor();
  // };

  // var closeEditor = function () {
  //   imgUploadOverlay.classList.add('hidden');
  //   uploadFile.value = '';

  //   document.removeEventListener('keydown', onEditorPressESC);
  // };

  // uploadFile.addEventListener('change', function () {
  //   openEditor();
  // });

  // uploadCancel.addEventListener('click', function () {
  //   closeEditor();
  // });

  // var hashtagInput = document.querySelector('.text__hashtags');

  // hashtagInput.addEventListener('invalid', function () {
  //   if (hashtagInput.validity.tooShort) {
  //     hashtagInput.setCustomValidity('Больше хештегов, богу хештегов!');
  //   } else if (hashtagInput.validity.tooLong) {
  //     hashtagInput.setCustomValidity('Ну нет много, же...');
  //   } else {
  //     hashtagInput.setCustomValidity('');
  //   }
  // });

  // var submitButton = document.querySelector('.img-upload__submit');

  // hashtagInput.addEventListener('input', function (evt) {
  //   var target = evt.target;
  //   if (target.value.length < 2) {
  //     hashtagInput.setCustomValidity('И это по твойму хештег?');
  //   } else {
  //     var arrTarget = target.value.split(' ');
  //     // console.log(arrTarget);

  //     for (var k = 0; k < arrTarget.length; k++) {
  //       var targetElement = arrTarget[k];
  //       if (targetElement[0] !== '#' || targetElement[0] === '#' && targetElement[1] === '#') {
  //         // console.log('error');
  //         hashtagInput.setCustomValidity('Больше хештегов, богу хештегов!');
  //         target.setCustomValidity('Больше хештегов, богу хештегов!');
  //         submitButton.disabled = true;
  //       } else {
  //         submitButton.disabled = false;
  //         target.setCustomValidity('');
  //       }
  //     }
  //     // target.setCustomValidity('bad');
  //   }
  // });

  // var formUpload = document.querySelector('.img-upload__form');
  // formUpload.addEventListener('submit', function (formEvt) {
  //   window.backend.save(new FormData(formUpload), function () {
  //     closeEditor();
  //   });
  //   formEvt.preventDefault();

  // });
})();
