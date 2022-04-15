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
import {debounce} from './util.js';

const imgFilters = document.querySelector('.img-filters');
const defaultBtn = document.querySelector('#filter-default');
const randomBtn = document.querySelector('#filter-random');
const discussedBtn = document.querySelector('#filter-discussed');
const SHUFFLED_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;

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
  defaultBtn.classList.remove('img-filters__button--active');
  randomBtn.classList.remove('img-filters__button--active');
  discussedBtn.classList.add('img-filters__button--active');
  renderPhotos(sortedPhotos);
}

async function renderShuffled () {
  const photos = await getData();
  const shuffledPhotos = shuffle(photos).slice(0, SHUFFLED_PHOTOS_COUNT);
  defaultBtn.classList.remove('img-filters__button--active');
  randomBtn.classList.add('img-filters__button--active');
  discussedBtn.classList.remove('img-filters__button--active');
  renderPhotos(shuffledPhotos);
}

async function renderStandard () {
  const photos = await getData();
  defaultBtn.classList.add('img-filters__button--active');
  randomBtn.classList.remove('img-filters__button--active');
  discussedBtn.classList.remove('img-filters__button--active');
  renderPhotos(photos);
}

defaultBtn.addEventListener('click', debounce(renderStandard, RERENDER_DELAY));

randomBtn.addEventListener('click', debounce(renderShuffled, RERENDER_DELAY));

discussedBtn.addEventListener('click', debounce(renderDiscussed, RERENDER_DELAY));
