// Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

// Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

// Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

// Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.

// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

// <li class="social__comment">
//     <img
//         class="social__picture"
//         src="{{аватар}}"
//         alt="{{имя комментатора}}"
//         width="35" height="35">
//     <p class="social__text">{{текст комментария}}</p>
// </li>

// Описание фотографии description вставьте строкой в блок .social__caption.

// После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

// После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.

// Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

// Подключите модуль в проект.

import {makePhoto} from './data.js';

const showBigPhoto = document.querySelector('.big-picture');
showBigPhoto.classList.remove('hidden');
const photos = makePhoto();

const photoImg = document.querySelector('.big-picture__img');
photoImg.src = photos[0].url;

const photoLikes = document.querySelector('.likes-count');
photoLikes.textContent = photos[0].likes;

const photoCommentsCount = document.querySelector('.comments-count');
photoCommentsCount.textContent = photos[0].comments.length;

const photoCommentsList = document.querySelector('.social__comments');


const photoComments = document.querySelector('.social__comment');
photoComments.src = photos[0].comments[0].avatar;
photoComments.alt = photos[0].comments[0].name;
photoComments.textContent = photos[0].comments[0].message;

let photoDescription = document.querySelector('.social__caption');
photoDescription = photos.description;

console.log(photoComments)
