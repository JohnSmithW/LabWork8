'use strict';

function flatArray(array) {
  var subArray = [];
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      array = array.filter(function(el) {
        return (!!el && typeof el[i] !== 'string');
      });
      if (Array.isArray(array[i])) {
        subArray = subArray.concat(flatArray(array[i]));
      } else {
        subArray.push(array[i]);
      }
    }
  }
  return subArray;
}

module.exports = flatArray;