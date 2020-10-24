'use strict';


(function () {
  const DEBOUNCE_INTERVAL = 500;

  let lastTimeout;


  const removeDebounce = (callback) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(callback, DEBOUNCE_INTERVAL);
  };


  window.debounce = removeDebounce;
})();
