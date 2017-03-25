


class Enemy {
  constructor(x, y, options) {
    this.x = x;
    this.y = y;
    this.char = options.char;
    this.color = options.color;
    this.hp = options.maxHp;
    this.damage = options.damage;
    this.pathfinder = options.pathfinder;
    this.draw();
  }
  moveTo(new_x, new_y) {
    Game.map.drawTile(this.x, this.y, this.char, this.color); // draw map tile
    this.x = x;
    this.y = y;
    this.drawTile();
  }
  act() {
    var playerX = Game.player.getX();
    var playerY = Game.player.getY();
    var isPassable = (x, y) => (x+","+y in Game.map);
    var path = [];
    pathfinder.compute(this.x, this.y, (x, y) => {path.push([x, y]);});
    if (path.length <= 1) {
      // attack player
      // Game.player.damage(this.damage);
    } else {
      x = path[1][0];
      y = path[1][1];
      this.moveTo(x, y);
    }
  }
  draw() {
    Game.map.drawEntity(this);
  }
}

var fish = new Enemy(x, y, {
  char: "F",
  color: "orange",
  maxHp: 10,
  damage: 1,
  pathfinder: new ROT.Path.AStar(x, y, isPassable, {topology: 8})
});
