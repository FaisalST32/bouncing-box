const context = document.getElementById('canvas').getContext('2d');
const containerSize = { h: window.innerHeight - 5 - (window.innerHeight % 5), w: window.innerWidth - 5 - (window.innerWidth % 5) }
context.canvas.width = containerSize.w;
context.canvas.height = containerSize.h;
const rectSide = Math.min(Math.ceil(containerSize.w / 50) * 10, 150)
let currentPosition = { x: 20, y: 20 };
let prevPosition = { x: 20, y: 20 }; 
const speed = 5;

let xDir = speed;
let yDir = speed;
let color = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)})`;
let jackpot = false;

function drawRectangle(position) {
    const { x, y } = position;
    context.fillStyle = color
    context.fillRect(x, y, rectSide, rectSide);
}

function clearRectangle(position) {
    const { x, y } = position;
    context.clearRect(0, 0, containerSize.w, containerSize.h);
}

drawRectangle(currentPosition);

function startJackpot() {
    if (jackpot) return;
    jackpot = true;
    setInterval(() => {
        color = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)})`;

    }, [400])
}

function render() {
    let xDirChanged = false;
    let yDirChanged = false;
    if (currentPosition.x === 0) {
        xDir = speed;
        xDirChanged = true;
    } else if (currentPosition.x + rectSide === containerSize.w) {
        xDir = -speed;
        xDirChanged = true;
    }
    if (currentPosition.y === 0) {
        yDir = speed;
        yDirChanged = true;
    } else if (currentPosition.y + rectSide === containerSize.h) {
        yDir = -speed;
        yDirChanged = true;
    }

     if (xDirChanged && yDirChanged) {
        startJackpot()
    } else if (!(jackpot) && (xDirChanged || yDirChanged)) {
        color = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)})`;
    } 

    clearRectangle(prevPosition);
    prevPosition = { ...currentPosition };
    currentPosition = { x: currentPosition.x + xDir, y: currentPosition.y + yDir }
    drawRectangle(currentPosition)
    requestAnimationFrame(render)

}

render()
