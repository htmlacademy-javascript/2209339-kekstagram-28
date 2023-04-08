const PHRASES = [
  'Если смогу, я сделаю это. Конец истории.',
  'Смейтесь как только умеете, любите столько, сколько живете.',
  'Не ждите идеального момента. Берите каждый момент и делайте его идеальным.',
  'Я точно знаю, кто я, и я чертовски горжусь этим.',
  'Я не ленивый. Просто у меня нет мотивации.',
  'Если у вас есть глаза, взгляните на меня сейчас!',
  'Дорога к успеху строится постоянно.',
  'Всегда будьте лучшим вариантом для себя.',
  'Доброе утро, всем! Теперь давайте начнем стресс!'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = [
  'Алексей', 'Андрей', 'Артемий', 'Виктор', 'Никита',
  'Даниил', 'Денис', 'Егор', 'Игорь', 'Лев', 'Леонид', 'Павел', 'Петр', 'Роман',
];

const TIMEOUT_DELAY = 500;

export const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdGenerator = () => {
  let id = 1;
  return () => id++;
};

export const ALERT_SHOW_TIME = 5000;

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export const getRandomDescription = () => PHRASES[getRandomInteger(0, 8)];
export const getRandomMessage = () => COMMENTS[getRandomInteger(0, 5)];
export const getRandomName = () => NAME[getRandomInteger(0, 13)];
export const createPhotoId = createIdGenerator();
export const createCommentId = createIdGenerator();
export const isEscapeKey = (evt) => evt.key === 'Escape';