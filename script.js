class Snake {
  constructor() {
    this.currentSnake = [2, 1, 0];
  }
}

let grid = document.querySelector(".grid");
let scoreDisplay = document.querySelector(".scoreDisplay");
let width = 10;
let currentIndex = 0;
let interval = 0
document.addEventListener("DOMContentLoaded", function () {
  let snakeGame = new CurrentGame();
  document.addEventListener("keyup", snakeGame.control.bind(snakeGame));
  snakeGame.gameBoard();
  snakeGame.startGame();
});

let timer = document.getElementById("timer")
let start = new Date
start.setSeconds(start.getSeconds() + 60)

class CurrentGame {
  constructor() {
    this.score = 0;
    this.direction = 1;
    this.intervalTime = 0;
    this.interval = 0;
    this.appleIndex = 0;
  }

  updateTimer(){
    const currentTime = new Date()
    const timeDiff = new Date(start - currentTime)
    const minutes = timeDiff.getMinutes();
    const seconds = timeDiff.getSeconds()
    this.intervalTime = 1000;
    timer.innerText = `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`
    if (timeDiff<=0) {
        clearInterval(this.interval)
        this.retry()
    }
  }
  startGame() {
    let squares = document.querySelectorAll(".grid div");
    this.randomApple(squares);
    this.direction = 1;
    scoreDisplay.innerHTML = "Score : " + this.score;
    this.intervalTime = 1000;
    this.currentSnake = [2, 1, 0];
    currentIndex = 0;
    this.currentSnake.forEach((index) => squares[index].classList.add("snake"));
    this.interval = setInterval(() => this.moveOutcome(squares), this.intervalTime)
    this.interval = setInterval(() => this.updateTimer(), this.intervalTime)
    this.score = 0;
    alert("You need to get 3 score");
  }

  gameBoard() {
    for (let i = 0; i < 100; i++) {
      let div = document.createElement("div");
      grid.appendChild(div);
    }
  }

  randomApple(squares) {
    do {
      this.appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[this.appleIndex].classList.contains("snake"));
    squares[this.appleIndex].classList.add("apple");
  }

  eatApple(squares, tail) {
    if (squares[this.currentSnake[0]].classList.contains("apple")) {
      squares[this.currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      this.currentSnake.push(tail);
      this.randomApple(squares);
      this.score++;
      scoreDisplay.textContent = this.score;
      clearInterval(this.interval);
      this.interval = setInterval(this.moveOutcome.bind(this, squares), this.intervalTime);
    }
  }

  moveSnake(squares) {
    let tail = this.currentSnake.pop();
    squares[tail].classList.remove("snake");
    this.currentSnake.unshift(this.currentSnake[0] + this.direction);
    squares[this.currentSnake[0]].classList.add("snake");
    this.eatApple(squares, tail);
  }

  moveOutcome(squares) {
    if (this.checkForHits(squares)) {
      alert("You hit something");
      return clearInterval(this.interval);
    } else if (this.score === 3) {
      this.nextLevel();
    } else {
      this.moveSnake(squares);
    }
  }

  checkForHits(squares) {
    if (
      (this.currentSnake[0] + width >= width * width && this.direction === width) ||
      (this.currentSnake[0] % width === width - 1 && this.direction === 1) ||
      (this.currentSnake[0] % width === 0 && this.direction === -1) ||
      (this.currentSnake[0] - width <= 0 && this.direction === -width) ||
      squares[this.currentSnake[0] + this.direction].classList.contains("snake")
    ) {
      return true;
    } else {
      return false;
    }
  }

  control(e) {
    if (e.keyCode === 39) {
      this.direction = 1;
    } else if (e.keyCode === 38) {
      this.direction = -width;
    } else if (e.keyCode === 37) {
      this.direction = -1;
    } else if (e.keyCode === 40) {
      this.direction = +width;
    }
  }


  retry() {
    let retry = confirm("You need to get 3 score. Try again");
    if (retry) {
      this.startGame();
      this.gameBoard();
    }
  }

  clearBoard() {
    let squares = document.querySelectorAll(".grid div");

    this.currentSnake.forEach(i => {
      squares[i].classList.remove("snake");
    });
    squares[this.appleIndex].classList.remove("apple");
    this.appleIndex = -1;
    clearInterval(this.interval);
  }

  nextLevel() {
    let nextLevel = confirm("You won, wanna go to the next level?");
    if (nextLevel) {
      this.clearBoard();
      this.startGame();
    } else {
      alert("Okay maybe next time");
    }
  }
}