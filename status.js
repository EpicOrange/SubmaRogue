class Status {
  constructor(width) {
    this.statusHeight = 2;
    this.width = width;
    this.display = new ROT.Display({
      width: this.width,
      height: this.statusHeight,
      forceSquareRatio: true,
    });
    this.messages = [];
  }
  getHpBar() {
    if (Game.player.hp > 0) {
      return Game.player.hp;
    } else {
      return 'DEAD';
    }
  }
  getHpColor() {
    if (Game.player.hp >= 25) {
      return 'green';
    } else if (Game.player.hp >= 15) {
      return 'yellow';
    } else if (Game.player.hp >= 1) {
      return 'red';
    } else {
      return 'gray';
    }
  }
  update() {
    this.display.clear();
    const name = 'Player @';
    const color = this.getHpColor();
    const hp = `HP: %c{${color}}${this.getHpBar()}%c{}`;
    this.display.drawText(0, 0, name);
    this.display.drawText(name.length + 1, 0, hp);
    this.display.drawText(name.length + 10, 0,"Oxygen: "+Game.player.oxygen);
  }
  clear() {
    this.messages = [];
  }
}
