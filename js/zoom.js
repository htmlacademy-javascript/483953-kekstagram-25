import {photos} from './minis.js';

// Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

const pictureList = document.querySelector('.pictures');

function showBigPhoto (evt) {
  if (evt.target.matches('img')){
    document.querySelector('.big-picture').classList.remove('hidden');
  }

  const re = /([0-9]+)\.jpg/;
  const i = evt.target.src.match(re)[1] - 1;

  // Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
  const photoImg = document.querySelector('.big-picture__img img');
  photoImg.src = photos[i].url;

  // Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
  const photoLikes = document.querySelector('.likes-count');
  photoLikes.textContent = photos[i].likes;

  // Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.
  const photoCommentsCount = document.querySelector('.comments-count');
  photoCommentsCount.textContent = photos[i].comments.length;

  // Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

  // <li class="social__comment">
  //     <img
  //         class="social__picture"
  //         src="{{аватар}}"
  //         alt="{{имя комментатора}}"
  //         width="35" height="35">
  //     <p class="social__text">{{текст комментария}}</p>
  // </li>
  const photoCommentsList = document.querySelector('.social__comments');



  // Описание фотографии description вставьте строкой в блок .social__caption.
  const photoDescription = document.querySelector('.social__caption');
  photoDescription.textContent = photos[i].description;

  // После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  // После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.
  document.querySelector('body').classList.add('modal-open');
}

pictureList.addEventListener('click', showBigPhoto);

function setComments (photo) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photo.comments.length; i++){
    const photoComments = document.querySelector('.social__comment img');
    photoComments.src = photo.comments[i].avatar;
    photoComments.alt = photo.comments[i].name;
    const photoCommentsText = document.querySelector('.social__comment p');
    photoCommentsText.textContent = photo.comments[i].message;
  }
}

// Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
const closeBtn = document.querySelector('.big-picture__cancel');

closeBtn.addEventListener('click', () => {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    document.querySelector('.big-picture').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
});
// Подключите модуль в проект.
