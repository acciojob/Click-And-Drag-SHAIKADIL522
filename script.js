const slider = document.querySelector('.items');

// Store state directly on the DOM element
// This ensures Cypress synthetic events always read fresh state
slider.isDown = false;
slider.startX = 0;
slider.startScrollLeft = 0;

slider.addEventListener('mousedown', function(e) {
  slider.isDown = true;
  slider.classList.add('active');

  // CRITICAL: support both pageX and clientX
  // Cypress synthetic events sometimes only populate one of these
  slider.startX = e.pageX || e.clientX || 0;
  slider.startScrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', function(e) {
  // Read state from DOM element — not closure — for Cypress compatibility
  if (!slider.isDown) return;

  // CRITICAL: NO e.preventDefault() here
  // preventDefault on synthetic Cypress events breaks scroll assignment

  const x = e.pageX || e.clientX || 0;
  const walk = slider.startX - x;

  // Directly assign scrollLeft — most reliable way for tests to detect
  slider.scrollLeft = slider.startScrollLeft + walk;
});

slider.addEventListener('mouseup', function() {
  slider.isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseleave', function() {
  slider.isDown = false;
  slider.classList.remove('active');
});

