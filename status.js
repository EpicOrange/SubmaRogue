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
    if (Game.player.hp >= 999) {
      return 'orange';
    } else if (Game.player.hp >= 50) {
      return 'green';
    } else if (Game.player.hp >= 25) {
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
    this.display.drawText(name.length + 10, 0,"OXYGEN: "+Game.player.oxygen);
    this.display.drawText(name.length + 24, 0,"Level: "+Game.level);
    const stats = `Weapon: ${Game.player.items.weapon.name} (${Game.player.atk} ATK) | Charm: ${Game.player.items.armor.name} (${Game.player.def} DEF)`;
    this.display.drawText(0, 1, stats);
  }
  clear() {
    this.messages = [];
  }
}
