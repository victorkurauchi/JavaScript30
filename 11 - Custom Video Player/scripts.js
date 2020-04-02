// get elements
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const skipButtons = document.querySelectorAll('[data-skip]');
const rangeButtons = document.querySelectorAll('.player__slider');
const toggleButton = document.querySelector('.toggle');
const fullscreen = document.querySelector('.fullscreen');

console.log('skip b', skipButtons);

// handle events
function handlePause() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function handlePauseEvent() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log('icon', icon);
  toggleButton.textContent = icon;
}

function handleSkip() {
  console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange() {
  video[this.name] = this.value;
}

function handleTimeUpdate() {
  const percent = (this.currentTime / this.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      video.exitFullscreen(); 
    }
  }
}

// hook events
toggleButton.addEventListener('click', handlePause)
fullscreen.addEventListener('click', toggleFullScreen);
video.addEventListener('click', handlePause)
video.addEventListener('pause', handlePauseEvent)
video.addEventListener('play', handlePauseEvent)
video.addEventListener('timeupdate', handleTimeUpdate);

skipButtons.forEach(button => button.addEventListener('click', handleSkip))

rangeButtons.forEach(button => button.addEventListener('click', handleRange))
