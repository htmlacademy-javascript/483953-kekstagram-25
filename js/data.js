import {getRandomNumber} from './util.js';

// создание 25 фото с комментариями

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
  const photos = [];
  for (let i = 0; i < PHOTOS_COUNT; i++){
    photos.push(createDescription(i + 1));
  }
  return photos;
}

export {makePhoto};
