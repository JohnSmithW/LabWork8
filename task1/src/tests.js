'use strict';

const replaceString = require('./functions/replaceString.js');
const isArrayEqual = require('./functions/isArrayEqual.js');
const flatArray = require('./functions/flatArray.js');
const isTimeRangesIntersect = require('./functions/isTimeRangesIntersect.js');
const check = require('./functions/check.js');
const Player = require('./functions/player.js');


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
  it('should return array from array ', function() {
    assert.deepEqual(flatArray([1, 2, 3]), [1, 2, 3]);
    assert.deepEqual(flatArray([]), []);
    assert.deepEqual(flatArray([1, [2, 3, 4], 5]), [1, 2, 3, 4, 5]);
    assert.deepEqual(flatArray([1, [2, 3, 4], 5, [1]]), [1, 2, 3, 4, 5, 1]);
    assert.deepEqual(flatArray([1, [1], null, NaN, ['test']]), [1, 1]);
  });
});


describe('isTimeRangesIntersect', function() {
  it('should return true if time ranges intersect ', function() {
    assert.deepEqual(isTimeRangesIntersect(['08:30', '09:30'], ['10:30', '12:00']), false);
    assert.deepEqual(isTimeRangesIntersect(['18:30', '19:30'], ['19:00', '21:00']), true);
  });
});


describe('check', function() {
  it('should return true if value matches expected type', function() {
    assert.equal(check([], 'array'), true);
    assert.equal(check([], 'number'), false);
    assert.equal(check(null, 'null'), true);
    assert.equal(check('test', 'string'), true);
    assert.equal(check('', 'string'), false);
  });
});


describe('player', function() {
  /*
  var Player = {
    trackList: ['song.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3'],
    currentTrack: 0,
    status: 'pause',
    display: function() {
      if (this.trackList.length > 0) {
        return 'Track: ' + this.trackList[this.currentTrack] + ' Status: ' + this.status;
      } else { return 'track you are looking for is not found'; }
    },
    play: function() {
      this.status = 'play';
    },
    pause: function() {
      this.status = 'pause';
    },
    next: function() {
      this.currentTrack = (this.currentTrack + 1);
      if (this.currentTrack > this.trackList.length - 1) {
        this.currentTrack = 0;
      }
    },
    prev: function() {
      this.currentTrack = (this.currentTrack - 1);
      if (this.currentTrack < 0) {
        this.currentTrack = this.trackList.length - 1;
      }
    }
  };*/
  it('should change its statement depending on called functions', function() {
    assert.deepEqual(Player.trackList, ['song.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3']);
    Player.play();
    assert.equal(Player.status, 'play');
    Player.pause();
    assert.equal(Player.status, 'pause');
    assert.equal(Player.currentTrack, Player.currentTrack);
    assert.equal(Player.currentTrack, 0);
    Player.next();
    assert.equal(Player.currentTrack, 1);
    Player.prev();
    assert.equal(Player.currentTrack, 0);
    Player.next();
    Player.next();
    Player.next();
    Player.next();
    assert.equal(Player.currentTrack, 0);
    Player.prev();
    assert.equal(Player.currentTrack, 3);
  });
});