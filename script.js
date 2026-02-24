const items = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

/* ---- MOUSE DOWN ---- */
items.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX;
    scrollLeft = items.scrollLeft;
});

/* ---- MOUSE MOVE ---- */
items.addEventListener('mousemove', (e) => {
    if (!isDown) return;

    const walk = startX - e.pageX;
    items.scrollLeft = scrollLeft + walk;
});

/* ---- MOUSE UP / LEAVE ---- */
items.addEventListener('mouseup', () => {
    isDown = false;
});

items.addEventListener('mouseleave', () => {
    isDown = false;
});

