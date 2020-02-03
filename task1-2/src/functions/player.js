'use strict';

function Player(tracklist) {
  this.trackList = tracklist;
  this.currentTrack = 0;
  this.status = 'pause';
  this.display = function() {
      if (this.trackList.length > 0) {
        return 'Track: ' + this.trackList[this.currentTrack] + ' Status: ' + this.status;
      } else { return 'track you are looking for is not found'; }
    },
    this.play = function() {
      this.status = 'play';
    },
    this.pause = function() {
      this.status = 'pause';
    },
    this.next = function() {
      this.currentTrack = (this.currentTrack + 1);
      if (this.currentTrack > this.trackList.length - 1) {
        this.currentTrack = 0;
      }
    },
    this.prev = function() {
      this.currentTrack = (this.currentTrack - 1);
      if (this.currentTrack < 0) {
        this.currentTrack = this.trackList.length - 1;
      }
    }
}




module.exports = Player;