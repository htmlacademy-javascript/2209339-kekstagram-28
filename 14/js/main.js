import {setUserFormSubmit} from './form.js';
import {displayPhotos} from './display-photo.js';
import {showAlert} from './util.js';
import {getData} from './api.js';
import {initFilters} from './filter.js';
import {fileChooser} from './file-chooser.js';

getData()
  .then((data) => {
    displayPhotos(data);
    initFilters(data);
  })
  .catch(() => {
    showAlert('Не удалось загрузить фотографии. Перезагрузите страницу.');
  });

setUserFormSubmit();
fileChooser();
