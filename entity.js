
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
    this.name = options.name;
  }
  isDead() {
    return (this.hp <= 0);
  }
  damage(dmg) {
    dmg = Math.min(0, -dmg + this.def);
    this.hp += dmg;
    console.log(this.char + " lost " + dmg);
    const isEnemy = ("pathfinder" in this);
    if (this.isDead()) {
      this.die();
      if (isEnemy) {
        Game.log.add(`You kill ${this.name}.`);
        if (Game.level == 0 && Object.keys(Game.map.entities).length == 1) { // only player is left in the ending
          Game.winGame();
        }
      }
    } else {
      if (isEnemy) {
        Game.log.add(`You dealt ${-dmg} damage to ${this.name}.`);
      }
    }
    return dmg;
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
