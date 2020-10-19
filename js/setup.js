'use strict';

// customize the wizard
(function () {
  const popup = window.util.monipulateElementDOM('.setup');
  const setupForm = popup.querySelector('.setup-wizard-form');
  const setupFormBtn = setupForm.querySelector('.setup-submit');

  const wizard = window.util.monipulateElementDOM('.setup-wizard-appearance');
  const wizardCoat = wizard.querySelector('.wizard-coat');
  const wizardCoatColor = wizard.querySelector('input[name="coat-color"]');
  const wizardEyes = wizard.querySelector('.wizard-eyes');
  const wizardEyesColor = wizard.querySelector('input[name="eyes-color"]');
  const fireball = window.util.monipulateElementDOM('.setup-fireball-wrap');
  const fireballColor = fireball.querySelector('input[name="fireball-color"]');

  const getNextColor = (colors, currentColor) => {
    const currentColorIndex = colors.indexOf(currentColor);
    return currentColorIndex !== colors.length - 1 ? colors[currentColorIndex + 1] : colors[0];
  };

  const onCoatClick = () => {
    wizardCoatColor.value = getNextColor(window.util.WIZARDS_DATA.COAT_COLORS, wizardCoatColor.value);
    wizardCoat.style.fill = wizardCoatColor.value;
  };

  const onEyesClick = () => {
    wizardEyesColor.value = getNextColor(window.util.WIZARDS_DATA.EYES_COLORS, wizardEyesColor.value);
    wizardEyes.style.fill = wizardEyesColor.value;
  };

  const onFireballClick = () => {
    fireballColor.value = getNextColor(window.util.WIZARDS_DATA.FIREBALL_COLORS, fireballColor.value);
    fireball.style.background = fireballColor.value;
  };

  const onFormSendSuccess = () => {
    popup.classList.add('hidden');
    setupFormBtn.disabled = false;
  };

  const onFormSendError = (errorMessage) => {
    window.util.showError(errorMessage);
    setupFormBtn.disabled = false;
  };

  setupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    setupFormBtn.disabled = true;

    window.backend.save(new FormData(setupForm), onFormSendSuccess, onFormSendError);
  });

  wizardCoat.addEventListener('click', onCoatClick);
  wizardEyes.addEventListener('click', onEyesClick);
  fireball.addEventListener('click', onFireballClick);

})();


