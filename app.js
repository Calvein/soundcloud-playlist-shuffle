(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/index.coffee":[function(require,module,exports){
var $, ID, audio, controls, currentTrack, form, goTo, input, list, next, nextTrack, play, playPause, prev, prevTrack, showTracks, submit, title;

ID = '5247b2c9dddfe7afb755c75a6198999d';

$ = function(sel, parent) {
  if (parent == null) {
    parent = document;
  }
  return parent.querySelector(sel);
};

form = $('form');

input = $('input');

list = $('ul');

controls = $('.controls');

prev = $('.prev');

play = $('.play');

title = $('.title');

next = $('.next');

audio = new Audio();

audio.controls = true;

form.appendChild(audio);

currentTrack = null;

showTracks = function(playlist) {
  var i, img, li, n, t, track, user, _i, _len, _ref;
  controls.removeAttribute('hidden');
  n = playlist.tracks.length;
  while (n) {
    i = Math.random() * n-- | 0;
    t = playlist.tracks[n];
    playlist.tracks[n] = playlist.tracks[i];
    playlist.tracks[i] = t;
  }
  _ref = playlist.tracks;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    track = _ref[_i];
    console.log(track);
    li = document.createElement('li');
    li.__data__ = track;
    img = document.createElement('img');
    img.src = track.artwork_url;
    user = document.createElement('span');
    user.textContent = track.user.username;
    title = document.createElement('b');
    title.textContent = track.title;
    li.appendChild(img);
    li.appendChild(user);
    li.appendChild(title);
    list.appendChild(li);
  }
  currentTrack = list.firstChild;
  list.firstChild.classList.add('active');
  title.textContent = currentTrack.__data__.title;
  return audio.src = currentTrack.__data__.src;
};

playPause = function() {
  play.classList.toggle('pause');
  if (play.classList.contains('pause')) {
    play.textContent = '>';
    return audio.pause();
  } else {
    play.textContent = '||';
    return audio.play();
  }
};

play.addEventListener('click', playPause);

goTo = function(el, forcePlay) {
  var data, isPlaying;
  if (!el) {
    return;
  }
  currentTrack.classList.remove('active');
  currentTrack = el;
  currentTrack.classList.add('active');
  data = currentTrack.__data__;
  title.textContent = data.title;
  isPlaying = forcePlay || !audio.paused;
  audio.src = data.src;
  if (isPlaying) {
    return audio.play();
  }
};

list.addEventListener('click', function(e) {
  var el;
  el = e.target;
  while (el.nodeName !== 'LI') {
    el = el.parentElement;
  }
  return goTo(el);
});

prevTrack = function() {
  return goTo(currentTrack.previousSibling);
};

prev.addEventListener('click', prevTrack);

nextTrack = function(e) {
  return goTo(currentTrack.nextSibling, e.type === 'ended');
};

next.addEventListener('click', nextTrack);

audio.addEventListener('ended', nextTrack);

document.addEventListener('keyup', function(e) {
  if ($(':focus')) {
    return;
  }
  switch (e.which) {
    case 32:
      return playPause();
    case 37:
      return prevTrack();
    case 39:
      return nextTrack();
  }
});

submit = function(e) {
  var uri, xhr;
  if (e != null) {
    e.preventDefault();
  }
  uri = 'http://api.soundcloud.com/resolve.json';
  uri += '?url=' + input.value;
  uri += '&client_id=' + ID;
  xhr = new XMLHttpRequest();
  xhr.open('GET', uri, true);
  xhr.onreadystatechange = function(e) {
    var error, playlist;
    if (this.readyState === 4) {
      if (this.status !== 200) {
        throw new Error('Error: ' + this.status);
      }
      try {
        playlist = JSON.parse(this.responseText);
      } catch (_error) {
        error = _error;
        throw error;
      }
      if (playlist.kind !== 'playlist') {
        throw new Error('Has to be a playlist');
      }
      playlist.tracks.forEach(function(track) {
        return track.src = track.stream_url + '?client_id=' + ID;
      });
      return showTracks(playlist);
    }
  };
  return xhr.send();
};

