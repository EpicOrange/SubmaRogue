// 1 = wall
// 0 = passable

class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.map = {};
    this.freeCells = [];
    this.generate();
    this.items = {};
  }
  generate() {
    var cellMap = new ROT.Map.Cellular(this.width,this.height,{
      connected:true
    });

    cellMap.randomize(0.5);
    var mapCallback = function(x,y,value){
      if(!value)return;
      var key = x+','+y;
      this.map[key]='.';
      this.freeCells.push(key);
    }
    for(var i=0; i<10;i++)cellMap.create();
    cellMap.connect(mapCallback.bind(this),1);
  }
  getKey(x, y) { // convert x, y to key
    return (x + "," + y);
  }
  at(x, y) { // get map char at x, y
    return this.map[this.getKey(x, y)];
  }
  isPassable(x, y) {
    return this.at(x, y) == '.';
  }
  drawTile(x, y) {
    if(this.getItem(x,y)){
      this.getItem(x,y).draw();
      return;
    }
    Game.display.draw(x, y, this.at(x, y));
  }
  drawEntity(entity){
    Game.display.draw(entity.x,entity.y,entity.char,entity.color);
  }
  drawAll() {
    for (var key in this.map) {
      var [x, y] = key.split(",").map((x) => (parseInt(x)));
      this.drawTile(x, y);
    }
    // todo entities
  }
  addEntity(what, options){
    var index = Math.floor(ROT.RNG.getUniform() * this.freeCells.length);
    var key = this.freeCells.splice(index, 1)[0];
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    return new what(x, y, options);
  }
  addItem(options){
    var index = Math.floor(ROT.RNG.getUniform() * this.freeCells.length);
    var key = this.freeCells.splice(index, 1)[0];
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    this.items[key]=new Item(x,y,options);
    this.drawTile(x,y);
  }
  dropItem(item,x,y){
    var key = this.getKey(x,y);
    item.x=x;
    item.y=y;
    this.items[key]=item;
    this.drawTile(x,y);
  }
  getItem(x,y){
    var key = this.getKey(x,y);
    return this.items[key];
  }
  removeItem(x,y){
    var key = this.getKey(x,y);
    delete this.items[key];
  }
}
