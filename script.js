const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let isDragging = false;
let currentItem = null;
let offsetX = 0;
let offsetY = 0;

// Attach mousedown to each cube
items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentItem = item;

    const itemRect = item.getBoundingClientRect();

    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;

    item.style.cursor = 'grabbing';
  });
});

// Mouse move – drag logic
document.addEventListener('mousemove', (e) => {
  if (!isDragging || !currentItem) return;

  const containerRect = container.getBoundingClientRect();
  const itemRect = currentItem.getBoundingClientRect();

  let left = e.clientX - containerRect.left - offsetX;
  let top = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  const maxLeft = container.clientWidth - itemRect.width;
  const maxTop = container.clientHeight - itemRect.height;

  left = Math.max(0, Math.min(left, maxLeft));
  top = Math.max(0, Math.min(top, maxTop));

  currentItem.style.left = `${left}px`;
  currentItem.style.top = `${top}px`;
});

// Mouse up – drop logic
document.addEventListener('mouseup', () => {
  if (!currentItem) return;

  isDragging = false;
  currentItem.style.cursor = 'grab';
  currentItem = null;
});
