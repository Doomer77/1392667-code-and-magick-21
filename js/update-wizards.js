'use strict';


(function () {
  const wizardCoatColor = window.util.monipulateElementDOM('input[name="coat-color"]');
  const wizardEyesColor = window.util.monipulateElementDOM('input[name="eyes-color"]');
  const wizardTemplate = window.util.monipulateElementDOM('#similar-wizard-template').content;
  const wizardsList = window.util.monipulateElementDOM('.setup-similar-list');

  const getRank = (wizard) => {
    let rank = 0;
    if (wizard.colorCoat === wizardCoatColor.value) {
      rank += 2;
    }
    if (wizard.colorEyes === wizardEyesColor.value) {
      rank += 1;
    }
    return rank;
  };

  const compareNames = (left, right) => {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const sortWizards = (left, right) => {
    let difference = getRank(right) - getRank(left);
    if (difference === 0) {
      difference = compareNames(left.name, right.name);
    }
    return difference;
  };

  const createAnotherWizard = (template, wizard) => {
    let anotherWizard = template.cloneNode(true);

    anotherWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    anotherWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    anotherWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return anotherWizard;
  };

  const renderWizards = (wizards) => {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < window.util.WIZARDS_DATA.WIZARD_COUNT; i++) {
      fragment.appendChild(createAnotherWizard(wizardTemplate, wizards[i]));
    }
    wizardsList.innerHTML = '';
    wizardsList.appendChild(fragment);
  };


  const updateWizards = (wizards) => {
    wizards.sort(sortWizards);

    renderWizards(wizards);
  };


  window.updateWizards = updateWizards;
})();
