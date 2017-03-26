
class Enemy extends Entity {
  constructor(x, y, options) {
    super(x, y, options);
    this.pathfinder = options.pathfinder;
  }
  die() {
    console.log("kill me");
    Game.map.killEntity(this);
  }
  act() {
    var playerX = Game.player.x;
    var playerY = Game.player.y;
    var isPassable = Game.map.isPassable.bind(Game.map);
    var path = [];
    var pathfinder = new this.pathfinder(playerX, playerY, isPassable, {topology: 8});

    pathfinder.compute(this.x, this.y, (x, y) => {path.push([x, y]);});
    if (path.length == 0) { // no path
      // do nothing i guess
    } else if (path.length <= 2) { // path contains only the fish and the player's position
      Game.player.damage(this.atk);
    } else {
      this.moveTo(...path[1]);
    }
  }
}

