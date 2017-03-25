


class Enemy {
  constructor(x, y, char, color, hp, damage, pathfinder) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.color = color;
    this.hp = hp;
    this.damage = damage;
    this.pathfinder = pathfinder; // return next pos
    this.draw();
  }
  act() {
    var playerX = Game.player.getX();
    var playerY = Game.player.getY();
    var isPassable = (x, y) => (x+","+y in Game.map);
    var astar = new ROT.Path.AStar(x, y, isPassable, {topology:8});
    var path = [];
    astar.compute(this.x, this.y, (x, y) => {path.push([x, y]);});
    if (path.length <= 1) {
      // attack player
      Game.player.damage(this.damage);
    } else {
      x = path[1][0];
      y = path[1][1];
      Game.map.drawTile(this.x, this.y);

      Game.display.draw(this.x, this.y, Game.map[this.x+","+this.y]); // draw map tile
      this.x = x;
      this.y = y;
      this.draw();
    }
  }
  draw() {
    Game.display.draw(this.x, this.y, "P", "red");
  }
}
    
