
class Entity {
  constructor(x, y, options) {
    this.x = x;
    this.y = y;
    this.char = options.char;
    this.color = options.color;
    this.hp = options.hp;
    this.speed = options.speed;
    this.atk = options.atk;
    this.def = options.def;
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
    Game.map.drawTile(this.x, this.y); // draw map tile
    this.x = x;
    this.y = y;
    this.draw();
  }
  getSpeed() {
    return this.speed;
  }
}
