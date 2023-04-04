import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effect.js';
import {sendData} from './api.js';

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
  document.removeEventListener('keydown', onFormKeyDown);
};

// Открывает модальное окно с формой
const showModal = () => {
  resetScale();
  resetEffects();
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormKeyDown);
};

// Закрывает модальное окно с формой по нажатию ESC
const isTextFieldFocused = () => document.activeElement === textHashtags || document.activeElement === textDescription;

function onFormKeyDown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

// Закрывает сообщение при отправке формы
const MessageMode = {
  ERROR: 'error',
  SUCCESS: 'success',
};

const createDisplayMessage = (mode) => {
  const element = document.querySelector(`#${mode}`).content.querySelector(`.${mode}`).cloneNode(true);
  const buttonElement = element.querySelector(`.${mode}__button`);
  const close = () => {
    document.removeEventListener('keydown', onKeyDowm);
    if (mode === MessageMode.ERROR) {
      document.addEventListener('keydown', onFormKeyDown);
    } else {
      document.body.classList.remove('modal-open');
    }
    element.remove();
  };
  function onKeyDowm(evt) {
    if (isEscapeKey(evt)) {
      close();
    }
  }
  element.addEventListener('click', (evt) => {
    if (evt.target === element || evt.target === buttonElement) {
      close();
    }
  });
  // body.appendChild(element);
  return {
    open: () => {
      document.addEventListener('keydown', onKeyDowm);
      document.removeEventListener('keydown', onFormKeyDown);
      document.body.classList.add('modal-open');
      document.body.append(element);
    }
  };
};

//Сообщение успешной отправки формы
const successStatus = createDisplayMessage(MessageMode.SUCCESS);
const errorStatus = createDisplayMessage(MessageMode.ERROR);

//Отправка формы
const setUserFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      // const formData = new FormData(evt.target);

      sendData(new FormData(evt.target))
        .then((response) => {
          if (response.ok) {
            hideModal();
            successStatus.open();
          } else {
            throw new Error();
          }
        })
        .catch(errorStatus.open);
    }
  });
};

imgUploadStart.addEventListener('change', showModal);
imgUploadCancel.addEventListener('click', hideModal);
imgUploadForm.addEventListener('submit', onFormSubmit);

export {setUserFormSubmit};
