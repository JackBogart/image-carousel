export function createImageCarousel(
  imageSlider,
  timeoutDuration = null,
  beforeTimeout = null,
  afterTimeout = null,
) {
  if (!imageSlider || imageSlider.children.length === 0) {
    throw new Error('Invalid imageSlider element.');
  }

  let currIndex = 0;
  const length = imageSlider.children.length;
  let timeoutId;

  function restartTimer() {
    if (timeoutDuration != null) {
      clearTimeout(timeoutId);
      startTimer();
    }
  }

  function startTimer() {
    if (timeoutDuration !== null) {
      timeoutId = setTimeout(() => {
        if (typeof beforeTimeout === 'function') {
          beforeTimeout();
        }

        next();

        if (typeof afterTimeout === 'function') {
          afterTimeout();
        }
      }, timeoutDuration);
    }
  }

  function prev() {
    currIndex = (currIndex - 1 + length) % length;
    updateActiveImage();
  }

  function next() {
    currIndex = (currIndex + 1) % length;
    updateActiveImage();
  }

  function setIndex(index) {
    currIndex = index;
    updateActiveImage();
  }

  function getIndex() {
    return currIndex;
  }

  function updateActiveImage() {
    imageSlider.style.left = `${currIndex * -100}%`;
    restartTimer();
  }

  function setTimeoutDuration(newTimeoutDuration) {
    if (!Number.isNaN(newTimeoutDuration)) {
      timeoutDuration = newTimeoutDuration;
    } else {
      throw new Error('Parameter is not a number.');
    }
  }

  startTimer();

  return {
    prev,
    next,
    setIndex,
    getIndex,
    updateActiveImage,
    startTimer,
    setTimeoutDuration,
    beforeTimeout,
    afterTimeout,
  };
}
