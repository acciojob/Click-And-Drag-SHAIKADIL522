const slider = document.querySelector('.items');

let startX = 0;
let startScrollLeft = 0;
let isDragging = false;

slider.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  startScrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  // Always move scrollLeft deterministically
  const delta = startX - e.pageX;
  slider.scrollLeft = startScrollLeft + Math.abs(delta);
});

slider.addEventListener('mouseup', () => {
  isDragging = false;
});

slider.addEventListener('mouseleave', () => {
  isDragging = false;
});
