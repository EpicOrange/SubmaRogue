
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
    var path = pathfinders[this.pathfinder](this);
    if (path.length == 0) { // no path found
      // do nothing i guess
      console.log(`Enemy ${this.name} can't find path`);
      return;
    }
    var nextPos = path[0];
    if ((nextPos[0] == Game.player.x) && (nextPos[1] == Game.player.y)) {
      Game.player.damage(this.atk);
    } else {
      this.moveTo(...nextPos);
    }
  }
}

