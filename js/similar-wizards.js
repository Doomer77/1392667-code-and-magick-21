'use strict';

(function () {

  const wizardsContainer = window.util.monipulateElementDOM('.setup-similar');

  const createSimilarWizards = (loadedData) => {
    window.similarWizards = loadedData;
    window.updateWizards(window.similarWizards);
    wizardsContainer.classList.remove('hidden');
  };

  window.backend.load(createSimilarWizards, window.util.showError);
})();
