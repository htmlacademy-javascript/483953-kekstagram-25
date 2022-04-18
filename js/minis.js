// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

const photoTemplate = document.querySelector('#picture').content;
const photoContainer = document.querySelector('.pictures');
const photoWrapper = photoTemplate.querySelector('.picture');

const renderPhotos = (photos) => {
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
};

export {renderPhotos};
