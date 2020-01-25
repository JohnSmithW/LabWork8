'use strict';

const replaceString = require('./functions/replaceString.js');
const isArrayEqual = require('./functions/isArrayEqual.js');
const flatArray = require('./functions/flatArray.js');
const isTimeRangesIntersect = require('./functions/isTimeRangesIntersect.js');
const check = require('./functions/check.js');
const player = require('./functions/player.js');
const cashbox = require('./functions/cashbox.js');


var assert = require('assert');
describe('replaceString', function() {
  it('should return false if the value is null or not a string', function() {
    assert.equal(replaceString('', 'a', 'b'), false);
    assert.equal(replaceString('text', '', ''), false);
    assert.equal(replaceString(123, 'c', ''), false);
    assert.equal(replaceString(null, 'c', ''), false);
    assert.equal(replaceString(undefined, 'c', ''), false);
    assert.equal(replaceString(NaN, 'c', ''), false);
    assert.equal(replaceString('text', '', 'e'), false);
    assert.equal(replaceString('some text', 's', 'b'), 'bome text');
    assert.equal(replaceString('cart', 'c', ''), 'art');
  });
});


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


describe('flatArray', function() {
  it('should return subarray from array ', function() {
    assert.deepEqual(flatArray([]), []);
  });
  it('should return ignore not valid values and return only a subarray ', function() {
    assert.deepEqual(flatArray([1, [1], null, NaN, ['test']]), [1, 1]);
  });
  it('should return array if there is no subarray', function() {
    assert.deepEqual(flatArray([1, 2, 3]), [1, 2, 3]);
  });
  it('should return array of depth equal one', function() {
    assert.deepEqual(flatArray([1, [2, 3, 4], 5]), [1, 2, 3, 4, 5]);
    assert.deepEqual(flatArray([1, [2, 3, 4], 5, [1]]), [1, 2, 3, 4, 5, 1]);
  });
});


describe('isTimeRangesIntersect', function() {
  it('should return true if time ranges intersect', function() {
    assert.deepEqual(isTimeRangesIntersect(['18:30', '19:30'], ['19:00', '21:00']), true);
    assert.deepEqual(isTimeRangesIntersect(['08:30', '19:30'], ['10:00', '21:00']), true);
    assert.deepEqual(isTimeRangesIntersect(['08:30', '10:00'], ['10:00', '12:00']), true);
  });
  it('should return false if time ranges do not intersect', function() {
    assert.deepEqual(isTimeRangesIntersect(['08:30', '09:30'], ['10:30', '12:00']), false);
    assert.deepEqual(isTimeRangesIntersect(['08:00', '09:59'], ['10:00', '12:00']), false);
  });
  it('should return false if the format is incorrect', function() {
    assert.deepEqual(isTimeRangesIntersect(['8:30', '09:30'], ['10:30', '12:00']), false);
  });
  it('should return false if the value is incorrect', function() {
    assert.deepEqual(isTimeRangesIntersect(['eight am', '09:30'], ['10:30', '12:00']), false);
    assert.deepEqual(isTimeRangesIntersect([NaN, '09:30'], ['10:30', '12:00']), false);
    assert.deepEqual(isTimeRangesIntersect([undefined, '09:30'], ['10:30', '12:00']), false);
    assert.deepEqual(isTimeRangesIntersect([Object, '09:30'], ['10:30', '12:00']), false);
    assert.deepEqual(isTimeRangesIntersect([8, '09:30'], ['10:30', '12:00']), false);
    assert.deepEqual(isTimeRangesIntersect(['0830', '09:30'], ['10:30', '12:00']), false);
    assert.deepEqual(isTimeRangesIntersect(['08-30', '09:30'], ['10:30', '12:00']), false);
  });
});


