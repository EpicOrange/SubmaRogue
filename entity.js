
class Entity {
  constructor(x, y, options) {
    this.x = x;
    this.y = y;
    this.char = options.char;
    this.color = options.color;
    this.hp = options.hp;
    this.speed = options.speed;
    this.draw();
  }
  damage(dmg) {
    this.hp -= dmg;
    // todo check dead
  }
  draw() {
    Game.map.drawEntity(this);
  }
  moveTo(x, y) {
    if (Game.map.getEntity(x, y)) {
      return;
    }
    Game.map.moveEntity(this.x, this.y, x, y);
  }
  getSpeed() {
    return this.speed;
  }
}

