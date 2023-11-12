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
