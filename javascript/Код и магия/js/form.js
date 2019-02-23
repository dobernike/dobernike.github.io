'use strict';

(function () {
  var overlay = document.querySelector('.overlay');
  var form = overlay.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      overlay.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();
