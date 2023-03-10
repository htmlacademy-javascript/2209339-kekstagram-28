const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdGenerator = () => {
  let id = 1;
  return () => id++;
};

const createPhotoId = createIdGenerator();
const createCommentId = createIdGenerator();

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

const getRandomDescription = () => PHRASES[getRandomInteger(0, 8)];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getRandomMessage = () => COMMENTS[getRandomInteger(0, 5)];

const NAME = [
  'Алексей', 'Андрей', 'Артемий', 'Виктор', 'Никита',
  'Даниил', 'Денис', 'Егор', 'Игорь', 'Лев', 'Леонид', 'Павел', 'Петр', 'Роман',
];

const getRandomName = () => NAME[getRandomInteger(0, 13)];

const createComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomName(),
});

const createPhotoObject = () => {
  const id = createPhotoId();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomDescription(),
    like: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 3)}, createComment),
  };
};

const createPhotoObjects = () => Array.from({length: 25}, createPhotoObject);
