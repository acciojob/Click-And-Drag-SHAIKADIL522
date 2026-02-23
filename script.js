const slider = document.querySelector('.items');
let startX = 0;
let startScrollLeft = 0;
let isDragging = false;

slider.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  startScrollLeft = slider.scrollLeft;
  slider.classList.add('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const delta = startX - e.pageX;
  slider.scrollLeft = startScrollLeft + delta;
});

slider.addEventListener('mouseup', () => {
  isDragging = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseleave', () => {
  isDragging = false;
  slider.classList.remove('active');
});
