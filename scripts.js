const grid = document.getElementById("grid");
const pixels = document.querySelectorAll('.pixel');
let gridSize = 16;
let color = 'rgba(1, 1, 1)';

function makeGrid(gridSize) {

    let pixelSize = Math.floor(grid.offsetWidth / gridSize);
    let pixel;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {

            pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.setAttribute('style', `width: ${pixelSize}px; height: ${pixelSize}px`);
            pixel.addEventListener('mouseover', (e) => {
                if (color == 'rgb') {
                    e.target.style.backgroundColor = getRandomColor();
                } else if (color == 'greyscale') {

                    let bg = e.target.style.backgroundColor;

                    if (!bg.includes(`rgba(0, 0, 0,`)) {
                        e.target.style.backgroundColor = `rgba(0, 0, 0, 0.1)`;
                    } else {
                        e.target.style.backgroundColor = `rgba(0, 0, 0, ${parseFloat(bg.match(/[.?\d]+/g)[3]) + 0.1})`;
                    }

                } else {
                    e.target.style.backgroundColor = color;
                }
            })
            grid.appendChild(pixel);

        }
    }

}

function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
    // Sets size of grid 
    do {
        gridSize = prompt('Pick size from 16 to 100: ', '16');
    } while (16 > gridSize || gridSize > 100)

    // Resets grid
    while (grid.firstChild) {
        grid.firstChild.remove();
    }

    makeGrid(gridSize);
})

const rgbBtn = document.getElementById('rgb-btn');
rgbBtn.addEventListener('click', () => color = 'rgb');

const blackBtn = document.getElementById('black-btn');
blackBtn.addEventListener('click', () => color = 'rgba(1, 1, 1)');

const eraserBtn = document.getElementById('eraser-btn');
eraserBtn.addEventListener('click', () => color = '');

const greyscaleBtn = document.getElementById('greyscale-btn');
greyscaleBtn.addEventListener('click', () => color = 'greyscale');

makeGrid(gridSize);