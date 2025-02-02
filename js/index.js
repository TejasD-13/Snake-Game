// Game constants & variables 
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('../food.mp3');
const gameOverSound = new Audio('../gameover.mp3');
const moveSound = new Audio('../move.mp3');
const musicSound = new Audio('../music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];
let food = {x: 6, y: 7}; // Corrected declaration

// Game functions 
function main(currTime) {
    window.requestAnimationFrame(main);
    if ((currTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currTime;
    gameEngine();
}

function isCollide(snake) {
    // if you bump into yourself
    for (let idx = 1; idx < snakeArr.length; idx++) {
        if (snake[idx].x === snake[0].x && snake[idx].y === snake[0].y) {
            return true;
        }
    }

    // if you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array & food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        // musicSound.play();
        score = 0;
        document.getElementById('score').innerHTML = "Score: " + score;
    }

    // If you have eaten food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        document.getElementById('score').innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 1; // Corrected range to keep food within bounds
        let b = 17; // Corrected range to keep food within bounds
        food = {
            x: Math.floor(a + (b - a) * Math.random()), 
            y: Math.floor(a + (b - a) * Math.random())
        };
    }

    // Moving the snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, idx) => {
        let snakeEle = document.createElement('div');
        snakeEle.style.gridRowStart = e.y;
        snakeEle.style.gridColumnStart = e.x;

        if (idx === 0) {
            snakeEle.classList.add('head');
        } else {
            snakeEle.classList.add('snake');
        }

        board.appendChild(snakeEle);
    });

    // Display the food
    let foodEle = document.createElement('div');
    foodEle.style.gridRowStart = food.y;
    foodEle.style.gridColumnStart = food.x;
    foodEle.classList.add('food');
    board.appendChild(foodEle);
}

// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1}; // start the game 
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});
