'use strict';

const monipulateElementDOM = (element, removeClass) => {
  const result = document.querySelector(element);
  if (removeClass) {
    return result.classList.remove(removeClass);
  } else {
    return result;
  }
};

monipulateElementDOM('.setup', 'hidden');
monipulateElementDOM('.setup-similar', 'hidden');
const setupSimilarList = monipulateElementDOM('.setup-similar-list');
const wizardTemplate = monipulateElementDOM('#similar-wizard-template');
const wizardTemplateContent = wizardTemplate.content.querySelector('.setup-similar-item');

const WIZARD_COUNT = 4;

const WIZARDS_DATA = {
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
  COATCOLORS: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  EYESCOLORS: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};

const getRandomValue = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const createWizards = (wizardData) => {
  let wizards = [];
  for (let i = 0; i < WIZARD_COUNT; i++) {
    wizards.push({
      name: `${getRandomValue(wizardData.NAMES)} ${getRandomValue(wizardData.SURNAMES)}`,
      coatColor: getRandomValue(wizardData.COATCOLORS),
      eyesColor: getRandomValue(wizardData.EYESCOLORS)
    });
  }
  return wizards;
};

const createOtherWizards = (template, wizard) => {
  let otherWizard = template.cloneNode(true);
  otherWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  otherWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  otherWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return otherWizard;
};

const getWizards = (wizards) => {
  let wizardsFragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    wizardsFragment.appendChild(createOtherWizards(wizardTemplateContent, wizards[i]));
  }
  return wizardsFragment;
};

const renderWizardsSetup = () => {
  let wizards = createWizards(WIZARDS_DATA);
  let similarWizards = getWizards(wizards);

  setupSimilarList.appendChild(similarWizards);
};

renderWizardsSetup();
