// Доработайте модуль для отрисовки фотографий так, чтобы в качестве данных использовались не случайно сгенерированные объекты, а те данные, которые вы загрузите с удалённого сервера.

import {renderPhotos} from './minis.js';
import {setUserFormSubmit} from './form.js';
import {closeBigPhoto} from './zoom.js';
import {showAlert} from './util.js';
const GET_URL = 'https://25.javascript.pages.academy/kekstagram/data';
let photos;

function convertToJSON (response) {
  return response.json();
}

// function savePhotos (result) {
//   photos = result;
//   return result;
// }

function checkResponse (response) {
  if (response.ok) {
    showAlert();
  } else {
    showAlert('Не удалось загрузить фотографии. Попробуйте ещё раз');
  }
}

fetch(GET_URL)
  .then(convertToJSON)
  // .then(savePhotos)
  .then(renderPhotos)
  .then(checkResponse)
  .catch(() => {
    showAlert('Что-то пошло не так');
  });
setUserFormSubmit(closeBigPhoto);

export {photos};
