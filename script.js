let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let left = document.querySelector(".left");
let bottom = document.querySelector(".bottom");
let right = document.querySelector(".right");
let up = document.querySelector(".top");
let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;
function clearBoard(){

}
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", control);
    gameBoard();
    startGame();
  });
function startGame() {
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares)
    direction = 1;
    scoreDisplay.innerHTML = "Score : " + score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime)
  }
function gameBoard() {
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div")
        grid.appendChild(div)
    }
}

function randomApple(squares) {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
  }
  function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple(squares);
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      interval = setInterval(moveOutcome, intervalTime);
    }
  }
function moveSnake(squares) {
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add("snake")
    eatApple(squares, tail);
}
function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        alert("you hit something");
        return clearInterval(interval);
    }
    else{
        moveSnake(squares)
    }
}
function checkForHits(squares) {
    if (
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      (currentSnake[0] % width === 0 && direction === -1) ||
      (currentSnake[0] - width <= 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
      return true;
    } else {
      return false;
    }
  }
  function control(e) {
    if (e.keyCode === 39) {
      direction = 1;
    } else if (e.keyCode === 38) {
      direction = -width;
    } else if (e.keyCode === 37) {
      direction = -1;
    } else if (e.keyCode === 40) {
      direction = +width;
    }
  }
 timer = document.getElementById("timer")
 const start = new Date()
 start.setSeconds(start.getSeconds() + 15)
 function updateTimer(){
    const currentTime = new Date()
    const timeDiff = new Date(start - currentTime)
    const minutes = timeDiff.getMinutes();
    const seconds = timeDiff.getSeconds()
    intervalTime = 1000;
    timer.innerText = `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`
    if (timeDiff<=0) {
        clearInterval(interval)
        ask()
    }
 }
 updateTimer()
 interval = setInterval(updateTimer, intervalTime)

function ask(){
    let nextLevel = confirm("Do u want to go on the next level?")
    if (nextLevel) {
        start.setSeconds(start.getSeconds() + 10)
        startGame()
        gameBoard()
    } else {
        alert("Okay, mayve next time")
    }
}
