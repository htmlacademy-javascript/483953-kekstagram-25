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

const altText = [
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

const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const nickname = [
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

const createMessage = function (){
  let text = '';
  const k = getRandomNumber(1, 2);
  for (let i = 1; i <= k; i++){
    text += ' ' + message[getRandomNumber(0, message.length - 1)];
  }
  return text.slice(1);
};

let idComment = 0;

const makeComment = function (){
  idComment = idComment + getRandomNumber(1, 10);
  const comment = {
    id: idComment,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: createMessage(),
    name: nickname[getRandomNumber(0, nickname.length - 1)]
  };
  return comment;
};

const createDescription = function (id){
  const url = `photos/${id}.jpg`;
  const description = {
    id: id,
    url: url,
    description: altText[id - 1],
    likes: getRandomNumber(15, 200),
    comments: makeComment()
  };
  return description;
};

const makePhoto = function (){
  const photos = [];
  for (let i = 0; i < 25; i++){
    photos[i] = createDescription(i + 1);
  }
  return photos;
};
