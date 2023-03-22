import {getRandomDescription, createPhotoId, getRandomInteger} from './util.js';
import {createComment} from './create-comment.js';

const createPhotoObject = () => {
  const id = createPhotoId();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomDescription(),
    like: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 10)}, createComment),
  };
};

export const createPhotoObjects = () => Array.from({length: 25}, createPhotoObject);
