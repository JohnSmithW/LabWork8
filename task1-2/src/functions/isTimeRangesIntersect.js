'use strict';

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

module.exports = isTimeRangesIntersect;