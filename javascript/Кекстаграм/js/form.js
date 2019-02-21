'use strict';

(function () {
  var ESCAPE_KEYCODE = 27;
  // Открывание и закрывание редактора
  var onEditorPressESC = function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      closeEditor();
    }
  };

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var openEditor = function () {
    imgUploadOverlay.classList.remove('hidden');

    document.addEventListener('keydown', onEditorPressESC);
    window.pinEditor();
  };

  var uploadFile = document.querySelector('#upload-file');
  var closeEditor = function () {
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';

    document.removeEventListener('keydown', onEditorPressESC);
  };

  uploadFile.addEventListener('change', function () {
    openEditor();
  });

  var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
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

  var submitButton = document.querySelector('.img-upload__submit');

  hashtagInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      hashtagInput.setCustomValidity('И это по твойму хештег?');
    } else {
      var arrTarget = target.value.split(' ');
      // console.log(arrTarget);

      for (var k = 0; k < arrTarget.length; k++) {
        var targetElement = arrTarget[k];
        if (targetElement[0] !== '#' || targetElement[0] === '#' && targetElement[1] === '#') {
          // console.log('error');
          hashtagInput.setCustomValidity('Больше хештегов, богу хештегов!');
          target.setCustomValidity('Больше хештегов, богу хештегов!');
          submitButton.disabled = true;
        } else {
          submitButton.disabled = false;
          target.setCustomValidity('');
        }
      }
      // target.setCustomValidity('bad');
    }
  });

  var formUpload = document.querySelector('.img-upload__form');
  formUpload.addEventListener('submit', function (formEvt) {
    window.backend.save(new FormData(formUpload), function () {
      closeEditor();
    });
    formEvt.preventDefault();

  });

})();
