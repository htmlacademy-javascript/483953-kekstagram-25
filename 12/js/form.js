// 3.1. После заполнения всех данных, при нажатии на кнопку «Отправить», все данные из формы, включая изображения, с помощью AJAX-запроса отправляются на сервер https://25.javascript.pages.academy/kekstagram методом POST с типом multipart/form-data. На время выполнения запроса к серверу кнопка «Отправить» блокируется.

// Если форма заполнена верно, то после отправки покажется страница сервера (по адресу из атрибута action тега form) с успешно отправленными данными. Если же форма пропустила какие-то некорректные значения, то будет показана страница с допущенными ошибками. В идеале у пользователя не должно быть сценария, при котором он может отправить некорректную форму.

// После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения. У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open.
import {setupPhoto} from './scale.js';
import {resetPhotoStyle} from './scale.js';
import {getDefaultEffects} from './effects.js';
import {showAlert} from './util.js';
import {sendData} from './fetch.js';
import {closeBigPhoto} from './zoom.js';

const upload = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeBtn = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('#upload-select-image');
const MAX_LENGTH = 140;
const RE = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/;
const hashtagsText = document.querySelector('.text__hashtags');
const commentText = uploadForm.querySelector('.text__description');
const MAX_HASHTAGS_COUNT = 5;
const successMsg = document.querySelector('#success').content;
const successMsgBtn = successMsg.querySelector('.success__button');
const errorMsg = document.querySelector('#error').content;
const errorMsgBtn = errorMsg.querySelector('.error__button');

function closePopup() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetPhotoStyle();
  uploadForm.reset();
}

function openForm (){
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  setupPhoto();
  getDefaultEffects();
}

upload.addEventListener('change', () => {
  openForm();
});

closeBtn.addEventListener('click', () => {
  closePopup();
});

upload.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape'){
    evt.preventDefault();
    closePopup();
  }
});

// Хэш-теги:
// хэш-тег начинается с символа # (решётка);
// строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
// хеш-тег не может состоять только из одной решётки;
// максимальная длина одного хэш-тега 20 символов, включая решётку;
// хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// хэш-теги разделяются пробелами;
// один и тот же хэш-тег не может быть использован дважды;
// нельзя указать больше пяти хэш-тегов;
// хэш-теги необязательны;
// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

function isHashtagOk () {
  const hashtags = hashtagsText.value.split(' ');
  for (let i = 0; i < hashtags.length; i++){
    if (!(hashtags[i].match(RE) || hashtags[i] === '')) {
      return false;
    }
  }
  return true;
}

const pristine = new Pristine(uploadForm,{
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'text__hashtags-error',
});

function checkHashtagCount () {
  const hashtags = hashtagsText.value.split(' ');
  return (hashtags.length < MAX_HASHTAGS_COUNT);
}

function checkHashtagUnique () {
  const hashtags = hashtagsText.value.split(' ');
  const hashtagsUnique = new Set(hashtags);
  return (hashtags.length === hashtagsUnique.size);
}

function checkComment() {
  const commentLength = uploadForm.querySelector('.text__description').value.length;
  return (commentLength <= MAX_LENGTH);
}

hashtagsText.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape'){
    evt.stopPropagation();
  }
});

commentText.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape'){
    evt.stopPropagation();
  }
});

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  checkHashtagCount,
  'Можно ввести не более 5 хештегов'
);

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  checkHashtagUnique,
  'Хештеги не должны повторяться'
);

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  isHashtagOk,
  'Хештег должен начинаться с «#», содержать только буквы и цифры и не должен быть больше 20 символов'
);

pristine.addValidator(
  uploadForm.querySelector('.text__description'),
  checkComment,
  'Максимум 140 символов'
);

function cleanFormOnSuccess () {
  uploadForm.reset();
}

function onErrorFormSubmit () {
  printErrorMsg();
}

function onSuccessFormSubmit () {
  closeBigPhoto();
  cleanFormOnSuccess();
  printSuccessMsg();
}

function printSuccessMsg () {
  document.body.appendChild(successMsg);
  document.addEventListener('click', onSuccessOutClick);
  document.addEventListener('keydown', onSuccessEscKeydown);
}

function closeSuccessMsg () {
  const successMsgContainer = document.querySelector('.success');
  document.body.removeChild(successMsgContainer);
  document.removeEventListener('click', onSuccessOutClick);
  document.removeEventListener('keydown', onSuccessEscKeydown);
}

function onSuccessEscKeydown (evt) {
  if (evt.key === 'Escape'){
    evt.preventDefault();
    closeSuccessMsg();
  }
}

function onSuccessOutClick (evt) {
  const successMsgWindow = document.querySelector('.success__inner');
  const target = evt.target;
  const isSuccessMsgWindow = target === successMsgWindow || successMsgWindow.contains(target);
  const isSuccessMsgBtn = target === successMsgBtn;
  if (!isSuccessMsgWindow || isSuccessMsgBtn) {
    closeSuccessMsg();
  }
}

function printErrorMsg () {
  document.body.appendChild(errorMsg);
  document.addEventListener('click', onErrorOutClick);
  document.addEventListener('keydown', onErrorEscKeydown);
}

function closeErrorMsg () {
  const errorMsgContainer = document.querySelector('.error');
  document.body.removeChild(errorMsgContainer);
  document.removeEventListener('click', onErrorOutClick);
  document.removeEventListener('keydown', onErrorEscKeydown);
}

function onErrorEscKeydown (evt) {
  if (evt.key === 'Escape'){
    evt.preventDefault();
    closeErrorMsg();
  }
}

function onErrorOutClick (evt) {
  const errorMsgWindow = document.querySelector('.error__inner');
  const target = evt.target;
  const isErrorMsgWindow = target === errorMsgWindow || errorMsgWindow.contains(target);
  const isErrorMsgBtn = target === errorMsgBtn;
  if (!isErrorMsgWindow || isErrorMsgBtn) {
    closeErrorMsg();
  }
}


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    sendData(formData, onSuccessFormSubmit, onErrorFormSubmit);
    closePopup();
  } else {
    showAlert('Форма содержит ошибки');
  }
});
