// 1 = wall
// 0 = passable

class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.map = {};
    this.freeCells = [];
    this.generate();
  }
  generate() {
    var cellMap = new ROT.Map.Cellular(this.width,this.height,{
      born:[5,6,7,8],
      survive:[3,4,5,6,7]
    });

    cellMap.randomize(0.9);
    var mapCallback = function(x,y,value){
      if(value)return;
      var key = x+','+y;
      this.map[key]='.';
      this.freeCells.push(key);
    }
    cellMap.create(mapCallback.bind(this));
  }
  getKey(x, y) { // convert x, y to key
    return (x + "," + y);
  }
  at(x, y) { // get map square at x, y
    return this.map[this.getKey(x, y)];
  }
  isPassable(x, y) {
    return this.at(x, y) == '.';
  }
  drawTile(x, y, char, color) {
      Game.display.draw(x, y, char, color);
  }
  drawEntity(entity){
    Game.display.draw(entity.x,entity.y,entity.char,entity.color);
  }
  drawAll() {
    for (var key in this.map) {
      var parts = key.split(",");
      var x = parseInt(parts[0]);
      var y = parseInt(parts[1]);
      this.drawTile(x, y, this.map[key]);
    }
  }
  addEntity(what){
    var index = Math.floor(ROT.RNG.getUniform() * this.freeCells.length);
    var key = this.freeCells.splice(index, 1)[0];
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    return new what(x, y);
  }
}
