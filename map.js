
const enemy_fish = {
  char: "α",
  color: "orange",
  hp: 10,
  atk: 1,
  def: 1,
  speed: 200,
  pathfinder: ROT.Path.AStar
};

class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.map = {};
    this.entities = {}; //two entities cannot have the same position
    this.items = {}; //items can have the same position, so they can stack on top of each other
    this.freeCells = [];
    this.items = {};
  }
  generateTiles() {
    var cellMap = new ROT.Map.Cellular(this.width,this.height,{
      connected:true
    });

    cellMap.randomize(0.5);
    var mapCallback = function(x,y,value){
      if(!value)return;
      var key = x+','+y;
      this.map[key]='.';
      this.freeCells.push(key);
    };
    for(var i=0; i<10;i++)cellMap.create();
    cellMap.connect(mapCallback.bind(this),1);
  }
  generateEntities(Game) {
    Game.player = this.createEntityAtFreeCell(Player);
    Game.addActor(Game.player);
    // todo we need different generateTiles() and generateEntities() functions for different maps
    // this will be the first level (3x fish)
    for (let i = 0; i < 3; i++) {
      Game.addActor(this.createEntityAtFreeCell(Enemy, enemy_fish));
    }
  }
  getKey(x, y) { // convert x, y to key
    return (x + "," + y);
  }
  at(x, y) { // get map char at x, y
    return this.map[this.getKey(x, y)];
  }
  isPassable(x, y) {
    return (this.at(x, y) == '.');
  }
  drawTile(x, y) {
    const item = this.getItem(x,y);
    const entity = this.getEntity(x,y);
    if (entity) {
      this.drawObject(entity);
    } else if (item) {
      this.drawObject(item);
    } else {
      Game.display.draw(x, y, this.at(x, y));
    }
  }
  drawObject(entity){
    Game.display.draw(entity.x,entity.y,entity.char,entity.color);
  }
  drawAll() {
    for (let key in this.map) {
      let [x, y] = key.split(",").map((x) => (parseInt(x)));
      this.drawTile(x, y);
    }
    for (let key in this.entities) {
      this.drawObject(this.entities[key]);
    }
  }
  createEntityAtFreeCell(what, options){
    var index = Math.floor(ROT.RNG.getUniform() * this.freeCells.length);
    var key = this.freeCells.splice(index, 1)[0];
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    var entity = new what(x, y, options);
    this.entities[key] = entity;
    this.drawObject(entity);
    return entity;
  }
  getEntity(x, y) {
    return this.entities[this.getKey(x, y)];
  }
  moveEntity(oldX, oldY, newX, newY) {
    const oldKey = this.getKey(oldX, oldY);
    const newKey = this.getKey(newX, newY);
    var entity = this.entities[oldKey];
    if (!entity) {
      console.error(`Tried to move nonexistent entity from (${oldX}, ${oldY}) to (${newX}, ${newY})`);
      console.error(`(entities: ${JSON.stringify(this.entities)}`);
      return;
    }
    entity.x = newX;
    entity.y = newY;
    this.entities[newKey] = entity;
    this.entities[oldKey] = null;
    this.drawTile(oldX, oldY); // draw map tile
    this.drawObject(entity);
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
