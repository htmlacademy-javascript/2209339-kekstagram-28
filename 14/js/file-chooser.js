import {imgElement} from './effect.js';
const inputFile = document.querySelector('.img-upload__input');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

export const fileChooser = () => {
  inputFile.addEventListener('change', () => {
    const file = inputFile.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      imgElement.src = URL.createObjectURL(file);
    }
  });
};

