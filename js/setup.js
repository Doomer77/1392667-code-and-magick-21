'use strict';

// element search and class deletion
const monipulateElementDOM = (element, removeClass) => {
  const result = document.querySelector(element);
  if (removeClass) {
    return result.classList.remove(removeClass);
  } else {
    return result;
  }
};

monipulateElementDOM('.setup-similar', 'hidden');
const setupSimilarList = monipulateElementDOM('.setup-similar-list');
const wizardTemplate = monipulateElementDOM('#similar-wizard-template');
const wizardTemplateContent = wizardTemplate.content.querySelector('.setup-similar-item');

const WIZARD_COUNT = 4;

//  wizards data
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
};

const KEY_NAME = {
  ENTER: 'Enter',
  ESC: 'Escape'
};

//  search for a random number
const getRandomValue = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

//  create wizards
const createWizards = (wizardData) => {
  let wizards = [];
  for (let i = 0; i < WIZARD_COUNT; i++) {
    wizards.push({
      name: `${getRandomValue(wizardData.NAMES)} ${getRandomValue(wizardData.SURNAMES)}`,
      coatColor: getRandomValue(wizardData.COAT_COLORS),
      eyesColor: getRandomValue(wizardData.EYES_COLORS)
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

// opening / closing the character customization window
const openingClosingWindowWizards = () => {
  const setupWindow = monipulateElementDOM('.setup');
  const wizardName = setupWindow.querySelector('.setup-user-name');
  const openBtn = monipulateElementDOM('.setup-open');
  const closeBtn = setupWindow.querySelector('.setup-close');

  const openSetup = () => {
    setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  const closeSetup = () => {
    setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = (evt) => {
    if (evt.key === KEY_NAME.ESC && evt.target !== wizardName) {
      closeSetup();
    }
  };

  closeBtn.addEventListener('click', closeSetup);
  openBtn.addEventListener('click', openSetup);

  openBtn.addEventListener('keydown', (evt) => {
    if (evt.key === KEY_NAME.ENTER) {
      openSetup();
    }
  });

  closeBtn.addEventListener('keydown', (evt) => {
    if (evt.key === KEY_NAME.ENTER) {
      closeSetup();
    }
  });
};

// customize the wizard
const customizeWizard = () => {
  const wizard = monipulateElementDOM('.setup-wizard-appearance');
  const wizardCoat = wizard.querySelector('.wizard-coat');
  const wizardCoatColor = wizard.querySelector('input[name="coat-color"]');
  const wizardEyes = wizard.querySelector('.wizard-eyes');
  const wizardEyesColor = wizard.querySelector('input[name="eyes-color"]');
  const fireball = monipulateElementDOM('.setup-fireball-wrap');
  const fireballColor = fireball.querySelector('input[name="fireball-color"]');

  const getNextColor = (colors, currentColor) => {
    const currentColorIndex = colors.indexOf(currentColor);
    return currentColorIndex !== colors.length - 1 ? colors[currentColorIndex + 1] : colors[0];
  };

  const onCoatClick = () => {
    wizardCoatColor.value = getNextColor(WIZARDS_DATA.COAT_COLORS, wizardCoatColor.value);
    wizardCoat.style.fill = wizardCoatColor.value;
  };

  const onEyesClick = () => {
    wizardEyesColor.value = getNextColor(WIZARDS_DATA.EYES_COLORS, wizardEyesColor.value);
    wizardEyes.style.fill = wizardEyesColor.value;
  };

  const onFireballClick = () => {
    fireballColor.value = getNextColor(WIZARDS_DATA.FIREBALL_COLORS, fireballColor.value);
    fireball.style.background = fireballColor.value;
  };


  wizardCoat.addEventListener('click', onCoatClick);
  wizardEyes.addEventListener('click', onEyesClick);
  fireball.addEventListener('click', onFireballClick);
};

openingClosingWindowWizards();
customizeWizard();
