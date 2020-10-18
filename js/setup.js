'use strict';

// customize the wizard
(function () {
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

  wizardCoat.addEventListener('click', onCoatClick);
  wizardEyes.addEventListener('click', onEyesClick);
  fireball.addEventListener('click', onFireballClick);

})();


