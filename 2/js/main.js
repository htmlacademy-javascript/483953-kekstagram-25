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

getRandomNumber(-2, 5.5);

// имя_функции(проверяемая_строка, максимальная_длина); // Результат: true, если строка проходит по длине, и false — если не проходит

function compareStringLenth(string, maxLength) {
  return string.length < maxLength;
}

compareStringLenth('Comment', 20);
