const enemy_fish = {
  char: 'α',
  color: 'orange',
  hp: 10,
  atk: 1,
  def: 1,
  speed: 200,
  pathfinder: ROT.Path.AStar,
  name: 'fish'
};

const passableTiles = '.%<>';

class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.map = {};
    this.entities = {}; //two entities cannot have the same position
    this.items = {}; //items can have the same position, so they can stack on top of each other
    this.freeCells = [];
    this.items = {};
    this.upStairsKey = null;
    this.downStairsKey = null;
    this.generateTiles();
  }
  pullFreeCellKey() {
    var index = Math.floor(ROT.RNG.getUniform() * this.freeCells.length);
    return this.freeCells.splice(index, 1)[0];
  }
  generateTiles() {
    // '.' tiles
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

    // stairs
    this.upStairsKey = this.pullFreeCellKey();
    this.downStairsKey = this.pullFreeCellKey();
    this.map[this.upStairsKey] = '<';
    this.map[this.downStairsKey] = '>';
  }
  generateEntities() {
    for (let i = 0; i < 3; i++) {
      this.createEntityAtFreeCell(Enemy, enemies.squid);
    }
  }
  placePlayerEntity(player, key) {
    this.entities[key] = player;
    var [x, y] = this.  getPos(key);
    player.x = x;
    player.y = y;
    Game.addActor(player);
  }
  removePlayerEntity(player) {
    const key = this.getKey(player.x, player.y);
    delete this.entities[key];
    Game.removeActor(player);
  }
  addEnemiesToScheduler() {
    for (let key in this.entities) {
      if (this.entities[key] != Game.player) {
        Game.addActor(this.entities[key]);
      }
    }
  }
  removeEnemiesFromScheduler() {
    for (let key in this.entities) {
      if (this.entities[key] != Game.player) {
        Game.removeActor(this.entities[key]);
      }
    }
  }
  getKey(x, y) { // convert x, y to key
    return (x + ',' + y);
  }
  getPos(key) { // convert key to x, y
    return key.split(',').map((x) => (parseInt(x)));
  }
  at(x, y) { // get map char at x, y
    return this.map[this.getKey(x, y)];
  }
  isPassable(x, y) {
    return passableTiles.includes(this.at(x, y));
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
      let [x, y] = this.getPos(key);
      this.drawTile(x, y);
    }
  }
  createEntityAtFreeCell(what, options){
    var key = this.pullFreeCellKey();
    var [x, y] = this.getPos(key);
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
    delete this.entities[oldKey];
    this.drawTile(oldX, oldY); // draw map tile
    this.drawObject(entity);
  }
  addItem(options){
    var key = this.pullFreeCellKey();
    var [x, y] = this.getPos(key);
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
  killEntity(entity) {
    const key = this.getKey(entity.x, entity.y);
    Game.removeActor(entity);
    delete this.entities[key];
    if (this.map[key] == '.') {
      this.map[key] = '%';
    }
    this.drawTile(entity.x, entity.y);
  }
}
