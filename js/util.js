'use strict';

window.util = (function () {
  return {
    WIZARDS_DATA: {
      WIZARD_COUNT: 4,
      NAMES: [
        'Иван',
        'Хуан Себастьян',
        'Мария',
        'Кристоф',
        'Виктор',
        'Юлия',
        'Люпита',
        'Вашингтон'
      ],
      SURNAMES: [
        'да Марья',
        'Верон',
        'Мирабелла',
        'Вальц',
        'Онопко',
        'Топольницкая',
        'Нионго',
        'Ирвинг'
      ],
      COAT_COLORS: [
        'rgb(101, 137, 164)',
        'rgb(241, 43, 107)',
        'rgb(146, 100, 161)',
        'rgb(56, 159, 117)',
        'rgb(215, 210, 55)',
        'rgb(0, 0, 0)'
      ],
      EYES_COLORS: [
        'black',
        'red',
        'blue',
        'yellow',
        'green'
      ],
      FIREBALL_COLORS: [
        '#ee4830',
        '#30a8ee',
        '#5ce6c0',
        '#e848d5',
        '#e6e848'
      ]
    },
    KEY_NAME: {
      ENTER: 'Enter',
      ESC: 'Escape'
    },
    monipulateElementDOM: function (element) {
      const result = document.querySelector(element);
      return result;
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === this.KEY_NAME.ENTER) {
        action();
      }
    },
    getMaxElement: function (arr) {
      return Math.max.apply(null, arr);
    },
    getRandomNum: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomValue: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    showError: function (errorMessage) {
      let errorContainer = document.createElement('div');
      let hideError = () => {
        errorContainer.classList.add('hidden');
      };

      errorContainer.textContent = errorMessage;
      errorContainer.classList.add('error');
      document.body.appendChild(errorContainer);

      setTimeout(hideError, 5000);
    }
  };
})();
