// Наложение эффекта на изображение:

// По умолчанию должен быть выбран эффект «Оригинал».
// На изображение может накладываться только один эффект.
// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.

// Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider. Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:

// Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
// Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
// Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
// Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
// Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
// Для эффекта «Оригинал» CSS-стили filter удаляются.
// При выборе эффекта «Оригинал» слайдер скрывается.
// При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.

const NOFILTER = 'none';

const effectLevel = document.querySelector('.img-upload__effect-level');
const effectList = document.querySelector('.effects__list');
const photo = document.querySelector('.img-upload__preview');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectNone = document.querySelector('#effect-none');
const filterParameters = {
  'chrome': {
    'filterName': 'grayscale',
    'filterParameter': {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      format: {
        to: function (value) {
          return value;
        },
        from: function (value) {
          return value;
        }
      }
    },
  },
  'sepia': {
    'filterName': 'sepia',
    'filterParameter': {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      format: {
        to: function (value) {
          return value;
        },
        from: function (value) {
          return value;
        }
      }
    },
  },

  'marvin': {
    'filterName': 'invert',
    'filterParameter': {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      format: {
        to: function (value) {
          return `${value}%`;
        },
        from: function (value) {
          return value;
        }
      }
    },
  },
  'phobos': {
    'filterName': 'blur',
    'filterParameter': {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      format: {
        to: function (value) {
          return `${value.toFixed(1)}px`;
        },
        from: function (value) {
          return value;
        }
      }
    },
  },
  'heat': {
    'filterName': 'brightness',
    'filterParameter': {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      format: {
        to: function (value) {
          return value;
        },
        from: function (value) {
          return value;
        }
      }
    },
  },
};

let filter = NOFILTER;

noUiSlider.create(effectSlider, {
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
  connect: 'lower',
});

effectList.addEventListener('change', (evt) => {
  photo.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat', 'effects__preview--sepia');
  filter = evt.target.value;
  if (evt.target.classList.contains('effects__radio') && filter !== NOFILTER) {
    photo.classList.add(`effects__preview--${filter}`);
    effectSlider.noUiSlider.updateOptions(filterParameters[filter]['filterParameter']);
    effectLevel.hidden = false;
  } else {
    photo.style.filter = NOFILTER;
    effectLevel.hidden = true;
  }
});

effectSlider.noUiSlider.on('update', () => {
  if (filter !== NOFILTER) {
    photo.style.filter = `${filterParameters[filter]['filterName']}(${effectSlider.noUiSlider.get()})`;
    effectValue.value = parseFloat(effectSlider.noUiSlider.get());
  }
});

function getDefaultEffects () {
  photo.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat', 'effects__preview--sepia');
  photo.removeAttribute('style');
  effectLevel.hidden = true;
  effectNone.checked = true;
}

export {getDefaultEffects};
