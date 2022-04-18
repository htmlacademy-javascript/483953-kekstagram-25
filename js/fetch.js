// Доработайте модуль для отрисовки фотографий так, чтобы в качестве данных использовались не случайно сгенерированные объекты, а те данные, которые вы загрузите с удалённого сервера.

// import {renderPhotos} from './minis.js';
import {showAlert} from './util.js';

const GET_URL = 'https://25.javascript.pages.academy/kekstagram/data';
const POST_URL = 'https://25.javascript.pages.academy/kekstagram';

const convertToJSON = (response) => response.json();

const checkResponse = (response) => {
  if (response.ok) {
    return convertToJSON(response);
  }
  else {
    showAlert('Не удалось загрузить фотографии. Попробуйте ещё раз');
    return false;
  }
};

const getData = async () => {
  const photos = await fetch(GET_URL)
    .then(checkResponse)
    .catch(() => {
      showAlert('Что-то пошло не так');
    });
  return photos;
};

const sendData = (formData, onSuccess, onError) => {
  fetch(
    POST_URL,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(onError);
};

export {getData};
export {sendData};
