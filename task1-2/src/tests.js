'use strict';


const replaceString = require('./functions/replaceString.js');
const isArrayEqual = require('./functions/isArrayEqual.js');
const flatArray = require('./functions/flatArray.js');
const isTimeRangesIntersect = require('./functions/isTimeRangesIntersect.js');
const check = require('./functions/check.js');
const Player = require('./functions/player.js');
const Cashbox = require('./functions/cashbox.js');


var assert = require('assert');
describe('replaceString', function() {
  it('should return false if the value is incorrect', function() {
    assert.equal(replaceString('', 'a', 'b'), false);
    assert.equal(replaceString('text', '', ''), false);
    assert.equal(replaceString(123, 'c', ''), false);
    assert.equal(replaceString(null, 'c', ''), false);
    assert.equal(replaceString(undefined, 'c', ''), false);
    assert.equal(replaceString(NaN, 'c', ''), false);
    assert.equal(replaceString('text', '', 'e'), false);
    assert.equal(replaceString('text', 123, 'e'), false);
    assert.equal(replaceString('text', null, 'e'), false);
    assert.equal(replaceString('text', undefined, 'e'), false);
    assert.equal(replaceString('text', NaN, 'e'), false);
    assert.equal(replaceString('text', 't', 123), false);
    assert.equal(replaceString('text', 't', null), false);
    assert.equal(replaceString('text', 't', undefined), false);
    assert.equal(replaceString('text', 't', NaN), false);
  });

  it('should return string with replaced letter or without letter if the value is empty', function() {
    assert.equal(replaceString('some text', 's', 'b'), 'bome text');
    assert.equal(replaceString('cart', 'c', ''), 'art');
  });
  it('should change all letters in string after replacement', function() {
    assert.equal(replaceString('example of text', 'e', 'a'), 'axampla of taxt');
  });
});


