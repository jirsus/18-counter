'use strict';

const target = 18;
const targetMilliseconds = target * 1000;
const timer = document.querySelector('#timer');
const button = document.querySelector('#toggle');
const result = document.querySelector('#result');
const difference = document.querySelector('#difference');
const panel = document.querySelector('.game-panel');
let running = false;
let startedAt = 0;
let frame = 0;
let pointerActivated = false;

// Score the same rounded millisecond value that the player sees.
function evaluateTime(elapsedMilliseconds) {
  const milliseconds = Math.round(elapsedMilliseconds);
  const offset = milliseconds - targetMilliseconds;
  return {
    milliseconds,
    offset,
    state: offset === 0 ? 'win' : Math.abs(offset) < 500 ? 'close' : 'lose'
  };
}

function displayTime(milliseconds) {
  return (milliseconds / 1000).toFixed(3).padStart(6, '0');
}

function animate() {
  if (!running) return;
  timer.textContent = displayTime(Math.round(performance.now() - startedAt));
  frame = requestAnimationFrame(animate);
}

function toggleTimer() {
  const now = performance.now();
  if (!running) {
    startedAt = now;
    running = true;
    timer.textContent = '00.000';
    panel.dataset.state = 'running';
    result.textContent = 'Find your perfect moment.';
    difference.textContent = 'Stop at 18.000 seconds.';
    button.textContent = 'Stop';
    frame = requestAnimationFrame(animate);
    return;
  }

  running = false;
  cancelAnimationFrame(frame);
  const score = evaluateTime(now - startedAt);
  timer.textContent = displayTime(score.milliseconds);
  panel.dataset.state = score.state;
  result.textContent = score.state === 'win' ? 'You Win!' : score.state === 'close' ? 'So Close!' : 'Better luck next time';
  difference.textContent = score.offset === 0
    ? 'Exactly 18.000 seconds. Your perfect moment.'
    : `${(Math.abs(score.offset) / 1000).toFixed(3)} seconds ${score.offset < 0 ? 'early' : 'late'}.`;
  button.textContent = 'Start';
}

// Register a touch/mouse press immediately, without waiting for release.
button.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0) return;
  event.preventDefault();
  pointerActivated = true;
  button.focus({ preventScroll: true });
  toggleTimer();
});
// Keyboard and assistive technology activate through a synthetic click.
button.addEventListener('click', event => {
  if (pointerActivated) {
    pointerActivated = false;
    return;
  }
  if (event.detail === 0) toggleTimer();
});
button.addEventListener('pointercancel', () => { pointerActivated = false; });
button.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') pointerActivated = false;
});
// Leaving the game invalidates the attempt rather than producing a background result.
document.addEventListener('visibilitychange', () => {
  if (!document.hidden || !running) return;
  running = false;
  cancelAnimationFrame(frame);
  panel.dataset.state = 'ready';
  timer.textContent = '00.000';
  result.textContent = 'Attempt interrupted.';
  difference.textContent = 'Keep the game open. Start a new attempt.';
  button.textContent = 'Start';
});
