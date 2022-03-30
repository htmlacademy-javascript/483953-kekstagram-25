import {photos} from './minis.js';

// Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

const pictureList = document.querySelector('.pictures');
const photoImg = document.querySelector('.big-picture__img img');
const photoBig = document.querySelector('.big-picture');
const photoLikes = document.querySelector('.likes-count');
const photoCommentsCount = document.querySelector('.comments-count');
const photoCommentsCountContainer = document.querySelector('.social__comment-count');
const photoCommentsLoader = document.querySelector('.comments-loader');
const photoDescription = document.querySelector('.social__caption');
const commentsContainer = document.querySelector('.social__comments');
const fragment = document.createDocumentFragment();
const photoCommentsItem = document.querySelector('.social__comment');
const closeBtn = document.querySelector('.big-picture__cancel');

function showBigPhoto (evt) {
  if (evt.target.matches('img')){
    photoBig.classList.remove('hidden');
  }

  const re = /([0-9]+)\.jpg/;
  const i = evt.target.src.match(re)[1] - 1;

  // Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
  photoImg.src = photos[i].url;

  // Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
  photoLikes.textContent = photos[i].likes;

  // Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.
  photoCommentsCount.textContent = photos[i].comments.length;

  // Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

  setComments(photos[i]);

  // Описание фотографии description вставьте строкой в блок .social__caption.
  photoDescription.textContent = photos[i].description;

  // После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.
  photoCommentsCountContainer.classList.add('hidden');
  photoCommentsLoader.classList.add('hidden');

  // После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.
  document.body.classList.add('modal-open');
}

pictureList.addEventListener('click', showBigPhoto);

  // <li class="social__comment">
  //     <img
  //         class="social__picture"
  //         src="{{аватар}}"
  //         alt="{{имя комментатора}}"
  //         width="35" height="35">
  //     <p class="social__text">{{текст комментария}}</p>
  // </li>

function setComments (photo) {
  for (let i = 0; i < photo.comments.length; i++){
    const chunk = photoCommentsItem.cloneNode(true);
    const photoComment = chunk.querySelector('.social__comment img');
    photoComment.src = photo.comments[i].avatar;
    photoComment.alt = photo.comments[i].name;
    const photoCommentText = chunk.querySelector('.social__comment p');
    photoCommentText.textContent = photo.comments[i].message;
    fragment.appendChild(chunk);
  }
  commentsContainer.innerHTML = ''; // сломается, если будет 0 комментариев!
  commentsContainer.appendChild(fragment);
}

// Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

closeBtn.addEventListener('click', () => {
  photoBig.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

const onPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    photoBig.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

document.addEventListener('keydown', onPopupEscKeydown);
