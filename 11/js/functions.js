// Функция №1
export const checkLength = (testString, lengthString) => testString.length <= lengthString;

// Функция №2
export const checkPalindrome = (mainString) => {
  const lowerCaseString = mainString.toLowerCase();
  const reverseString = lowerCaseString.split('').reverse().join('');
  return reverseString === lowerCaseString;
};

// Функция №3
export const numberizeString = (mainString) => {
  let numString = '';
  for (const symbol of mainString) {
    if (!Number.isNaN(parseInt(symbol, 10))) {
      numString += symbol;
    }
  }
  return parseInt(numString, 10);
};

// Функция №4
export const padStart = (mainString, minLength, pad) => {
  const additionLength = minLength - mainString.length;
  if (additionLength <= 0) {
    return mainString;
  }

  const slice = pad.slice(0, additionLength % pad.length);

  const repeat = pad.repeat(additionLength / pad.length);

  return slice + repeat + mainString;
};
