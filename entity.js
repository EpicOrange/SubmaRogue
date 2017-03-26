
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
    dmg = Math.min(0, -dmg + this.def);
    this.hp += dmg;
    console.log(this.char + " lost " + dmg);
    if (this.hp <= 0) {
      this.die();
    }
  }
  draw() {
    Game.map.drawObject(this);
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
