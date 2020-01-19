'use strict';


function replaceString(text, searchStr, newStr) {
  if (text !== '' && typeof text === 'string' && searchStr !== '' && typeof searchStr === 'string' && typeof newStr === 'string') {
    searchStr = new RegExp(searchStr, 'g');
    text = text.replace(searchStr, newStr);
    return text;
  } else {
    return false;
  }
}

module.exports = replaceString;