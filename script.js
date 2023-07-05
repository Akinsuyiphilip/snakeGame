const Playboard = document.querySelector(".play-board");
const ScoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let SnakeX = 5,
  SnakeY = 10;
let snakeBody = [];
let velocityX = 0,
  velocityY = 0;
let setIntervallid;
let score = 0;

//  getting high score  from local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

const changeFoodPosition = () => {
  //passing a random 1 - 30 value as fod position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};
const handleGameover = () => {
  clearInterval(setIntervallid);
  alert(" Game Over. Press Ok to replay..........");
  location.reload();
};
const changeDirection = (e) => {
  // changing velocity value based on key press
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
  initGame();
};

controls.forEach((key) => {
  // calling chnageDirection on each key click and passing dataset value as an object
  key.addEventListener("click", () => changeDirection({key: key.dataset.key}));
});
const initGame = () => {
  if (gameOver) return handleGameover();
  let htmlMarkup = ` <div class="food" style= "grid-area:${foodY} / ${foodX} "></div>`;

  if ((SnakeX === foodX) & (SnakeY === foodY)) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]); //pushing food position to snake body array.
    score++; // score increment by 1

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    ScoreElement.innerHTML = `Score: ${score}`;
    highScoreElement.innerHTML = `High Score: ${highScore}`;
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    // shifting forward the values of the elements in the snake body by one
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [SnakeX, SnakeY]; // setting first element  of the snake body to current snake position
  //updating snakehead position based on current velocity
  SnakeX += velocityX;
  SnakeY += velocityY;
  // checking if the snake head is out of the wall, if so the game is over
  if (SnakeX <= 0 || SnakeX > 30 || SnakeY <= 0 || SnakeY > 30) {
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    // addign a div for each part of the snake's body
    htmlMarkup += ` <div class="head" style= "grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;

    // checking if the snake head it the body, if so set gameover to true.
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }
  Playboard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervallid = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
