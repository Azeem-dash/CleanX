export const DateAuth = input => {
  let newText = input;
  if (parseInt(newText[0]) > 3) {
    return '';
  }
  // now test second word
  if (parseInt(newText[0]) === 0 && parseInt(newText[1]) === 0) {
    return newText[0];
  }
  if (parseInt(newText[0]) === 1 && parseInt(newText[1]) > 2) {
    return newText[0];
  }
  // attach / with first item
  if (newText.length === 3 && newText[newText.length - 1] !== '/') {
    newText = `${newText.slice(0, 2)}/${newText[2]}`;
  }
  if (newText.length >= 4) {
    if (parseInt(newText[3]) > 3) {
      return newText.slice(0, 3);
    } else if (parseInt(newText[3]) === 0 && parseInt(newText[4]) === 0) {
      return newText.slice(0, 4);
    } else if (parseInt(newText[3]) === 3 && parseInt(newText[4]) > 1) {
      return newText.slice(0, 4);
    }
  }
  // attach / with second item
  if (newText.length === 6 && newText[newText.length - 1] !== '/') {
    newText = `${newText.slice(0, 5)}/${newText[5]}`;
  }
  if (newText.length > 10) {
    return newText.slice(0, 10);
  }
  return newText;
};
