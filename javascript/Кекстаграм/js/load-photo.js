'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#upload-file');
  var preview = document.querySelector('.img-upload__preview img');
  var effectsPreview = document.querySelectorAll('.effects__preview');

  var loadFiltersPreview = function (filterPreview) {
    filterPreview.forEach(function (it) {
      it.style.backgroundImage = 'url(' + preview.src + ')';
    });
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
        loadFiltersPreview(effectsPreview);
      });

      reader.readAsDataURL(file);
    }
  });
})();
// 'use strict';

// (function () {
//   var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

//   var fileChooser = document.querySelector('.upload input[type = file]');
//   var preview = document.querySelector('.setup-user-pic');

//   fileChooser.addEventListener('change', function () {
//     var file = fileChooser.files[0];
//     var fileName = file.name.toLowerCase();

//     var matches = FILE_TYPES.some(function (it) {
//       return fileName.endsWith(it);
//     });

//     if (matches) {
//       var reader = new FileReader();

//       reader.addEventListener('load', function () {
//         preview.src = reader.result;
//       });

//       reader.readAsDataURL(file);
//     }
//   });
// })();
