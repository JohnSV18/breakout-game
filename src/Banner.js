import Sprite from './Sprite.js';

class Banner extends Sprite {
  constructor(text, x, y, value = '', color = 'black', font = '16px Arial') {
    super(x, y, 0, 0, color);
    this.font = font;
    this.text = text;
    this.value = value;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
  }
}

export default Banner;
