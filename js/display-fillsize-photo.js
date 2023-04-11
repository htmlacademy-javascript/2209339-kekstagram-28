import { isEscapeKey } from './util.js';
const bigPicture = document.querySelector('.big-picture');
const bigPicturesCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPicturesImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentTemplate = bigPicture.querySelector('.social__comment');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const COUNT = 5;
let start = 0;
let currentComments = [];

const displayComment = (comment) => {
  const socialComment = socialCommentTemplate.cloneNode(true);
  const socialPicture = socialComment.querySelector('.social__picture');
  const socialText = socialComment.querySelector('.social__text');
  socialPicture.src = comment.avatar;
  socialPicture.alt = comment.name;
  socialText.textContent = comment.message;
  commentsList.append(socialComment);
};

const displayComments = () => {
  const limit = start + COUNT;
  for (const comment of currentComments.slice(start, limit)) {
    displayComment(comment);
  }
  socialCommentCount.textContent = `${Math.min(currentComments.length, limit)} из ${currentComments.length} комментариев`;
  start += COUNT;
  if (currentComments.length <= limit) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

commentsLoader.addEventListener('click', () => {
  displayComments();
});

const displayFullSizePhoto = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPicturesImg.src = photo.url;
  bigPicturesImg.alt = photo.description;
  socialCaption.textContent = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  commentsList.innerHTML = '';
  currentComments = photo.comments;
  start = 0;
  displayComments();
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
});

bigPicturesCancel.addEventListener('click', () => {
  closeModal();
});

export { displayFullSizePhoto };
