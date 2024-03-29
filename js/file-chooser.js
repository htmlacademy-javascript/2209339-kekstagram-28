import { imgElement } from './effect.js';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ERROR_MESSAGE = `Загрузите изображения в формате ${FILE_TYPES.join(', ')}`;

const chooseFile = (fileInput) => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgElement.src = URL.createObjectURL(file);
    return '';
  }
  return ERROR_MESSAGE;
};

export { chooseFile };
