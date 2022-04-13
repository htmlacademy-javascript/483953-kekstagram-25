// Доработайте модуль для отрисовки фотографий так, чтобы в качестве данных использовались не случайно сгенерированные объекты, а те данные, которые вы загрузите с удалённого сервера.

import {renderPhotos} from './minis.js';
import {showAlert} from './util.js';
const GET_URL = 'https://25.javascript.pages.academy/kekstagram/data';
const POST_URL = 'https://25.javascript.pages.academy/kekstagram';
let photos;

function convertToJSON (response) {
  return response.json();
}

function checkResponse (response) {
  if (!response.ok) {
    showAlert('Не удалось загрузить фотографии. Попробуйте ещё раз');
  }
  return response;
}

fetch(GET_URL)
  .then(checkResponse)
  .then(convertToJSON)
  .then(renderPhotos)
  .catch(() => {
    showAlert('Что-то пошло не так');
  });

function sendData (formData, onSuccess, onError) {
  function checkResponseAndClear (response) {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  }
  fetch(
    POST_URL,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then(checkResponseAndClear)
    .catch(onError);
}

export {photos};
export {sendData};