describe('isArrayEqual', function() {
  it('should return false if the first array is not equal to the second', function() {
    assert.equal(isArrayEqual([], null), false);
    assert.equal(isArrayEqual([], ['test']), false);
    assert.equal(isArrayEqual([1, null, 3], [1, undefined, 3]), false);
    assert.equal(isArrayEqual([false, null], [true, null]), false);
  });
  it('should return true if arrays equal', function() {
    assert.equal(isArrayEqual([], []), true);
    assert.equal(isArrayEqual([1, 2, 3], [1, 2, 3]), true);
    assert.equal(isArrayEqual(['test'], ['test']), true);
    assert.equal(isArrayEqual([undefined], [undefined]), true);
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
  it('should return true if the ranges are equal', function() {
    assert.deepEqual(isTimeRangesIntersect(['18:30', '19:30'], ['18:30', '19:30']), true);
  });
});


describe('check', function() {
  it('should return true if value matches the expected type', function() {
    assert.equal(check([], 'array'), true);
    assert.equal(check(null, 'null'), true);
    assert.equal(check('test', 'string'), true);
    assert.equal(check(undefined, 'undefined'), true);
    assert.equal(check(Object.prototype, 'object'), true);
  });
  it('should return false if value does not match the expected type', function() {
    assert.equal(check([], 'number'), false);
    assert.equal(check('', 'string'), false);
  });
  it('should return false if value of expected type is incorrect', function() {
    assert.equal(check([], null), false);
    assert.equal(check('', []), false);
    assert.equal(check([], []), false);
    assert.equal(check('', ''), false);
    assert.equal(check(Object, Object), false);
    assert.equal(check(undefined, undefined), false);
    assert.equal(check([], {}), false);
  });
});





describe('player', function() {
  describe('play', function() {
    const player = new Player(['song.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3']);
    it('should set status on play', function() {
      player.play();
      assert.equal(player.status, 'play');
    });
  });

  describe('play(empty tracklist)', function() {
    const player = new Player([]);
    it('should set status on play', function() {
      player.play();
      assert.equal(player.status, 'play');
    });
  });


  describe('pause', function() {
    const player = new Player(['song.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3']);
    it('should set status on pause', function() {
      player.pause();
      assert.equal(player.status, 'pause');
    });
  });

  describe('pause(empty tracklist)', function() {
    const player = new Player([]);
    it('should set status on pause', function() {
      player.pause();
      assert.equal(player.status, 'pause');
    });
  });


  describe('next', function() {
    const player = new Player(['song.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3']);
    it('should switch to the next song in tracklist', function() {
      player.next();
      assert.equal(player.currentTrack, 1);
    });
    it('should switch to the first song in tracklist if the current track is the last one', function() {
      player.next();
      player.next();
      player.next();
      assert.equal(player.currentTrack, 0);
    });
  });

  describe('next(empty tracklicst)', function() {
    const player = new Player([]);
    it('should keep the track on position 0', function() {
      player.next();
      assert.equal(player.currentTrack, 0);
    });
  });


  describe('prev', function() {
    const player = new Player(['song.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3']);
    it('should switch to the previous song in tracklist', function() {
      player.next();
      player.prev();
      assert.equal(player.currentTrack, 0);
    });
    it('should switch to the last song in tracklist if the current track is the first one', function() {
      player.prev();
      assert.equal(player.currentTrack, 3);
    });
  });

  describe('prev(empty tracklist)', function() {
    const player = new Player([]);
    it('should keep the track on position 0', function() {
      player.prev();
      assert.equal(player.currentTrack, 0);
    });
  });


  describe('tracklist', function() {
    const player = new Player(['song.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3']);
    it('should display the tracklist', function() {
      assert.deepEqual(player.trackList, ['song.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3']);
    });
  });

  describe('tracklist(empty tracklist)', function() {
    const player = new Player([]);
    it('should display the empty tracklist', function() {
      assert.deepEqual(player.trackList, []);
    });
  });



  describe('display', function() {
    const player = new Player(['song.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3']);
    it('should display the current track and status', function() {
      assert.deepEqual(player.display(), 'Track: song.mp3 Status: pause');
    });
    it('should display the message if the tracklist is empty', function() {
      player.trackList = [];
      assert.deepEqual(player.display(), 'track you are looking for is not found');
    });
  });

  describe('display(empty tracklist)', function() {
    const player = new Player([]);
    it('should display the message', function() {
      assert.deepEqual(player.display(), 'track you are looking for is not found');
    });
  });
});





describe('cashbox', function() {
  describe('open', function() {
    const cashbox = new Cashbox();
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
    const cashbox = new Cashbox();
    it('should add payment operation to the history', function() {
      cashbox.open();
      cashbox.history = [];
      cashbox.addPayment(100);
      assert.deepEqual(cashbox.history, ['payment added 100()']);
      cashbox.addPayment(100, 'bills');
      assert.deepEqual(cashbox.history, ['payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(NaN);
      assert.deepEqual(cashbox.history, ['payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(undefined);
      assert.deepEqual(cashbox.history, ['payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(Object, 'bills');
      assert.deepEqual(cashbox.history, ['payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(100, 200);
      assert.deepEqual(cashbox.history, ['payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment('100', 'bills');
      assert.deepEqual(cashbox.history, ['payment added 100()', 'payment added 100(bills)']);
      cashbox.addPayment(500, undefined);
      assert.deepEqual(cashbox.history, ['payment added 100()', 'payment added 100(bills)', 'payment added 500()']);
    });
    it('should add the payment value to amount', function() {
      cashbox.addPayment(100);
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment(0);
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment();
      assert.deepEqual(cashbox.amount, 800);
    });
    it('should keep the current amount if the value of payment is negative', function() {
      cashbox.addPayment(-100);
      assert.deepEqual(cashbox.amount, 800);
    });
    it('should keep the current amount if the value of payment is incorrect', function() {
      cashbox.addPayment(undefined);
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment(NaN);
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment('100');
      assert.deepEqual(cashbox.amount, 800);
      cashbox.addPayment(Object);
      assert.deepEqual(cashbox.amount, 800);
    });
    it('should return a message if the value of payment is incorrect', function() {
      assert.deepEqual(cashbox.addPayment(undefined), 'error , amount have not changed');
      assert.deepEqual(cashbox.addPayment(NaN), 'error , amount have not changed');
      assert.deepEqual(cashbox.addPayment('100'), 'error , amount have not changed');
      assert.deepEqual(cashbox.addPayment(Object), 'error , amount have not changed');
    });
  });
  describe('refundPayment', function() {
    const cashbox = new Cashbox();
    it('should add refund operation to the history', function() {
      cashbox.open();
      cashbox.history = [];
      cashbox.addPayment(200);
      cashbox.refundPayment(100);
      assert.deepEqual(cashbox.history, ['payment added 200()', 'payment refunded 100()']);
    });
    it('should subtract the refund value from amount', function() {
      cashbox.refundPayment(100);
      assert.deepEqual(cashbox.amount, 0);
      cashbox.refundPayment(0);
      assert.deepEqual(cashbox.amount, 0);
      cashbox.refundPayment(undefined);
      assert.deepEqual(cashbox.amount, 0);
      cashbox.refundPayment(NaN);
      assert.deepEqual(cashbox.amount, 0);
      cashbox.refundPayment('100');
      assert.deepEqual(cashbox.amount, 0);
      cashbox.refundPayment(Object);
      assert.deepEqual(cashbox.amount, 0);
    });
    it('should keep the current amount if the value of refund is negative', function() {
      cashbox.refundPayment(-100);
      assert.deepEqual(cashbox.amount, 0);
    });
    it('should not subtract from amount if amount is 0', function() {
      cashbox.refundPayment(-100);
      assert.deepEqual(cashbox.amount, 0);
    });
    it('should keep the current amount if the value of refund is incorrect', function() {
      cashbox.refundPayment(undefined);
      assert.deepEqual(cashbox.amount, 0);
      cashbox.refundPayment(NaN);
      assert.deepEqual(cashbox.amount, 0);
      cashbox.refundPayment('100');
      assert.deepEqual(cashbox.amount, 0);
      cashbox.refundPayment(Object);
      assert.deepEqual(cashbox.amount, 0);
    });
    it('should return a message if the value of refund is incorrect', function() {
      assert.deepEqual(cashbox.refundPayment(undefined), 'error , amount have not changed');
      assert.deepEqual(cashbox.refundPayment(NaN), 'error , amount have not changed');
      assert.deepEqual(cashbox.refundPayment('100'), 'error , amount have not changed');
      assert.deepEqual(cashbox.refundPayment(Object), 'error , amount have not changed');
    });
  });
});
