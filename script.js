const slider = document.querySelector('.items');

let isDown = false;
let startX = 0;
let startScrollLeft = 0;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX;
  startScrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX;
  const walk = startX - x;
  slider.scrollLeft = startScrollLeft + walk;
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});