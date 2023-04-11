import {shuffleArray, debounce} from './util.js';
import {displayPhotos} from './display-photo.js';

const imgFilter = document.querySelector('.img-filters');
const filtersForm = imgFilter.querySelector('.img-filters__form');
const RANDOM_PHOTOS_COUNT = 10;

const filterCallback = {
  'filter-default': (data) => data,
  'filter-random': (data) => shuffleArray(data.slice()).slice(0, RANDOM_PHOTOS_COUNT),
  'filter-discussed': (data) => data.slice().sort((a, b) => b.likes - a.likes),
};

//Показывает фильтр

const initFilters = (data) => {
  let currentButton = filtersForm.querySelector('.img-filters__button--active');
  filtersForm.addEventListener('click', debounce((evt) => {
    const {id} = evt.target;
    if (filterCallback[id] && !evt.target.matches('.img-filters__button--active:not(#filter-random)')) {
      displayPhotos(filterCallback[id](data));
      currentButton.classList.remove('img-filters__button--active');
      currentButton = evt.target;
      currentButton.classList.add('img-filters__button--active');
    }
  }));
  imgFilter.classList.remove('img-filters--inactive');
};

export {initFilters};
