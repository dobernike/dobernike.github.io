'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick/data';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL);

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          var error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
          onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('POST', URL);

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          var error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
          onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.send(data);
    }
  };


  // window.backend = function (url, onSuccess, onError) {

  //   var xhr = new XMLHttpRequest();

  //   xhr.responseType = 'json';

  //   xhr.addEventListener('load', function (evt) {
  //     var error;
  //     switch (xhr.status) {
  //       case 200:
  //         onSuccess(xhr.response);
  //         break;

  //       case 400:
  //         error = 'Неверный запрос';
  //         break;
  //       case 401:
  //         error = 'Пользователь не авторизован';
  //         break;
  //       case 404:
  //         error = 'Ничего не найдено';
  //         break;

  //       default:
  //         error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
  //     }

  //     if (error) {
  //       onError(error);
  //     }
  //   });

  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });

  //   xhr.addEventListener('timeout', function () {
  //     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  //   });

  //   xhr.timeout = 10000; // 10s

  //   xhr.open('GET', url);
  //   xhr.send();
  // };
})();

// main.js

// 'use strict';

// (function () {
//   var onError = function (message) {
//     console.error(message);
//   };

//   var onSuccess = function (data) {
//     console.log(data);
//   };

//   window.load('example.json', onSuccess, onError);
// })();
