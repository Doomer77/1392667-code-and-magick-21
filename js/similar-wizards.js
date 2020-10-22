'use strict';

(function () {

  const wizardTemplate = window.util.monipulateElementDOM('#similar-wizard-template').content;
  const wizardsContainer = window.util.monipulateElementDOM('.setup-similar');
  const wizardsList = wizardsContainer.querySelector('.setup-similar-list');

  //  create other wizards
  const createOtherWizards = (template, wizard) => {
    let otherWizard = template.cloneNode(true);
    otherWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    otherWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    otherWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return otherWizard;
  };

  const onWizardsLoadSuccess = (wizards) => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < window.util.WIZARDS_DATA.WIZARD_COUNT; i++) {
      fragment.appendChild(createOtherWizards(wizardTemplate, wizards[i]));
    }

    wizardsList.appendChild(fragment);
    wizardsContainer.classList.remove('hidden');
  };

  window.backend.load(onWizardsLoadSuccess, window.util.showError);
})();
