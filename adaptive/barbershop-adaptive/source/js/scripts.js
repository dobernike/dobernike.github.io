var ESC_KEYCODE = 27;

var navMain = document.querySelector('.main-nav');
navMain.classList.remove('main-nav--nojs');

var navToggle = navMain.querySelector('.main-nav__toggle');
navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

var modalLogin = document.querySelector('.modal-login');
var modalOverlay = document.querySelector('.modal-overlay');

var userNameInput = modalLogin.querySelector('.modal-login__input');
var escPressClosePopup = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameInput) {
    closePopup();
  } else if (evt.keyCode === ESC_KEYCODE && document.activeElement === userNameInput) {
    userNameInput.blur();
  }
};

var openPopup = function (evt) {
  evt.preventDefault();

  if (navMain.classList.contains('main-nav--opened')) {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }

  modalLogin.classList.add('modal-show');
  modalOverlay.classList.add('modal-show');
};

var closePopup = function () {
  modalLogin.classList.remove('modal-show');
  modalOverlay.classList.remove('modal-show');
  document.removeEventListener('keydown', escPressClosePopup);
};

var userListLogin = navMain.querySelector('.user-list__login');
userListLogin.addEventListener('click', function (evt) {
  openPopup(evt);
  document.addEventListener('keydown', escPressClosePopup);

});

var modalLoginButtonClose = modalLogin.querySelector('.modal-login__button--close');
modalLoginButtonClose.addEventListener('click', function () {
  closePopup();
});