describe('check', function() {
  it('should return true if value matches the expected type', function() {
    assert.equal(check([], 'array'), true);
    assert.equal(check(null, 'null'), true);
    assert.equal(check('test', 'string'), true);
    assert.equal(check(undefined, 'undefined'), true);
  });
  it('should return false if value does not match the expected type', function() {
    assert.equal(check([], 'number'), false);
    assert.equal(check('', 'string'), false);
    assert.equal(check(Object, 'object'), true);
  });
});


describe('player', function() {
  it('should change its statement depending on called functions', function() {
    assert.deepEqual(player.trackList, ['song.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3']);
    player.play();
    assert.equal(player.status, 'play');
    player.pause();
    assert.equal(player.status, 'pause');
    assert.equal(player.currentTrack, player.currentTrack);
    assert.equal(player.currentTrack, 0);
    player.next();
    assert.equal(player.currentTrack, 1);
    player.prev();
    assert.equal(player.currentTrack, 0);
    player.next();
    player.next();
    player.next();
    player.next();
    assert.equal(player.currentTrack, 0);
    player.prev();
    assert.equal(player.currentTrack, 3);
  });
});


var assert = require('assert');
describe('cashbox', function() {
  describe('open', function() {
    it('should set cashbox status on open and set the start value of amount', function() {
      cashbox.open();
      assert.equal(cashbox.status, 'open');
      assert.equal(cashbox.history, 'cashbox is open');
      assert.equal(cashbox.amount, 0);
    });
    it('if open has a value amount should get a value of this', function() {
      cashbox.open(1);
      assert.equal(cashbox.amount, 1);
      cashbox.open(-1);
      assert.equal(cashbox.amount, 1);
      cashbox.open(0);
      assert.equal(cashbox.amount, 0);
      cashbox.open('text');
      assert.equal(cashbox.amount, 0);
      cashbox.open(NaN);
      assert.equal(cashbox.amount, 0);
      cashbox.open(undefined);
      assert.equal(cashbox.amount, 0);
      cashbox.open(Object);
      assert.equal(cashbox.amount, 0);
    });
  });
  describe('addPayment', function() {
    it('should add payment operation to the history', function() {
      cashbox.addPayment(100);
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()']);
      cashbox.addPayment(100, 'bills');
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(NaN);
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(undefined);
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(Object, 'bills');
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(100, 200);
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment('100', 'bills');
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(500, undefined);
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)', 'payment added 500()']);
    });
    it('should add the payment value to amount', function() {
      cashbox.addPayment(100);
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment(0);
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment();
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment(undefined);
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment(NaN);
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment('100');
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment(Object);
      assert.deepEqual(cashbox.amount, 800);
    });
    it('should keep the current amount if the value of payment is negative', function() {
      cashbox.addPayment(-100);
      assert.deepEqual(cashbox.amount, 800);
    });
  });
  describe('refundPayment', function() {
    it('should add refund operation to the history', function() {
      cashbox.refundPayment(100);
      assert.deepEqual(cashbox.history, ['cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'cashbox is open', 'payment added 100()', 'payment added 100(bills)', 'payment added 500()', 'payment added 100()', 'payment refunded 100()']);
    });
    it('should subtract the refund value from amount', function() {
      cashbox.refundPayment(100);
      assert.deepEqual(cashbox.amount, 600);
      cashbox.refundPayment(0);
      assert.deepEqual(cashbox.amount, 600);
      cashbox.refundPayment(0);
      assert.deepEqual(cashbox.amount, 600);
      cashbox.refundPayment(undefined);
      assert.deepEqual(cashbox.amount, 600);
      cashbox.refundPayment(NaN);
      assert.deepEqual(cashbox.amount, 600);
      cashbox.refundPayment('100');
      assert.deepEqual(cashbox.amount, 600);
      cashbox.refundPayment(Object);
      assert.deepEqual(cashbox.amount, 600);
    });
    it('should keep the current amount if the value of refund is negative', function() {
      cashbox.refundPayment(-100);
      assert.deepEqual(cashbox.amount, 600);
    });
  });
});