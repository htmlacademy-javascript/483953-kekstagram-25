// После завершения загрузки изображений с сервера покажите блок .img-filters, убрав у него скрывающий класс.

// Добавьте обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:

// По умолчанию — фотографии в изначальном порядке с сервера.
// Случайные — 10 случайных, не повторяющихся фотографий.
// Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
// При переключении фильтра все фотографии, отрисованные ранее, нужно убрать и вместо них показать те, которые подходят под новые условия.

// Воспользуйтесь приёмом «устранение дребезга», чтобы при переключении фильтра обновление списка элементов, подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.

import {getData} from './fetch.js';
import {renderPhotos} from './minis.js';
import {shuffle} from './util.js';

const imgFilters = document.querySelector('.img-filters');
const defaultBtn = document.querySelector('#filter-default');
const randomBtn = document.querySelector('#filter-random');
const discussedBtn = document.querySelector('#filter-discussed');

imgFilters.classList.remove('img-filters--inactive');

function getCommentsRank (photo) {
  return photo.comments.length;
}

function compareCommentsCount (photoA, photoB) {
  const commentsCountA = getCommentsRank(photoA);
  const commentsCountB = getCommentsRank(photoB);
  return commentsCountB - commentsCountA;
}

async function renderDiscussed () {
  const photos = await getData();
  const sortedPhotos = photos.slice().sort(compareCommentsCount);
  renderPhotos(sortedPhotos);
}
const SHUFFLED_PHOTOS_COUNT = 10;
async function renderShuffled () {
  const photos = await getData();
  let shuffledPhotos = shuffle(photos);
  shuffledPhotos = shuffledPhotos.slice(0, SHUFFLED_PHOTOS_COUNT);
  renderPhotos(shuffledPhotos);
}

defaultBtn.addEventListener('click', async () => {
  const photos = await getData();
  renderPhotos(photos);
});

randomBtn.addEventListener('click', () => {
  renderShuffled();
});

discussedBtn.addEventListener('click', () => {
  renderDiscussed();
});
