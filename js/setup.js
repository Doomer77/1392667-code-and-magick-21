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

//  opening and closing the hero settings window
const windowSetups = monipulateElementDOM('.setup');
const windowSetupsOpen = monipulateElementDOM('.setup-open');
const windowSetupsClose = monipulateElementDOM('.setup-close');
const submitBtn = monipulateElementDOM('.setup-submit');
const form = monipulateElementDOM('form');

const onSetupEscPress = (evt) => {
  if (evt.key === KEY_NAME.ESC) {
    evt.preventDefault();
    closeSetup();
  }
};

const openSetup = () => {
  windowSetups.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

const closeSetup = () => {
  windowSetups.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
};

windowSetupsOpen.addEventListener('click', () => {
  openSetup();
});

windowSetupsOpen.addEventListener('keydown', (evt) => {
  if (evt.key === KEY_NAME.ENTER) {
    openSetup();
  }
});

windowSetupsClose.addEventListener('click', () => {
  closeSetup();
});

windowSetupsClose.addEventListener('keydown', (evt) => {
  if (evt.key === KEY_NAME.ENTER) {
    closeSetup();
  }
});

const NAME_LENGTH = {
  MIN: 2,
  MAX: 25
};

//  checking the player name input field
const userNameInput = monipulateElementDOM('.setup-user-name');

userNameInput.addEventListener('input', () => {
  let valueLength = userNameInput.value.length;

  if (valueLength < NAME_LENGTH.MIN) {
    userNameInput.setCustomValidity(`Ещё ${NAME_LENGTH.MIN - valueLength} симв.`);
  } else if (valueLength > NAME_LENGTH.MAX) {
    userNameInput.setCustomValidity(`Удалите лишние ${valueLength - NAME_LENGTH.MAX} симв.`);
  } else {
    userNameInput.setCustomValidity('');
  }

  userNameInput.reportValidity();
});

//  hero customization
const wizard = monipulateElementDOM('.setup-wizard-appearance');
const wizardCoat = wizard.querySelector('.wizard-coat');
const wizardCoatColor = wizard.querySelector('input[name="coat-color"]');
const wizardEyes = wizard.querySelector('.wizard-eyes');
const wizardEyesColor = wizard.querySelector('input[name="eyes-color"]');

const fireball = monipulateElementDOM('.setup-fireball-wrap');
const fireballColor = fireball.querySelector('input[name="fireball-color"]');


const getNextColor = (colors, currentColor) => {
  let currentColorIndex = colors.indexOf(currentColor);

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
const coatValue = wizardCoat.addEventListener('click', onCoatClick);
const eyesValue = wizardEyes.addEventListener('click', onEyesClick);
const fireballValue = fireball.addEventListener('click', onFireballClick);

//  submit form
const submitSetup = () => {
  form.addEventListener('submit', () => {
    return {
      userNameInput,
      coatValue,
      eyesValue,
      fireballValue
    };
  });
};

submitBtn.addEventListener('keydown', (evt) => {
  if (evt.key === KEY_NAME.ENTER) {
    submitSetup();
  }
});
