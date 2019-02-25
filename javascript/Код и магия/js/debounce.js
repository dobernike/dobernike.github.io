'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout;

  window.debounce = function (updateWizards) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateWizards();
    }, DEBOUNCE_INTERVAL);
  };
})();

