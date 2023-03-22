import {createPhotoObjects} from './create-photo-object.js';
import {displayPhoto} from './display-photo.js';

displayPhoto(createPhotoObjects());
//---------------------------------------------

const list = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPicturesCancel = document.querySelector('.big-picture__cancel');
const bigPicturesImg = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const isEscapeKey = (evt) => evt.key === 'Escape';
// Открыть
list.addEventListener('click', (evt) => {
  bigPicture.classList.remove('hidden');
  const parent = evt.target.parentNode;
  bigPicturesImg.firstElementChild.src = evt.target.src;
  // console.log(evt.target.parentNode);
  likesCount.textContent = parent.querySelector('.picture__likes').textContent;
  commentsCount.textContent = parent.querySelector('.picture__comments').textContent;
});
// Закрыть
bigPicturesCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  if (isEscapeKey()) {
    bigPicture.classList.add('hidden');
  }
});
