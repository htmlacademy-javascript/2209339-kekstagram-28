const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
const img = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const slider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');
let chosenEffect = DEFAULT_EFFECT;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};
const hidenSlider = () => {
  sliderContainer.classList.add('hidden');
};

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    hidenSlider();
  } else {
    showSlider();
  }
};

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  img.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();
  img.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectValue.value = sliderValue;
};

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.max,
  connect: 'lower',
});
hidenSlider();

effects.addEventListener('change', onEffectChange);
slider.noUiSlider.on('update', onSliderUpdate);

export const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};
