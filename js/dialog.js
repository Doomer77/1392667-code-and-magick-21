'use strict';

(function () {
  const setupWindow = window.util.monipulateElementDOM('.setup');
  const openBtn = window.util.monipulateElementDOM('.setup-open');
  const closeBtn = setupWindow.querySelector('.setup-close');
  const setupHandler = setupWindow.querySelector('.upload');
  const wizardName = setupWindow.querySelector('.setup-user-name');

  // open / close window
  const onEscPress = (evt) => {
    if (evt.key === window.util.KEY_NAME.ESC && evt.target !== wizardName) {
      closeSetup();
    }
  };

  const openSetup = () => {
    setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  const closeSetup = () => {
    setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
    setupWindow.style = '';
  };

  const onOpenBtnEnterPress = (evt) => {
    window.util.isEnterEvent(evt, openSetup);
  };

  const onCloseBtnEnterPress = (evt) => {
    window.util.isEnterEvent(evt, closeSetup);
  };

  openBtn.addEventListener('click', openSetup);
  closeBtn.addEventListener('click', closeSetup);

  openBtn.addEventListener('keydown', onOpenBtnEnterPress);
  closeBtn.addEventListener('keydown', onCloseBtnEnterPress);

  // drag the window
  const onClickPreventDefault = (clickEvt) => {
    clickEvt.preventDefault();
    setupHandler.removeEventListener('click', onClickPreventDefault);
  };

  const onMouseDown = (downEvt) => {
    let initialCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    let isDragMove = false;

    const onMouseMove = (moveEvt) => {
      isDragMove = true;

      const shift = {
        x: initialCoords.x - moveEvt.clientX,
        y: initialCoords.y - moveEvt.clientY
      };

      setupWindow.style.left = (setupWindow.offsetLeft - shift.x) + 'px';
      setupWindow.style.top = (setupWindow.offsetTop - shift.y) + 'px';

      initialCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    };

    const onMouseUp = () => {
      if (isDragMove) {
        setupHandler.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  setupHandler.addEventListener('mousedown', onMouseDown);
})();
