'use strict';

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
};

module.exports = Player;