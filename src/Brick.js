import Sprite from './Sprite.js';
class Brick extends Sprite {
  constructor(x, y, width = 75, height = 20, color = 'orange') {
    super(x, y, width, height, color);
    this.status = 1;
    this.bricks = [];
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
  }
  setBricks() {
    for (let c = 0; c < this.brickColumnCount; c += 1){
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
        this.bricks[c][r] = new Brick();
        const brickX = (c * (this.width + this.brickPadding)) + this.brickOffsetLeft;
        const brickY = (r * (this.height + this.brickPadding)) + this.brickOffsetTop;
        this.bricks[c][r].x = brickX;
        this.bricks[c][r].y = brickY;
      }
    }
  }
  brickCollisionDetection(ball, score) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          if (ball.x > brick.x && ball.x < brick.x + brick.width && ball.y > brick.y && ball.y < brick.y + brick.height) {
            ball.dy = -ball.dy;
            brick.status = 0;
            score.value += 1;
            if (score.value === this.brickRowCount * this.brickColumnCount) {
              window.confirm('YOU WIN, CONGRATULATIONS!')
              document.location.reload();
            }
          }
        }
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brick.width, brick.height);
          if (((r % 2 === 0) && (c % 2 === 0)) || ((r % 2 === 1 && c % 2 === 1))) {
            ctx.fillStyle = '#000000';
          } else {
            ctx.fillStyle = 'orange';
          }
          ctx.fill();
          ctx.closePath();
        }
      }
    }
   
  }
}

export default Brick;
