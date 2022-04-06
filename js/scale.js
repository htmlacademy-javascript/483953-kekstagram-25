// Напишите код, который позволит пользователю редактировать масштаб изображения.
// Кроме визуального применения эффекта необходимо записывать значение в поле формы с масштабом, доступное только для чтения, для дальнейшей отправки на сервер.

// Масштаб:

// При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
// Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%, после нажатия на «+», значение должно стать равным 75%. Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;
// При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).

const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleInput = document.querySelector('.scale__control--value');
const scaleFieldset = document.querySelector('.img-upload__scale');
const photo = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
let currentStep = 50;

// const onScaleClick = (evt) => {
//   const target = evt.target;
//   if (target === scaleSmaller && currentStep > SCALE_MIN) {
//     currentStep -= SCALE_STEP;
//   }
//   if (target === scaleBigger && currentStep < SCALE_MAX) {
//     currentStep += SCALE_STEP;
//   }
//   scaleInput.value = `${currentStep}%`;
//   photo.style.transform = `scale(${currentStep * 0.01})`;
// };

scaleBigger.addEventListener('click', () => {
  if (currentStep < SCALE_MAX) {
    currentStep += SCALE_STEP;
    scaleInput.value = `${currentStep}%`;
    photo.style = `transform: scale(${currentStep * 0.01})`;
  }
});

scaleSmaller.addEventListener('click', () => {
  if (currentStep > SCALE_MIN) {
    currentStep -= SCALE_STEP;
    scaleInput.value = `${currentStep}%`;
    photo.style = `transform: scale(${currentStep * 0.01})`;
  }
});

// export {scaleFieldset, onScaleClick};
