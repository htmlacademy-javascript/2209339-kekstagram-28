import {getRandomMessage, getRandomName, createCommentId, getRandomInteger} from './util.js';

const createComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomName(),
});

export {createComment};
