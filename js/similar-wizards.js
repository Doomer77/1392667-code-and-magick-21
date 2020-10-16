'use strict';

(function () {
  //  create wizards
  const createWizards = (WIZARDS_DATA) => {
    let wizards = [];
    for (let i = 0; i < WIZARDS_DATA.WIZARD_COUNT; i++) {
      wizards.push({
        name: `${window.util.getRandomValue(WIZARDS_DATA.NAMES)} ${window.util.getRandomValue(WIZARDS_DATA.SURNAMES)}`,
        coatColor: window.util.getRandomValue(WIZARDS_DATA.COAT_COLORS),
        eyesColor: window.util.getRandomValue(WIZARDS_DATA.EYES_COLORS)
      });
    }
    return wizards;
  };

  //  create other wizards
  const createOtherWizards = (template, wizard) => {
    let otherWizard = template.cloneNode(true);
    otherWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    otherWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    otherWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return otherWizard;
  };

  const getWizards = (wizards) => {
    let wizardsFragment = document.createDocumentFragment();
    let wizardTemplate = window.util.monipulateElementDOM('#similar-wizard-template');
    let wizardTemplateContent = wizardTemplate.content.querySelector('.setup-similar-item');
    for (let i = 0; i < wizards.length; i++) {
      wizardsFragment.appendChild(createOtherWizards(wizardTemplateContent, wizards[i]));
    }
    return wizardsFragment;
  };

  const renderWizardsSetup = () => {
    let wizards = createWizards(window.util.WIZARDS_DATA);
    let similarWizards = getWizards(wizards);
    let wizardsContainer = window.util.monipulateElementDOM('.setup-similar', 'hidden');
    let setupSimilarList = wizardsContainer.querySelector('.setup-similar-list');
    setupSimilarList.appendChild(similarWizards);
    wizardsContainer.classList.remove('hidden');
  };

  renderWizardsSetup();
})();
