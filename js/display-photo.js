import {createPhotoObjects} from './create-photo-object.js';

const list = document.querySelector('.pictures');
const elementTemplate = document.querySelector('#picture').content.querySelector('.picture');

const arrayPhotos = createPhotoObjects();

const displayPhoto = arrayPhotos.forEach((photo) => {
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = photo.url;
  element.querySelector('.picture__likes').textContent = photo.like;
  element.querySelector('.picture__comments').textContent = photo.comments.length;
  list.appendChild(element);
});

export {displayPhoto};
