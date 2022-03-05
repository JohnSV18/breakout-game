import GameBackground from './GameBackground.js';
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Banner from './Banner.js';
import Brick from './Brick.js';

//  Javascript code here
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const x = canvas.width / 2;
const y = canvas.height - 30;
let dx = 2;
let dy = -2;
let score = 0;
let lives = 3;
// PADDLE VARIABLES
const paddleX = (canvas.width - 75) / 2;

// KEYBOARD VARIABLES
let rightPressed = false;
let leftPressed = false;

const background = new GameBackground(0, 0, canvas.width, canvas.height, 'teal');
const ball = new Ball(x, y);
const paddle = new Paddle(paddleX, canvas.height - 10);
const livesBanner = new Banner('Lives: ', canvas.width - 65, 20, lives);
const gameBanner = new Banner('Break Out!', 200, 20);
const scoreBanner = new Banner('Score: ', 8, 20, score);
const someBrick = new Brick()


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.render(ctx);
  someBrick.setBricks();
  someBrick.brickCollisionDetection(ball, scoreBanner)
  someBrick.render(ctx);
  ball.render(ctx);
  ball.move();
  paddle.render(ctx);
  scoreBanner.render(ctx);
  livesBanner.render(ctx);
  gameBanner.render(ctx);


  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      livesBanner.value -= 1;
      if (!livesBanner.value) {
        window.confirm('GAME OVER')
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  if (ball.x + ball.dx < ball.radius || ball.x + ball.dx > canvas.width - ball.radius) {
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ball.dx = -ball.dx;
  }

  if (rightPressed) {
    paddle.x += 13;
    if (paddle.x + paddle.width > canvas.width) {
      paddle.x = canvas.width - paddle.width;
    }
  } else if (leftPressed) {
    paddle.x -= 13;
    if (paddle.x < 0) {
      paddle.x = 0;
    }
  }

  requestAnimationFrame(draw);
}


function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

draw();
