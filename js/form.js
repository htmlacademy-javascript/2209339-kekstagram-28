import {isEscapeKey} from './util.js';

const overlay = document.querySelector('.img-upload__overlay');
const imgUploadStart = document.querySelector('.img-upload__start');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const hashtagRegex = /[a-zа-я0-9]$/i;
const HASHTAGS_LIMIT = 5;
const HASHTAGS_MAXLENGTH = 20;
// const TAG_ERROR_TEXT = 'Хэштег должен начинатся с решетки и состоять только из букв и цифр. Длина хештега должна быть не более 20 символов. Количество хэштегов не должно превышать 5 и они не должны повторятся.';

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error',
});


// Валидация хэштега

const getTagsFromValue = (value) => value.trim().toLowerCase().split(' ');

pristine.addValidator(
  textHashtags,
  (value) => getTagsFromValue(value).length <= HASHTAGS_LIMIT,
  'Не более 5 хэштегов'
);

pristine.addValidator(
  textHashtags,
  (value) => getTagsFromValue(value).every((tag) => !tag || hashtagRegex.test(tag)),
  'Хэштег должен состоять только из букв и цифр.'
);

pristine.addValidator(
  textHashtags,
  (value) => getTagsFromValue(value).every((tag) => !tag || tag.startsWith('#')),
  'Хэштег должен начинаться с решетки'
);

pristine.addValidator(
  textHashtags,
  (value) => getTagsFromValue(value).every((tag) => tag.length <= HASHTAGS_MAXLENGTH),
  'Длина хештега должна быть не более 20 символов'
);

pristine.addValidator(
  textHashtags,
  (value) => {
    const tags = getTagsFromValue(value);
    return tags.length === new Set(tags).size;
  },
  'Хэштеги не должны повторятся'
);

// const isValidTag = (tag) => hashtagRegex.test(tag);

// const hasValidCount = (tags) => tags.length <= HASHTAGS_LIMIT;

// const hasUniqueTags = (tags) => {
//   const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
//   return lowerCaseTags.length === new Set(lowerCaseTags).size;
// };

// const validateTags = (value) => {
//   if (!value) {
//     return true;
//   }
//   const tags = value.trim().split(' ');
//   return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
// };

// pristine.addValidator(
//   textHashtags,
//   validateTags,
//   TAG_ERROR_TEXT
// );

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

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
imgUploadForm.addEventListener('submit', onFormSubmit);
