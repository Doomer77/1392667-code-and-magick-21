'use strict';

(function () {
  const URL = {
    DOWNLOAD: 'https://21.javascript.pages.academy/code-and-magick/data',
    UPLOAD: 'https://21.javascript.pages.academy/code-and-magick'
  };

  const SERVER_CODE = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    ENTERNAL_ERROR: 500
  };

  const createXHR = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', ()=> {
      switch (xhr.status) {
        case SERVER_CODE.SUCCESS:
          onLoad(xhr.response);
          break;
        case SERVER_CODE.BAD_REQUEST:
          onError('Произошла ошибка сервера: неверный запрос');
          break;
        case SERVER_CODE.NOT_FOUND:
          onError('Произошла ошибка сервера: запрашиваемый ресурс не найден');
          break;
        case SERVER_CODE.ENTERNAL_ERROR:
          onError('Произошла внутренняя ошибка сервера');
          break;
        default:
          onError(`Произошла ошибка сервера: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener('error', ()=> {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', () => {
      onError('Запрос к серверу не успел выполниться за отведённое время');
    });

    return xhr;
  };

  const loadData = (onLoad, onError) => {
    let xhr = createXHR(onLoad, onError);
    xhr.open('GET', URL.DOWNLOAD);
    xhr.send();
  };

  const saveData = (data, onLoad, onError) => {
    let xhr = createXHR(onLoad, onError);
    xhr.open('POST', URL.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    save: saveData
  };

})();
