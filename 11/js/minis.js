// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

//  <template id="picture">
//  <a href="#" class="picture">
//    <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
//    <p class="picture__info">
//      <span class="picture__comments"></span>
//      <span class="picture__likes"></span>
//    </p>
//  </a>
//  </template>

// import {makePhotos} from './data.js';

const photoTemplate = document.querySelector('#picture').content;
const photoContainer = document.querySelector('.pictures');
const photoWrapper = photoTemplate.querySelector('.picture');

function renderPhotos (photos) {
  const photoWrapperAll = document.querySelectorAll('.picture');
  for (let i = 0; i < photoWrapperAll.length; i++){
    photoWrapperAll[i].remove();
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++){
    const chunk = photoWrapper.cloneNode(true);
    const photoImg = chunk.querySelector('.picture__img');
    const photoLikes = chunk.querySelector('.picture__likes');
    const photoComments = chunk.querySelector('.picture__comments');
    photoImg.src = photos[i].url;
    photoLikes.textContent = photos[i].likes;
    photoComments.textContent = photos[i].comments.length;
    fragment.appendChild(chunk);
  }
  photoContainer.appendChild(fragment);
}

export {renderPhotos};
