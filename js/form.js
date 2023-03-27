import {isEscapeKey} from './util.js';

const overlay = document.querySelector('.img-upload__overlay');
const imgUploadStart = document.querySelector('.img-upload__start');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const hashtagRegex = /^#[a-zа-я0-9]{1, 19}$/i;
const HASHTAGS_LIMIT = 5;
const TAG_ERROR_TEXT = 'Неправильно заполнен хэштеги';

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});


// Валидация хэштега
const isVaildTag = (tag) => hashtagRegex.test(tag);

const hasVaildCount = (tags) => tags.length <= HASHTAGS_LIMIT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ');
  return hasVaildCount(tags) && hasUniqueTags(tags) && tags.every(isVaildTag);
};

// const validateTags = (value) => {
//   const hashtags = value.trim().split(' ');
//   if (hashtags.length > HASHTAGS_LIMIT) {
//     return false;
//   }
//   for (const hashtag of hashtags) {
//     if (!hashtagRegex.test(hashtag)) {
//       return false;
//     }
//     const uniqueHashtags = hashtags.filter((item) => item === hashtag);
//     if (uniqueHashtags.length > 1) {
//       return false;
//     }
//   }
//   return true;
// };

pristine.addValidator(
  textHashtags,
  validateTags,
  TAG_ERROR_TEXT
);

// imgUploadForm.addEventListener('submit', (evt) => {
//   const isValid = pristine.validate();
//   if (!isValid) {
//     evt.preventDefault();
//   }
// });

// Закрывает модальное окно с формой
const hideModal = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadForm.reset();
  document.removeEventListener('keydown', onDocumentKeyDown);
};

// Открывает модальное окно с формой
const showModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
};

// Закрывает модальное окно с формой по нажатию ESC
const isTextFieldFocused = () => document.activeElement === textHashtags || document.activeElement === textDescription;

function onDocumentKeyDown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

imgUploadStart.addEventListener('change', showModal);
imgUploadCancel.addEventListener('click', hideModal);
