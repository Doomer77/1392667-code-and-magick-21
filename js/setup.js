'use strict';

let setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

let setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

let setupSimilarList = document.querySelector('.setup-similar-list');
let wizardTemplate = document.querySelector('#similar-wizard-template');
let wizardTemplateContent = wizardTemplate.content.querySelector('.setup-similar-item');

const WIZARDSDATA = {
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

const getRandomValue = (arrey) => {
  return arrey[Math.floor(Math.random() * arrey.length)];
};

const createWizards = (wizardData) => {
  let wizards = [];
  for (let i = 0; i < 4; i++) {
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
  let wizards = createWizards(WIZARDSDATA);
  let similarWizards = getWizards(wizards);

  setupSimilarList.appendChild(similarWizards);
};

renderWizardsSetup();
