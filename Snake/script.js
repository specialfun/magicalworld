const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const size = canvas.width / 30;
const scoreboard = document.querySelector("h3");
const gameovermenu = document.querySelector(".game-over");
const youwinmenu = document.querySelector(".you-win");
const loserbutton = document.getElementById("loser-restart");
const winnerbutton = document.getElementById("winner-prize");

alert('Score at least points equal to your age to win!');
const snake = {
  head: { x: 10, y: 10 },
  body: [],
  length: 3,
};

let apple = { x: 5, y: 5 };
let moving = 'right';
let lastDirection = 'right';
let gameover = false;
let endgame = false;
let eaten = true;
let score = 0;
const maxscore = 417;

function getRandomPosition(exclude) {
  let x, y;
  do {
    x = Math.floor(Math.random() * 19) + 1;
    y = Math.floor(Math.random() * 19) + 1;
  } while (exclude.some(({ x: posX, y: posY }) => posX === x && posY === y));
  return { x, y };
}

function drawApple() {
  ctx.shadowColor = "red";
  ctx.shadowBlur = 20;
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(apple.x * 30 + size / 2, apple.y * 30 + size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 600, 600);
}

function drawSnake() {
  clearScreen();
  ctx.shadowColor = "lime";
  ctx.shadowBlur = 20;
  ctx.fillStyle = "lime";

  snake.body.forEach(({ x: posX, y: posY }) => {
    ctx.fillRect(posX * 30, posY * 30, size, size);
  });

  drawApple();

  ctx.shadowColor = "yellow";
  ctx.shadowBlur = 20;
  ctx.fillStyle = "yellow";
  ctx.fillRect(snake.head.x * 30, snake.head.y * 30, size, size);
}

function buttonClick(direction) {
  if (
    (direction === 'up' && lastDirection === 'down') ||
    (direction === 'down' && lastDirection === 'up') ||
    (direction === 'left' && lastDirection === 'right') ||
    (direction === 'right' && lastDirection === 'left')
  ) {
    return;
  }
  moving = direction;
  lastDirection = direction;
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowUp') {
    buttonClick('up');
  } else if (event.code === 'ArrowDown') {
    buttonClick('down');
  } else if (event.code === 'ArrowLeft') {
    buttonClick('left');
  } else if (event.code === 'ArrowRight') {
    buttonClick('right');
  }
});

canvas.addEventListener('touchstart', touchStart, false);
canvas.addEventListener('touchmove', touchMove, false);

let xDown = null;
let yDown = null;

function touchStart(event) {
  const firstTouch = event.touches[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function touchMove(event) {
  if (!xDown || !yDown) {
    return;
  }

  const xUp = event.touches[0].clientX;
  const yUp = event.touches[0].clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      buttonClick('left');
    } else {
      buttonClick('right');
    }
  } else {
    if (yDiff > 0) {
      buttonClick('up');
    } else {
      buttonClick('down');
    }
  }

  xDown = null;
  yDown = null;
}

function checkCollision() {
  if (
    snake.head.x < 0 || snake.head.x >= 20 ||
    snake.head.y < 0 || snake.head.y >= 20 ||
    snake.body.some(({ x: posX, y: posY }) => posX === snake.head.x && posY === snake.head.y)
  ) {
    gameover = true;
    document.getElementById("game-over-text").textContent = "Game Over";
    document.getElementById("score-text-lose").textContent = `Your Score Is: ${score}/${maxscore}`;
    gameovermenu.style.display = "flex";
    const crashSound = document.getElementById("crashSound");
    crashSound.play();
  }
}

function checkWin() {
  if (score === 23) {
    endgame = true;
    document.getElementById("you-win-text").textContent = "YOU WON THE GAME!";
    document.getElementById("score-text-win").textContent = `Your Score Is: babadook`;
    youwinmenu.style.display = "flex";
    const winSound = document.getElementById("winSound");
    winSound.play();
  }
}

function updateGame() {
  if (endgame) return;

  snake.body.unshift({ x: snake.head.x, y: snake.head.y });

  if (moving === 'up') snake.head.y -= 1;
  if (moving === 'down') snake.head.y += 1;
  if (moving === 'left') snake.head.x -= 1;
  if (moving === 'right') snake.head.x += 1;

  if (snake.head.x >= 20) snake.head.x = 0;
  if (snake.head.x < 0) snake.head.x = 19;
  if (snake.head.y >= 20) snake.head.y = 0;
  if (snake.head.y < 0) snake.head.y = 19;

  if (eaten) {
    apple = getRandomPosition([snake.head, ...snake.body]);
    eaten = false;
  } else {
    if (snake.head.x === apple.x && snake.head.y === apple.y) {
      score++;
      snake.length++;
      eaten = true;
      const eatSound = document.getElementById("eatSound");
      eatSound.play();
    }
  }

  if (snake.body.length >= snake.length) {
    snake.body.pop();
  }

  checkCollision();
  checkWin();
  drawSnake();
}

loserbutton.addEventListener('click', () => {
  gameover = false;
  endgame = false;
  score = 0;
  snake.length = 3;
  moving = 'right';
  eaten = true;
  snake.body = [];
  gameovermenu.style.display = "none";
  youwinmenu.style.display = "none";
});

winnerbutton.addEventListener('click', () => {
  // const videoURL = 'https://vdse.bdstatic.com//192d9a98d782d9c74c96f09db9378d93.mp4';
  // window.open(videoURL, '_blank');
  window.location.href = '../final.html?name=COUNT3V3RYBLESSING';
});

setInterval(updateGame, 125);
