'use strict';

(function () {
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
    var commentsCountShows = document.querySelector('.comments-count-shows');

    bigPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onBigPhotoPressESC);

    bigPhoto.querySelector('img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.social__caption').textContent = photo.description;

    var socialComments = document.querySelector('.social__comments');
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }

    var socialCommentCount = document.querySelector('.social__comment-count');
    var commentLoader = document.querySelector('.comments-loader');
    socialCommentCount.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');

    var fragment = document.createDocumentFragment();
    if (photo.comments.length > 5) {
      var viewedComments = 5;
    } else {
      viewedComments = photo.comments.length;
    }
    commentsCountShows.innerHTML = viewedComments;
    var i = 0;

    var showMoreComments = function () {
      for (i; i < viewedComments; i++) {
        fragment.appendChild(renderComments(photo.comments[i]));
      }
      // while (socialComments.firstChild) {
      //   socialComments.removeChild(socialComments.firstChild);
      // }
      socialComments.appendChild(fragment);
    }; showMoreComments();


    var loadMoreComments = function () {
      if (viewedComments < photo.comments.length - 5) {
        viewedComments += 5;
      } else {
        viewedComments = photo.comments.length;
        commentLoader.removeEventListener('click', loadMoreComments);
        commentLoader.classList.add('visually-hidden');
      }
      commentsCountShows.innerHTML = viewedComments;
      window.debounce(showMoreComments);
    };


    if (viewedComments < photo.comments.length) {
      commentLoader.addEventListener('click', loadMoreComments);
      socialCommentCount.classList.remove('visually-hidden');
      commentLoader.classList.remove('visually-hidden');
    }
  };

  var addPictureLinkHandler = function (picture, photo) {
    picture.addEventListener('click', function (evt) {
      evt.preventDefault();
      doBigPhoto(photo);
    });
  };

  window.render = function (newArray) {
    // pictures.nextSibling = false;
    var imgUpload = document.querySelector('.img-upload');
    while (imgUpload.nextSibling) {
      imgUpload.nextSibling.remove();
    }
    // pictures.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < newArray.length; i++) {
      fragment.appendChild(renderPhoto(newArray[i]));
    }
    pictures.appendChild(fragment);

    var picturesLinks = document.querySelectorAll('.picture');
    for (var j = 0; j < picturesLinks.length; j++) {
      var pictureItem = picturesLinks[j];
      addPictureLinkHandler(pictureItem, newArray[j]);
    }
  };

  var successHandler = function (photoArr) {
    var newArray = window.showFilter(photoArr);
    window.render(newArray);
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

  // preview-effect
  var ESCAPE_KEYCODE = 27;
  var SCALE_PIN_MAX = 450;
  var SCALE_PIN_MAX_PERCENT = 100;

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
  var scalePin = imgUploadOverlay.querySelector('.effect-level__pin');

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
})();
