const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const img = document.querySelector('.img-upload__preview img');

const DEFAULT_SCALE = 100;
const STEP_SCALE = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;

const scaleImg = (value) => {
  img.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue - STEP_SCALE;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImg(newValue);
};

const onBiggerClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + STEP_SCALE;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImg(newValue);
};

smallerButton.addEventListener('click', onSmallerClick);
biggerButton.addEventListener('click', onBiggerClick);

const resetScale = () => scaleImg(DEFAULT_SCALE);

export { resetScale };
