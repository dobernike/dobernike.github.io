'use strict';

(function () {
  var xhrFunction = function (method, URL, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(method, URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка!');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания: ' + xhr.timeout + 'мс');
    });

    xhr.send(data);

  };

  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/kekstagram/data';

      xhrFunction('GET', URL, onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/kekstagram';

      xhrFunction('POST', URL, onLoad, onError, data);
    }
  };
})();
