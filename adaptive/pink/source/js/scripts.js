var header = document.querySelector('.page-header');
var nav = header.querySelector('.main-nav');
var toggle = nav.querySelector('.main-nav__toggle');

toggle.addEventListener('click', function () {
  if (nav.classList.contains('main-nav--opened')) {
    header.classList.remove('page-header--full');
    nav.classList.remove('main-nav--opened');
    nav.classList.add('main-nav--closed');
  } else {
    header.classList.add('page-header--full');
    nav.classList.add('main-nav--opened');
    nav.classList.remove('main-nav--closed');
  }
})