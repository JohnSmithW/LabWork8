'use strict';

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
  if (expectedType === 'undefined' && typeof data === 'undefined') {
    return true;
  }
  if (expectedType === 'object' && typeof data === 'object') {
    return true;
  }
  return false;
}

module.exports = check;