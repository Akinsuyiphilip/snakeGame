const Playboard = document.querySelector(".play-board");

let gameOver = false;
let foodX, foodY;
let SnakeX = 5,
  SnakeY = 10;
let snakeBody = [];
let velocityX = 0,
  velocityY = 0;
let setIntervallid;

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
  if (e.key === "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key === "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  }
  initGame();
};
const initGame = () => {
  if (gameOver) return handleGameover();
  let htmlMarkup = ` <div class="food" style= "grid-area:${foodY} / ${foodX} "></div>`;

  if ((SnakeX === foodX) & (SnakeY === foodY)) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    // shifting forward the values of the elements in the snake body by one
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [SnakeX, SnakeY]; // setting first element  of the snake body to current snake position
  //updating snakehead position based on current velocity
  SnakeX += velocityX;
  SnakeY += velocityY;
  if (SnakeX <= 0 || SnakeX > 30 || SnakeY <= 0 || SnakeY > 30) {
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    // addign a div for each part of the snake's body
    htmlMarkup += ` <div class="head" style= "grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
  }
  Playboard.innerHTML = htmlMarkup;
};

changeFoodPosition();
setIntervallid = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
