const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

/* ---- CONFIG ---- */
const CUBE_SIZE = 60;
const GAP = 10;
const GRID_SIZE = CUBE_SIZE + GAP;
const COLUMNS = 4;

/* ---- INITIAL GRID POSITIONING ---- */
cubes.forEach((cube, index) => {
    const row = Math.floor(index / COLUMNS);
    const col = index % COLUMNS;

    cube.style.left = `${col * GRID_SIZE}px`;
    cube.style.top = `${row * GRID_SIZE}px`;
});

/* ---- UTIL: GET POINTER POSITION (Mouse + Touch) ---- */
function getPointerPosition(event) {
    if (event.touches && event.touches[0]) {
        return {
            x: event.touches[0].pageX,
            y: event.touches[0].pageY
        };
    }
    return {
        x: event.pageX,
        y: event.pageY
    };
}

/* ---- START DRAG ---- */
function startDrag(event) {
    activeCube = event.currentTarget;
    isDragging = true;

    const pointer = getPointerPosition(event);
    const rect = activeCube.getBoundingClientRect();

    offsetX = pointer.x - rect.left;
    offsetY = pointer.y - rect.top;

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);

    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", stopDrag);
}

/* ---- DRAG MOVE ---- */
function drag(event) {
    if (!activeCube || !isDragging) return;

    event.preventDefault();

    const pointer = getPointerPosition(event);
    const containerRect = container.getBoundingClientRect();

    let left = pointer.x - containerRect.left - offsetX;
    let top = pointer.y - containerRect.top - offsetY;

    const maxLeft = container.clientWidth - activeCube.offsetWidth;
    const maxTop = container.clientHeight - activeCube.offsetHeight;

    left = Math.max(0, Math.min(left, maxLeft));
    top = Math.max(0, Math.min(top, maxTop));

    activeCube.style.left = `${left}px`;
    activeCube.style.top = `${top}px`;
}

/* ---- STOP DRAG (WITH SNAP TO GRID) ---- */
function stopDrag() {
    if (!activeCube) return;

    // SNAP TO GRID
    let snappedLeft = Math.round(parseInt(activeCube.style.left) / GRID_SIZE) * GRID_SIZE;
    let snappedTop = Math.round(parseInt(activeCube.style.top) / GRID_SIZE) * GRID_SIZE;

    const maxLeft = container.clientWidth - activeCube.offsetWidth;
    const maxTop = container.clientHeight - activeCube.offsetHeight;

    snappedLeft = Math.max(0, Math.min(snappedLeft, maxLeft));
    snappedTop = Math.max(0, Math.min(snappedTop, maxTop));

    activeCube.style.left = `${snappedLeft}px`;
    activeCube.style.top = `${snappedTop}px`;

    activeCube = null;
    isDragging = false;

    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);

    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", stopDrag);
}

/* ---- EVENT BINDING ---- */
cubes.forEach(cube => {
    cube.addEventListener("mousedown", startDrag);
    cube.addEventListener("touchstart", startDrag);
});