form.addEventListener('submit', submit);

submit();



},{}]},{},["./app/index.coffee"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2Rvbm5lZXMvd29ya3NwYWNlcy9zb3VuZGNsb3VkLXBsYXlsaXN0LXNodWZmbGUvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9ob21lL2Rvbm5lZXMvd29ya3NwYWNlcy9zb3VuZGNsb3VkLXBsYXlsaXN0LXNodWZmbGUvYXBwL2luZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0NBLElBQUEsMklBQUE7O0FBQUEsRUFBQSxHQUFLLGtDQUFMLENBQUE7O0FBQUEsQ0FHQSxHQUFJLFNBQUMsR0FBRCxFQUFNLE1BQU4sR0FBQTs7SUFBTSxTQUFTO0dBQ2Y7U0FBQSxNQUFNLENBQUMsYUFBUCxDQUFxQixHQUFyQixFQURBO0FBQUEsQ0FISixDQUFBOztBQUFBLElBT0EsR0FBTyxDQUFBLENBQUUsTUFBRixDQVBQLENBQUE7O0FBQUEsS0FRQSxHQUFRLENBQUEsQ0FBRSxPQUFGLENBUlIsQ0FBQTs7QUFBQSxJQVNBLEdBQU8sQ0FBQSxDQUFFLElBQUYsQ0FUUCxDQUFBOztBQUFBLFFBVUEsR0FBVyxDQUFBLENBQUUsV0FBRixDQVZYLENBQUE7O0FBQUEsSUFXQSxHQUFPLENBQUEsQ0FBRSxPQUFGLENBWFAsQ0FBQTs7QUFBQSxJQVlBLEdBQU8sQ0FBQSxDQUFFLE9BQUYsQ0FaUCxDQUFBOztBQUFBLEtBYUEsR0FBUSxDQUFBLENBQUUsUUFBRixDQWJSLENBQUE7O0FBQUEsSUFjQSxHQUFPLENBQUEsQ0FBRSxPQUFGLENBZFAsQ0FBQTs7QUFBQSxLQWVBLEdBQVksSUFBQSxLQUFBLENBQUEsQ0FmWixDQUFBOztBQUFBLEtBZ0JLLENBQUMsUUFBTixHQUFpQixJQWhCakIsQ0FBQTs7QUFBQSxJQWlCSSxDQUFDLFdBQUwsQ0FBaUIsS0FBakIsQ0FqQkEsQ0FBQTs7QUFBQSxZQW1CQSxHQUFlLElBbkJmLENBQUE7O0FBQUEsVUFzQkEsR0FBYSxTQUFDLFFBQUQsR0FBQTtBQUNULE1BQUEsNkNBQUE7QUFBQSxFQUFBLFFBQVEsQ0FBQyxlQUFULENBQXlCLFFBQXpCLENBQUEsQ0FBQTtBQUFBLEVBR0EsQ0FBQSxHQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFIcEIsQ0FBQTtBQUlBLFNBQU0sQ0FBTixHQUFBO0FBQ0ksSUFBQSxDQUFBLEdBQUksSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLENBQUEsRUFBaEIsR0FBc0IsQ0FBMUIsQ0FBQTtBQUFBLElBQ0EsQ0FBQSxHQUFJLFFBQVEsQ0FBQyxNQUFPLENBQUEsQ0FBQSxDQURwQixDQUFBO0FBQUEsSUFFQSxRQUFRLENBQUMsTUFBTyxDQUFBLENBQUEsQ0FBaEIsR0FBcUIsUUFBUSxDQUFDLE1BQU8sQ0FBQSxDQUFBLENBRnJDLENBQUE7QUFBQSxJQUdBLFFBQVEsQ0FBQyxNQUFPLENBQUEsQ0FBQSxDQUFoQixHQUFxQixDQUhyQixDQURKO0VBQUEsQ0FKQTtBQVdBO0FBQUEsT0FBQSwyQ0FBQTtxQkFBQTtBQUNJLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaLENBQUEsQ0FBQTtBQUFBLElBQ0EsRUFBQSxHQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBREwsQ0FBQTtBQUFBLElBRUEsRUFBRSxDQUFDLFFBQUgsR0FBYyxLQUZkLENBQUE7QUFBQSxJQUlBLEdBQUEsR0FBTSxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QixDQUpOLENBQUE7QUFBQSxJQUtBLEdBQUcsQ0FBQyxHQUFKLEdBQVUsS0FBSyxDQUFDLFdBTGhCLENBQUE7QUFBQSxJQU1BLElBQUEsR0FBTyxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixDQU5QLENBQUE7QUFBQSxJQU9BLElBQUksQ0FBQyxXQUFMLEdBQW1CLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFQOUIsQ0FBQTtBQUFBLElBUUEsS0FBQSxHQUFRLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBUlIsQ0FBQTtBQUFBLElBU0EsS0FBSyxDQUFDLFdBQU4sR0FBb0IsS0FBSyxDQUFDLEtBVDFCLENBQUE7QUFBQSxJQVdBLEVBQUUsQ0FBQyxXQUFILENBQWUsR0FBZixDQVhBLENBQUE7QUFBQSxJQVlBLEVBQUUsQ0FBQyxXQUFILENBQWUsSUFBZixDQVpBLENBQUE7QUFBQSxJQWFBLEVBQUUsQ0FBQyxXQUFILENBQWUsS0FBZixDQWJBLENBQUE7QUFBQSxJQWVBLElBQUksQ0FBQyxXQUFMLENBQWlCLEVBQWpCLENBZkEsQ0FESjtBQUFBLEdBWEE7QUFBQSxFQThCQSxZQUFBLEdBQWUsSUFBSSxDQUFDLFVBOUJwQixDQUFBO0FBQUEsRUErQkEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBMUIsQ0FBOEIsUUFBOUIsQ0EvQkEsQ0FBQTtBQUFBLEVBZ0NBLEtBQUssQ0FBQyxXQUFOLEdBQW9CLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FoQzFDLENBQUE7U0FpQ0EsS0FBSyxDQUFDLEdBQU4sR0FBWSxZQUFZLENBQUMsUUFBUSxDQUFDLElBbEN6QjtBQUFBLENBdEJiLENBQUE7O0FBQUEsU0E0REEsR0FBWSxTQUFBLEdBQUE7QUFDUixFQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBZixDQUFzQixPQUF0QixDQUFBLENBQUE7QUFDQSxFQUFBLElBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFmLENBQXdCLE9BQXhCLENBQUg7QUFDSSxJQUFBLElBQUksQ0FBQyxXQUFMLEdBQW9CLEdBQXBCLENBQUE7V0FDQSxLQUFLLENBQUMsS0FBTixDQUFBLEVBRko7R0FBQSxNQUFBO0FBSUksSUFBQSxJQUFJLENBQUMsV0FBTCxHQUFtQixJQUFuQixDQUFBO1dBQ0EsS0FBSyxDQUFDLElBQU4sQ0FBQSxFQUxKO0dBRlE7QUFBQSxDQTVEWixDQUFBOztBQUFBLElBb0VJLENBQUMsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsU0FBL0IsQ0FwRUEsQ0FBQTs7QUFBQSxJQXNFQSxHQUFPLFNBQUMsRUFBRCxFQUFLLFNBQUwsR0FBQTtBQUNILE1BQUEsZUFBQTtBQUFBLEVBQUEsSUFBQSxDQUFBLEVBQUE7QUFBQSxVQUFBLENBQUE7R0FBQTtBQUFBLEVBQ0EsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUF2QixDQUE4QixRQUE5QixDQURBLENBQUE7QUFBQSxFQUVBLFlBQUEsR0FBZSxFQUZmLENBQUE7QUFBQSxFQUdBLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBdkIsQ0FBMkIsUUFBM0IsQ0FIQSxDQUFBO0FBQUEsRUFNQSxJQUFBLEdBQU8sWUFBWSxDQUFDLFFBTnBCLENBQUE7QUFBQSxFQU9BLEtBQUssQ0FBQyxXQUFOLEdBQW9CLElBQUksQ0FBQyxLQVB6QixDQUFBO0FBQUEsRUFTQSxTQUFBLEdBQVksU0FBQSxJQUFhLENBQUEsS0FBTSxDQUFDLE1BVGhDLENBQUE7QUFBQSxFQVVBLEtBQUssQ0FBQyxHQUFOLEdBQVksSUFBSSxDQUFDLEdBVmpCLENBQUE7QUFXQSxFQUFBLElBQUcsU0FBSDtXQUFrQixLQUFLLENBQUMsSUFBTixDQUFBLEVBQWxCO0dBWkc7QUFBQSxDQXRFUCxDQUFBOztBQUFBLElBcUZJLENBQUMsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsU0FBQyxDQUFELEdBQUE7QUFDM0IsTUFBQSxFQUFBO0FBQUEsRUFBQSxFQUFBLEdBQUssQ0FBQyxDQUFDLE1BQVAsQ0FBQTtBQUNBLFNBQU0sRUFBRSxDQUFDLFFBQUgsS0FBZSxJQUFyQixHQUFBO0FBQ0ksSUFBQSxFQUFBLEdBQUssRUFBRSxDQUFDLGFBQVIsQ0FESjtFQUFBLENBREE7U0FHQSxJQUFBLENBQUssRUFBTCxFQUoyQjtBQUFBLENBQS9CLENBckZBLENBQUE7O0FBQUEsU0E2RkEsR0FBWSxTQUFBLEdBQUE7U0FDUixJQUFBLENBQUssWUFBWSxDQUFDLGVBQWxCLEVBRFE7QUFBQSxDQTdGWixDQUFBOztBQUFBLElBK0ZJLENBQUMsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsU0FBL0IsQ0EvRkEsQ0FBQTs7QUFBQSxTQWlHQSxHQUFZLFNBQUMsQ0FBRCxHQUFBO1NBQ1IsSUFBQSxDQUFLLFlBQVksQ0FBQyxXQUFsQixFQUErQixDQUFDLENBQUMsSUFBRixLQUFVLE9BQXpDLEVBRFE7QUFBQSxDQWpHWixDQUFBOztBQUFBLElBbUdJLENBQUMsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsU0FBL0IsQ0FuR0EsQ0FBQTs7QUFBQSxLQW9HSyxDQUFDLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFNBQWhDLENBcEdBLENBQUE7O0FBQUEsUUF1R1EsQ0FBQyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxTQUFDLENBQUQsR0FBQTtBQUMvQixFQUFBLElBQVUsQ0FBQSxDQUFFLFFBQUYsQ0FBVjtBQUFBLFVBQUEsQ0FBQTtHQUFBO0FBQ0EsVUFBTyxDQUFDLENBQUMsS0FBVDtBQUFBLFNBQ1MsRUFEVDthQUNpQixTQUFBLENBQUEsRUFEakI7QUFBQSxTQUVTLEVBRlQ7YUFFaUIsU0FBQSxDQUFBLEVBRmpCO0FBQUEsU0FHUyxFQUhUO2FBR2lCLFNBQUEsQ0FBQSxFQUhqQjtBQUFBLEdBRitCO0FBQUEsQ0FBbkMsQ0F2R0EsQ0FBQTs7QUFBQSxNQWdIQSxHQUFTLFNBQUMsQ0FBRCxHQUFBO0FBQ0wsTUFBQSxRQUFBOztJQUFBLENBQUMsQ0FBRSxjQUFILENBQUE7R0FBQTtBQUFBLEVBR0EsR0FBQSxHQUFNLHdDQUhOLENBQUE7QUFBQSxFQUlBLEdBQUEsSUFBTyxPQUFBLEdBQVUsS0FBSyxDQUFDLEtBSnZCLENBQUE7QUFBQSxFQUtBLEdBQUEsSUFBTyxhQUFBLEdBQWdCLEVBTHZCLENBQUE7QUFBQSxFQU9BLEdBQUEsR0FBVSxJQUFBLGNBQUEsQ0FBQSxDQVBWLENBQUE7QUFBQSxFQVFBLEdBQUcsQ0FBQyxJQUFKLENBQVMsS0FBVCxFQUFnQixHQUFoQixFQUFxQixJQUFyQixDQVJBLENBQUE7QUFBQSxFQVVBLEdBQUcsQ0FBQyxrQkFBSixHQUF5QixTQUFDLENBQUQsR0FBQTtBQUNyQixRQUFBLGVBQUE7QUFBQSxJQUFBLElBQUcsSUFBQyxDQUFBLFVBQUQsS0FBZSxDQUFsQjtBQUNJLE1BQUEsSUFBNEMsSUFBQyxDQUFBLE1BQUQsS0FBVyxHQUF2RDtBQUFBLGNBQVUsSUFBQSxLQUFBLENBQU0sU0FBQSxHQUFZLElBQUMsQ0FBQSxNQUFuQixDQUFWLENBQUE7T0FBQTtBQUNBO0FBQ0ksUUFBQSxRQUFBLEdBQVcsSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFDLENBQUEsWUFBWixDQUFYLENBREo7T0FBQSxjQUFBO0FBR0ksUUFERSxjQUNGLENBQUE7QUFBQSxjQUFNLEtBQU4sQ0FISjtPQURBO0FBS0EsTUFBQSxJQUFHLFFBQVEsQ0FBQyxJQUFULEtBQW1CLFVBQXRCO0FBQ0ksY0FBVSxJQUFBLEtBQUEsQ0FBTSxzQkFBTixDQUFWLENBREo7T0FMQTtBQUFBLE1BU0EsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFoQixDQUF3QixTQUFDLEtBQUQsR0FBQTtlQUNwQixLQUFLLENBQUMsR0FBTixHQUFZLEtBQUssQ0FBQyxVQUFOLEdBQW1CLGFBQW5CLEdBQW1DLEdBRDNCO01BQUEsQ0FBeEIsQ0FUQSxDQUFBO2FBYUEsVUFBQSxDQUFXLFFBQVgsRUFkSjtLQURxQjtFQUFBLENBVnpCLENBQUE7U0EwQkEsR0FBRyxDQUFDLElBQUosQ0FBQSxFQTNCSztBQUFBLENBaEhULENBQUE7O0FBQUEsSUE2SUksQ0FBQyxnQkFBTCxDQUFzQixRQUF0QixFQUFnQyxNQUFoQyxDQTdJQSxDQUFBOztBQUFBLE1BOElBLENBQUEsQ0E5SUEsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIEFwcCBwdWJsaWMgSURcbklEID0gJzUyNDdiMmM5ZGRkZmU3YWZiNzU1Yzc1YTYxOTg5OTlkJ1xuXG4jIGpRdWVyeVxuJCA9IChzZWwsIHBhcmVudCA9IGRvY3VtZW50KSAtPlxuICAgIHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbClcblxuIyBFbGVtZW50c1xuZm9ybSA9ICQoJ2Zvcm0nKVxuaW5wdXQgPSAkKCdpbnB1dCcpXG5saXN0ID0gJCgndWwnKVxuY29udHJvbHMgPSAkKCcuY29udHJvbHMnKVxucHJldiA9ICQoJy5wcmV2JylcbnBsYXkgPSAkKCcucGxheScpXG50aXRsZSA9ICQoJy50aXRsZScpXG5uZXh0ID0gJCgnLm5leHQnKVxuYXVkaW8gPSBuZXcgQXVkaW8oKVxuYXVkaW8uY29udHJvbHMgPSB0cnVlXG5mb3JtLmFwcGVuZENoaWxkKGF1ZGlvKVxuXG5jdXJyZW50VHJhY2sgPSBudWxsXG5cbiMgQWZ0ZXIgdGhlIHBsYXlsaXN0IGlzIGZldGNoZWRcbnNob3dUcmFja3MgPSAocGxheWxpc3QpIC0+XG4gICAgY29udHJvbHMucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKVxuXG4gICAgIyBGaXNoZXItWWF0ZXMgc2h1ZmZsZVxuICAgIG4gPSBwbGF5bGlzdC50cmFja3MubGVuZ3RoXG4gICAgd2hpbGUgblxuICAgICAgICBpID0gTWF0aC5yYW5kb20oKSAqIG4tLSB8IDAgIyAwIOKJpCBpIDwgblxuICAgICAgICB0ID0gcGxheWxpc3QudHJhY2tzW25dXG4gICAgICAgIHBsYXlsaXN0LnRyYWNrc1tuXSA9IHBsYXlsaXN0LnRyYWNrc1tpXVxuICAgICAgICBwbGF5bGlzdC50cmFja3NbaV0gPSB0XG5cbiAgICAjIFNob3cgdHJhY2tsaXN0XG4gICAgZm9yIHRyYWNrIGluIHBsYXlsaXN0LnRyYWNrc1xuICAgICAgICBjb25zb2xlLmxvZyB0cmFja1xuICAgICAgICBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgbGkuX19kYXRhX18gPSB0cmFja1xuXG4gICAgICAgIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgIGltZy5zcmMgPSB0cmFjay5hcnR3b3JrX3VybFxuICAgICAgICB1c2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIHVzZXIudGV4dENvbnRlbnQgPSB0cmFjay51c2VyLnVzZXJuYW1lXG4gICAgICAgIHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYicpXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdHJhY2sudGl0bGVcblxuICAgICAgICBsaS5hcHBlbmRDaGlsZChpbWcpXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKHVzZXIpXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKHRpdGxlKVxuXG4gICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQobGkpXG5cbiAgICAjIFNldHVwIHRoZSBmaXJzdCB0cmFja1xuICAgIGN1cnJlbnRUcmFjayA9IGxpc3QuZmlyc3RDaGlsZFxuICAgIGxpc3QuZmlyc3RDaGlsZC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gY3VycmVudFRyYWNrLl9fZGF0YV9fLnRpdGxlXG4gICAgYXVkaW8uc3JjID0gY3VycmVudFRyYWNrLl9fZGF0YV9fLnNyY1xuXG4jIEV2ZW50cyAjXG4jIFRvZ2dsZSBwbGF5IG9yIHBhdXNlXG5wbGF5UGF1c2UgPSAtPlxuICAgIHBsYXkuY2xhc3NMaXN0LnRvZ2dsZSgncGF1c2UnKVxuICAgIGlmIHBsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYXVzZScpXG4gICAgICAgIHBsYXkudGV4dENvbnRlbnQgPSAgJz4nXG4gICAgICAgIGF1ZGlvLnBhdXNlKClcbiAgICBlbHNlXG4gICAgICAgIHBsYXkudGV4dENvbnRlbnQgPSAnfHwnXG4gICAgICAgIGF1ZGlvLnBsYXkoKVxucGxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlQYXVzZSlcblxuZ29UbyA9IChlbCwgZm9yY2VQbGF5KSAtPlxuICAgIHJldHVybiB1bmxlc3MgZWxcbiAgICBjdXJyZW50VHJhY2suY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICBjdXJyZW50VHJhY2sgPSBlbFxuICAgIGN1cnJlbnRUcmFjay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuXG4gICAgIyBTZXQgbmV3IGRhdGFcbiAgICBkYXRhID0gY3VycmVudFRyYWNrLl9fZGF0YV9fXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBkYXRhLnRpdGxlXG4gICAgIyBJcyB0cnVlIHdoZW4geW91IGNoYW5nZSB0aGUgc3JjXG4gICAgaXNQbGF5aW5nID0gZm9yY2VQbGF5IG9yICFhdWRpby5wYXVzZWRcbiAgICBhdWRpby5zcmMgPSBkYXRhLnNyY1xuICAgIGlmIGlzUGxheWluZyB0aGVuIGF1ZGlvLnBsYXkoKVxuXG4jIFBsYXkgb3RoZXIgc29uZ1xubGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSAtPlxuICAgIGVsID0gZS50YXJnZXRcbiAgICB1bnRpbCBlbC5ub2RlTmFtZSBpcyAnTEknXG4gICAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudFxuICAgIGdvVG8oZWwpXG4pXG5cbiMgUHJldi9OZXh0XG5wcmV2VHJhY2sgPSAtPlxuICAgIGdvVG8oY3VycmVudFRyYWNrLnByZXZpb3VzU2libGluZylcbnByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcmV2VHJhY2spXG5cbm5leHRUcmFjayA9IChlKSAtPlxuICAgIGdvVG8oY3VycmVudFRyYWNrLm5leHRTaWJsaW5nLCBlLnR5cGUgaXMgJ2VuZGVkJylcbm5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBuZXh0VHJhY2spXG5hdWRpby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIG5leHRUcmFjaylcblxuIyBLZXlib2FyZCBldmVudHNcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpIC0+XG4gICAgcmV0dXJuIGlmICQoJzpmb2N1cycpXG4gICAgc3dpdGNoIGUud2hpY2hcbiAgICAgICAgd2hlbiAzMiB0aGVuIHBsYXlQYXVzZSgpXG4gICAgICAgIHdoZW4gMzcgdGhlbiBwcmV2VHJhY2soKVxuICAgICAgICB3aGVuIDM5IHRoZW4gbmV4dFRyYWNrKClcbilcblxuIyBTdWJtaXQgcGxheWxpc3RcbnN1Ym1pdCA9IChlKSAtPlxuICAgIGU/LnByZXZlbnREZWZhdWx0KClcblxuICAgICMgQnVpbGQgQVBJIFVSTFxuICAgIHVyaSA9ICdodHRwOi8vYXBpLnNvdW5kY2xvdWQuY29tL3Jlc29sdmUuanNvbidcbiAgICB1cmkgKz0gJz91cmw9JyArIGlucHV0LnZhbHVlXG4gICAgdXJpICs9ICcmY2xpZW50X2lkPScgKyBJRFxuXG4gICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICB4aHIub3BlbignR0VUJywgdXJpLCB0cnVlKVxuXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IChlKSAtPlxuICAgICAgICBpZiBAcmVhZHlTdGF0ZSBpcyA0XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yOiAnICsgQHN0YXR1cykgdW5sZXNzIEBzdGF0dXMgaXMgMjAwXG4gICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICBwbGF5bGlzdCA9IEpTT04ucGFyc2UoQHJlc3BvbnNlVGV4dClcbiAgICAgICAgICAgIGNhdGNoIGVycm9yXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgICAgICAgIGlmIHBsYXlsaXN0LmtpbmQgaXNudCAncGxheWxpc3QnXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIYXMgdG8gYmUgYSBwbGF5bGlzdCcpXG5cbiAgICAgICAgICAgICMgRm9yIGNvbnZlbmllbmN5XG4gICAgICAgICAgICBwbGF5bGlzdC50cmFja3MuZm9yRWFjaCgodHJhY2spIC0+XG4gICAgICAgICAgICAgICAgdHJhY2suc3JjID0gdHJhY2suc3RyZWFtX3VybCArICc/Y2xpZW50X2lkPScgKyBJRFxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICBzaG93VHJhY2tzKHBsYXlsaXN0KVxuICAgIHhoci5zZW5kKClcblxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBzdWJtaXQpXG5zdWJtaXQoKSJdfQ==