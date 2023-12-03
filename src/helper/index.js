export function isEmptyObject(obj) {
  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function formatDate(inputDate) {
  const parts = inputDate.split("-");
  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  return formattedDate;
}

export function createArrayOfArrays(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push([]);
  }
  return result;
}

export function splitAndAddEllipsis(inputString, length = 20) {
  if (inputString.length >= 20) {
    // If the string has 20 or more characters, split and add '...'
    const truncatedString = inputString.substring(0, length) + "...";
    return truncatedString;
  } else {
    // If the string has fewer than 20 characters, return the original string
    return inputString;
  }
}

/**
 *
 * @param {Array} array
 * @param {number} itemId
 * @returns Recebe uma array e retorna true, se um item com o id fornecido for encontrado na array
 */
export function containsItemWithId(array, itemId) {
  return array.some((item) => item.id === itemId);
}

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns Retorna um número aleatório
 */
export function getRandomNumberInRange(min, max) {
  // Math.random() returns a floating-point number between 0 (inclusive) and 1 (exclusive)
  // Multiply it by the range and add the minimum value to shift the range
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}
