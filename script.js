const slider = document.querySelector('.items');

let isDown = false;
let startX = 0;
let startScrollLeft = 0;

// mousedown: record starting position and current scrollLeft
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  // Use clientX for consistency — pageX works too but must match mousemove
  startX = e.pageX;
  startScrollLeft = slider.scrollLeft;
});

// mousemove: ALL listeners on the slider itself (not document/window)
// so Cypress trigger() events reach the correct handler
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  // NO e.preventDefault() — this was breaking Cypress synthetic events
  const x = e.pageX;
  const walk = startX - x; // drag left → positive walk → scroll right
  slider.scrollLeft = startScrollLeft + walk;
});

// mouseup: stop dragging
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

// mouseleave: safety — stop drag if cursor leaves container
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

