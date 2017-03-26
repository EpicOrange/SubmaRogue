
class Enemy {
  constructor(x, y, options) {
    this.x = x;
    this.y = y;
    this.char = options.char;
    this.color = options.color;
    this.hp = options.maxHp;
    this.damage = options.damage;
    this.speed = options.speed;
    this.pathfinder = options.pathfinder;
    this.draw();
  }
  moveTo(x, y) {
    Game.map.drawTile(this.x, this.y); // draw map tile
    this.x = x;
    this.y = y;
    this.draw();
  }
  act() {
    var playerX = Game.player.x;
    var playerY = Game.player.y;
    var isPassable = Game.map.isPassable.bind(Game.map);
    var path = [];
    var pathfinder = new this.pathfinder(playerX, playerY, isPassable, {topology: 8});
    pathfinder.compute(this.x, this.y, (x, y) => {path.push([x, y]);});
    if (path.length <= 1) {
      // attack player
      // Game.player.damage(this.damage);
    } else {
      this.moveTo(...path[1]);
    }
  }
  getSpeed() {
    return this.speed;
  }
  draw() {
    Game.map.drawEntity(this);
  }
}

