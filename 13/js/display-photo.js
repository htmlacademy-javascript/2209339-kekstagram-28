import {displayFullSizePhoto} from './display-fillsize-photo.js';
const list = document.querySelector('.pictures');
const elementTemplate = document.querySelector('#picture').content.querySelector('.picture');

const displayPhotos = (photos) => {
  list.querySelectorAll('.picture').forEach((element) => element.remove());
  photos.forEach((photo) => {
    const element = elementTemplate.cloneNode(true);
    element.querySelector('.picture__img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    element.addEventListener('click', () => {
      displayFullSizePhoto(photo);
    });
    list.appendChild(element);
  });
};

export {displayPhotos};
