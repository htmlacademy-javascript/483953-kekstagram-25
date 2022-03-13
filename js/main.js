// имя_функции(от, до); // Результат: целое число из диапазона "от...до"

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
} // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%BE%D0%B3%D0%BE_%D1%86%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE_%D1%87%D0%B8%D1%81%D0%BB%D0%B0_%D0%B2_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%BD%D0%BE%D0%BC_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B2%D0%B0%D0%BB%D0%B5_%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE

function getRandomNumber(firstNumber, secondNumber) {
  if (firstNumber < 0) {
    firstNumber = 0;
  }
  if (secondNumber <= firstNumber) {
    // eslint-disable-next-line
    return console.log('Указаны некорректные числа');
  }
  return getRandomIntInclusive(firstNumber, secondNumber);
}

// имя_функции(проверяемая_строка, максимальная_длина); // Результат: true, если строка проходит по длине, и false — если не проходит

function compareStringLenth(string, maxLength) {
  return string.length < maxLength;
}

const ALT_TEXTS = [
  'cat',
  'cat & food',
  'cat & dog',
  'cats',
  'white cat',
  'tabby cat',
  'red cat',
  'black cat',
  'gray cat',
  'cat & cat',
  'white cat & food',
  'tabby cat & food',
  'red cat & food',
  'black cat & food',
  'gray cat & food',
  'white cat & dog',
  'tabby cat & dog',
  'red cat & dog',
  'black cat & dog',
  'gray cat & dog',
  'white cat & toy',
  'tabby cat & toy',
  'red cat & toy',
  'black cat & toy',
  'gray cat & toy'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NICK_NAMES = [
  'Пол',
  'Полина',
  'Олег',
  'Ольга',
  'Виталий',
  'Виталина',
  'Майкл',
  'Мишель',
  'Флориан',
  'Флора'
];

const MAX_PHRASES = 2;

const ID_GENERATING_SPAN = 10;

const MAX_AVATAR = 6;

const MIN_LIKES = 15;

const MAX_LIKES = 200;

const PHOTOS_COUNT = 25;

const COMMENTS_COUNT = 5;

function createMessage (){
  let text = '';
  const k = getRandomNumber(1, MAX_PHRASES);
  for (let i = 0; i < k; i++){
    text += ' ' + MESSAGES[getRandomNumber(0, MESSAGES.length - 1)];
  }
  return text.slice(1);
}

let idComment = 0;

function makeComment (){
  idComment = idComment + getRandomNumber(1, ID_GENERATING_SPAN);
  const comment = {
    id: idComment,
    avatar: `img/avatar-${getRandomNumber(1, MAX_AVATAR)}.svg`,
    message: createMessage(),
    name: NICK_NAMES[getRandomNumber(0, NICK_NAMES.length - 1)]
  };
  return comment;
}

function makeCommentsArray (){
  const COMMENTS = [];
  for (let i = 0; i < COMMENTS_COUNT; i++){
    COMMENTS[i] = makeComment(i + 1);
  }
  return COMMENTS;
}

function createDescription (id){
  const url = `photos/${id}.jpg`;
  const description = {
    id: id,
    url: url,
    description: ALT_TEXTS[id - 1],
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: makeCommentsArray()
  };
  return description;
}

function makePhoto (){
  const PHOTOS = [];
  for (let i = 0; i < PHOTOS_COUNT; i++){
    PHOTOS[i] = createDescription(i + 1);
  }
  return PHOTOS;
}

console.log(makePhoto());
