import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';

const overlay = document.querySelector('.img-upload__overlay');
const imgUploadStart = document.querySelector('.img-upload__start');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const hashtagRegex = /[a-zа-я0-9]$/i;
const HASHTAGS_LIMIT = 5;
const HASHTAG_MAXLENGTH = 20;

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
  (value) => !value || getTagsFromValue(value).every((tag) => hashtagRegex.test(tag)),
  'Хэштег должен состоять только из букв и цифр.'
);

pristine.addValidator(
  textHashtags,
  (value) => !value || getTagsFromValue(value).every((tag) => tag.startsWith('#')),
  'Хэштег должен начинаться с решетки'
);

pristine.addValidator(
  textHashtags,
  (value) => getTagsFromValue(value).every((tag) => tag.length <= HASHTAG_MAXLENGTH),
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

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
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
  resetScale();
  resetEffects();
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
