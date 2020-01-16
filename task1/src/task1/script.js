'use strict'

var assert = require('assert');
describe('replaceString', function() {
  it('should return false if the value is null or not a string', function() {
    assert.equal(replaceString('some text', 's', 'b'), 'bome text');
    assert.equal(replaceString('', 'a', 'b'), false);
    assert.equal(replaceString('cart', 'c', ''), 'art');
    assert.equal(replaceString('text', '', ''), false);
    assert.equal(replaceString(123, 'c', ''), false);
    assert.equal(replaceString(null, 'c', ''), false);
    assert.equal(replaceString(undefined, 'c', ''), false);
  });
});


function replaceString(text, searchStr, newStr) {
  if (text !== '' && typeof text === 'string' && typeof searchStr === 'string' && typeof newStr === 'string' && searchStr !== '') {
    searchStr = new RegExp(searchStr, 'g');
    text = text.replace(searchStr, newStr);
    return text;
  } else {
    return false;
  }
}

describe('isArrayEqual', function() {
  it('should return false if the first array is not equal to the second', function() {
    assert.equal(isArrayEqual([], null), false);
    assert.equal(isArrayEqual([], []), true);
    assert.equal(isArrayEqual([], ['test']), false);
    assert.equal(isArrayEqual([1, 2, 3], [1, 2, 3]), true);
    assert.equal(isArrayEqual([1, null, 3], [1, undefined, 3]), false);
    assert.equal(isArrayEqual([false, null], [true, null]), false);
  });
});


function isArrayEqual(array1, array2) {
  if (array1 === undefined && array2 === undefined) return false;
  if (array1 === array2) return true;
  if (array1 == null || array2 == null) return false;
  if (array1.length != array2.length) return false;
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}


describe('flatArray', function() {
  it('should return array from array ', function() {
    assert.deepEqual(flatArray([1, 2, 3]), [1, 2, 3]);
    assert.deepEqual(flatArray([]), []);
    assert.deepEqual(flatArray([1, [2, 3, 4], 5]), [1, 2, 3, 4, 5]);
    assert.deepEqual(flatArray([1, [2, 3, 4], 5, [1]]), [1, 2, 3, 4, 5, 1]);
    assert.deepEqual(flatArray([1, [1], null, NaN, ['test']]), [1, 1]);
  });
});

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

describe('isTimeRangesIntersect', function() {
  it('should return true if time ranges intersect ', function() {
    assert.deepEqual(isTimeRangesIntersect(['08:30', '09:30'], ['10:30', '12:00']), false);
    assert.deepEqual(isTimeRangesIntersect(['18:30', '19:30'], ['19:00', '21:00']), true);
  });
});

function isTimeRangesIntersect(timeRange1, timeRange2) {
  if (Array.isArray(timeRange1) && Array.isArray(timeRange2)) {

    var inputCheck = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/.test(timeRange1[0]) &&
      /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/.test(timeRange1[1]) &&
      /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/.test(timeRange2[0]) &&
      /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/.test(timeRange2[1]);


    if (timeRange1 !== '' && timeRange2 !== '' && inputCheck) {
      var start1 = timeRange1[0];
      var end1 = timeRange1[1];
      var start2 = timeRange2[0];
      var end2 = timeRange2[1];
      return (start1 <= end2 && start2 <= end1) ? true : false;
    }
    return false;
  }
  return false;
}



describe('check', function() {
  it('should return true if value matches expected type', function() {
    assert.equal(check([], 'array'), true);
    assert.equal(check([], 'number'), false);
    assert.equal(check(null, 'null'), true);
    assert.equal(check('test', 'string'), true);
    assert.equal(check('', 'string'), false);
  });
});

function check(data, expectedType) {
  if (expectedType === 'number' && typeof data === 'number') {
    return true;
  }
  if (expectedType === 'array' && Array.isArray(data)) {
    return true;
  }
  if (expectedType === 'null' && data === null) {
    return true;
  }
  if (expectedType === 'string' && typeof data === 'string' && !!data) {
    return true;
  }
  return false;
}

describe('check', function() {
  it('should return true if value matches expected type', function() {
    assert.equal(check([], 'array'), true);
    assert.equal(check([], 'number'), false);
    assert.equal(check(null, 'null'), true);
    assert.equal(check('test', 'string'), true);
    assert.equal(check('', 'string'), false);
  });
});