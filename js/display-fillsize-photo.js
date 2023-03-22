import {isEscapeKey} from './util.js';
const bigPicture = document.querySelector('.big-picture');
const bigPicturesCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPicturesImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = bigPicture.querySelector('.social__comment');
const socialCaption = bigPicture.querySelector('.social__caption');
// Открыть
const displayComment = (comment) => {
  const socialComment = socialCommentTemplate.cloneNode(true);
  const socialPicture = socialComment.querySelector('.social__picture');
  const socialText = socialComment.querySelector('.social__text');
  socialPicture.src = comment.avatar;
  socialPicture.alt = comment.name;
  socialText.textContent = comment.message;
  commentsList.append(socialComment);
};

const displayComments = (comments) => {
  commentsList.innerHTML = '';
  for (const comment of comments) {
    displayComment(comment);
  }
}

const displayFullSizePhoto = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPicturesImg.src = photo.url;
  bigPicturesImg.alt = photo.description;
  socialCaption.textContent = photo.description;
  likesCount.textContent = photo.like;
  commentsCount.textContent = photo.comments.length;
  displayComments(photo.comments)
};


// Закрыть
const closeModal () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal()
  }
});

bigPicturesCancel.addEventListener('click', () => {
  closeModal()
});

export {displayFullSizePhoto};
