const passableTiles = '.%<>"~';

function chebyshevDistance(pos1, pos2) {
  return Math.max(Math.abs(pos2.y - pos1.y), Math.abs(pos2.x - pos1.x));
}

class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.map = {};
    this.visibleTiles = {};
    this.revealedTiles = {};
    this.entities = {};
    this.items = {};
    this.freeCells = [];
    this.items = {};
    this.upStairsKey = null;
    this.downStairsKey = null;
    this.lightRadius = 900;
  }

  // util functions
  pullFreeCellKey() {
    var index = Math.floor(ROT.RNG.getUniform() * this.freeCells.length);
    return this.freeCells.splice(index, 1)[0];
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
  getEntity(x, y) {
    return this.entities[this.getKey(x, y)];
  }

  // generation functions
  generateUpStairs() {
    this.upStairsKey = this.pullFreeCellKey();
    this.map[this.upStairsKey] = '<';
    // remove free cells from around upStairsKey
    for (let key in this.freeCells) {
      let [x1, y1] = this.getPos(this.upStairsKey);
      let [x2, y2] = this.getPos(key);
      if (chebyshevDistance({x: x1, y: y1}, {x: x2, y: y2}) < 15) {
        delete this.freeCells[key];
      }
    }
  }
  generateDownStairs() {
    this.downStairsKey = this.pullFreeCellKey();
    this.map[this.downStairsKey] = '>';
  }
  generateStairs() {
    this.generateUpStairs();
    this.generateDownStairs();
  }
  placePlayerEntity(player, key) {
    this.entities[key] = player;
    var [x, y] = this.getPos(key);
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

  // draw functions
  drawTile(x, y) {
    const key = this.getKey(x, y);
    if (key in this.revealedTiles) {
      const item = this.getItem(x,y);
      const entity = this.getEntity(x,y);
      if (entity) {
        this.drawObject(entity);
      } else if (item) {
        this.drawObject(item);
      } else {
        Game.display.draw(x, y, this.at(x, y));
      }
    } else {
      Game.display.draw(x, y, "");
    }
  }
  drawObject(entity){
    if ("pathfinder" in entity) { // is enemy
      // only draw if we can see it
      const key = this.getKey(entity.x, entity.y);
      if (!(key in this.visibleTiles)) {
        return;
      }
    }
    Game.display.draw(entity.x,entity.y,entity.char,entity.color);
  }
  drawAll() {
    for (let key in this.map) {
      let [x, y] = this.getPos(key);
      this.drawTile(x, y);
    }
  }

  // functions to change state
  createEntityAtFreeCell(what, options){
    var key = this.pullFreeCellKey();
    var [x, y] = this.getPos(key);
    var entity = new what(x, y, options);
    this.entities[key] = entity;
    return entity;
  }
  revealMapAroundPlayer() {
    var fov = new ROT.FOV.RecursiveShadowcasting(this.isPassable.bind(this));
    this.visibleTiles = {};
    fov.compute(Game.player.x, Game.player.y, this.lightRadius, (x, y) => {
      const key = this.getKey(x, y);
      this.visibleTiles[key] = true;
      this.revealedTiles[key] = true;
      this.drawTile(x, y);
    });
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
  addItem(name){
    var key = this.pullFreeCellKey();
    var [x, y] = this.getPos(key);
    if (name == 'shining trapezohedron') {
      var [sx, sy] = this.getPos(this.upStairsKey);
      x = sx + Math.floor(ROT.RNG.getUniform() * 5) - 2; // +- 2
      y = sy + Math.floor(ROT.RNG.getUniform() * 5) - 2;
      key = this.getKey(x, y);
      console.log(x, y, key);
    }
    this.items[key]=new Item(x,y,name);
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
