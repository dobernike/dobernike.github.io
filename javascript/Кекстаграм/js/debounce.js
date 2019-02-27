'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.debounce = function (showMoreComments) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      showMoreComments();
    }, DEBOUNCE_INTERVAL);
  };
})();

