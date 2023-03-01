// Функция №1
function fun1 (testString, lengthString) {
  if (testString.length <= lengthString) {
    return true;
  }
  return false;
}

// Функция №2
function fun2 (mainString) {
  let reverseString = mainString.split('').reverse().join('');
  if (reverseString === mainString) {
    return true;
  }
  return false;
}

// Функция №3

function fun3 (mainString) {
  for (var index in mainString) {
    if ( parseInt(mainString[index] !== NaN) ) {
      let num;
      num += mainString[index];
      return parseInt(num);
    }
    return NaN;
  }
}
// Функция №4

function fun4 (mainString, minLength, addString) {
  while (mainString.length < minLength) {
    mainString = addString + mainString;
  }
  return mainString;
}

console.log(fun4('q', 4, 'werty'));
