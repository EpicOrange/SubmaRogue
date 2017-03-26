
class Enemy extends Entity {
  constructor(x, y, options) {
    super(x, y, options);
    this.damage = options.damage;
    this.pathfinder = options.pathfinder;
  }
  act() {
    var playerX = Game.player.x;
    var playerY = Game.player.y;
    var isPassable = Game.map.isPassable.bind(Game.map);
    var path = [];
    var pathfinder = new this.pathfinder(playerX, playerY, isPassable, {topology: 8});

    pathfinder.compute(this.x, this.y, (x, y) => {path.push([x, y]);});
    if (path.length <= 2) { // path contains only the fish and the player's position
      // attack player
      Game.player.damage(this.damage);
    } else {
      this.moveTo(...path[1]);
    }
  }
}

