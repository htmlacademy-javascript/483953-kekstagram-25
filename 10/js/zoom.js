import {photos} from './fetch.js';

// Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

const pictureList = document.querySelector('.pictures');
const photoImg = document.querySelector('.big-picture__img img');
const photoBig = document.querySelector('.big-picture');
const photoLikes = document.querySelector('.likes-count');
const photoCommentsCount = document.querySelector('.comments-count');
const photoCommentsLoader = document.querySelector('.comments-loader');
const photoDescription = document.querySelector('.social__caption');
const commentsContainer = document.querySelector('.social__comments');
const fragment = document.createDocumentFragment();
const photoCommentsItem = document.querySelector('.social__comment');
const closeBtn = document.querySelector('.big-picture__cancel');
const NEXT_COMMENTS_COUNT = 5;
let index;
let elem;
const photoCommentsItemCounter = document.querySelector('.social__comment-count');
const socialCommentsBtn = document.querySelector('.social__comments-loader');

// Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

closeBtn.addEventListener('click', () => {
  closeBigPhoto();
});

const onPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPhoto();
  }
};

function closeBigPhoto () {
  photoBig.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function showBigPhoto (evt) {
  if (evt.target.matches('img')){
    photoBig.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscKeydown);

    const RE = /([0-9]+)\.jpg/;
    elem = evt.target.src.match(RE)[1] - 1;

    // Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
    photoImg.src = photos[elem].url;

    // Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
    photoLikes.textContent = photos[elem].likes;

    // Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.
    photoCommentsCount.textContent = photos[elem].comments.length;

    // Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

    commentsContainer.innerHTML = ''; // сломается, если будет 0 комментариев!
    index = 0;
    setComments(photos[elem], 0);

    // Описание фотографии description вставьте строкой в блок .social__caption.
    photoDescription.textContent = photos[elem].description;
  }

  // После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.
  document.body.classList.add('modal-open');

  socialCommentsBtn.classList.remove('hidden');
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

// В модуле, который отвечает за отрисовку окна с полноразмерным изображением, доработайте код по выводу списка комментариев таким образом, чтобы список показывался не полностью, а по 5 элементов, и следующие 5 элементов добавлялись бы по нажатию на кнопку «Загрузить ещё». Не забудьте реализовать обновление числа показанных комментариев в блоке .social__comment-count.

function setComments (photo, commentsPage) {
  for (let i = commentsPage * NEXT_COMMENTS_COUNT; i < Math.min(NEXT_COMMENTS_COUNT * (commentsPage + 1), photo.comments.length); i++){
    const chunk = photoCommentsItem.cloneNode(true);
    const photoComment = chunk.querySelector('.social__comment img');
    photoComment.src = photo.comments[i].avatar;
    photoComment.alt = photo.comments[i].name;
    const photoCommentText = chunk.querySelector('.social__comment p');
    photoCommentText.textContent = photo.comments[i].message;
    fragment.appendChild(chunk);
    photoCommentsItemCounter.innerHTML = `${Math.min(NEXT_COMMENTS_COUNT * (commentsPage + 1), photo.comments.length)  } из ${  photo.comments.length  } комментариев`;
  }
  commentsContainer.appendChild(fragment);

  if (photo.comments.length === (commentsPage + 1) * NEXT_COMMENTS_COUNT || photo.comments.length < (commentsPage + 1) * NEXT_COMMENTS_COUNT) {
    socialCommentsBtn.classList.add('hidden');
  }
}

photoCommentsLoader.addEventListener ('click', () => {
  index++;
  setComments(photos[elem], index);
});

// нужно обновлять количество показанных комментариев в блоке «5 комментариев из 17» и нужно скрывать кнопку Загрузить ещё, если больше грузить нечего

export {closeBigPhoto, showBigPhoto};
