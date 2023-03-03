// Функция №1
function checkLength (testString, lengthString) {
  if (testString.length <= lengthString) {
    return true;
  }
  return false;
}

// Функция №2
function checkPolindrome (mainString) {
  let reverseString = mainString.split('').reverse().join('');
  return reverseString === mainString;
}

// Функция №3
function checkNumber (mainString) {
  let num = '';
  for (let j in mainString) {
    if (!Number.isNaN(parseInt(mainString[j], 10))) {
      num += mainString[j];
    }
  }
  return parseInt(num, 10);
}

console.log(checkNumber('jweouoqwrf'))

// Функция №4
function fun4 (mainString, minLength, addString) {
  let addLength = minLength - mainString.length;
  if (addLength <= 0) {
    return mainString;
  }

  let slice = addString.slice(0, addLength % addString.length);

  let repeat = addString.repeat(addLength / addString.length);

  return slice + repeat + mainString;
}
