import {setUserFormSubmit} from './form.js';
import {displayPhoto} from './display-photo.js';
import {showAlert} from './util.js';
import {getData} from './api.js';

getData()
  .then((data) => {
    displayPhoto(data);
  })
  .catch(() => {
    showAlert('Не удалось загрузить фотографии. Перезагрузите страницу.');
  });

setUserFormSubmit();
