
class MapGenerator {
  static cave(map) {
    // '.' tiles
    var cellMap = new ROT.Map.Cellular(map.width,map.height,{
      connected:true
    });
    cellMap.randomize(0.5);
    var mapCallback = function(x,y,value){
      var key = x+','+y;
      if (value == 0) {
        map.map[key]='#';
      } else {
        map.map[key]='.';
        map.freeCells.push(key);
      }
    };
    for(var i=0; i<10;i++)cellMap.create();
    cellMap.connect(mapCallback.bind(map),1);
    map.generateStairs(); // stairs
  }
}

var cave = function(randomness){
  return function(map){
    // '.' tiles
    var cellMap = new ROT.Map.Cellular(map.width-2,map.height-2,{
      connected:true
    });
    cellMap.randomize(randomness);
    var mapCallback = function(x,y,value){
      var key = x+','+y;
      if (value == 0) {
        map.map[key]='#';
      } else {
        map.map[key]='.';
        map.freeCells.push(key);
      }
    };
    for(var i=0; i<10;i++)cellMap.create();
    cellMap.connect(mapCallback.bind(map),1);
    map.generateStairs(); // stairs
  };
};

var dungeon = function(){
  return function(map){
    var diggerMap = new ROT.Map.Digger(map.width-2, map.height-2);
    var mapCallback = function(x,y,value){
      var key = x+','+y;
      if (value == 1) {
        map.map[key]='X';
      } else {
        map.map[key]='.';
        map.freeCells.push(key);
      }
    };
    diggerMap.create(mapCallback.bind(map));
    map.generateStairs();
  }
}

// all levels should have an object:
// generateTiles(map): define map.map, map.freeCells
// generateEntities(map): create entities and items

var levels = [
  null, // level 0, should never be referenced
  { // level 1
    generateTiles: cave(0.7),
    generateEntities(map){
      for (let i = 0; i < 5; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.fish);
      }
      for(let i=0;i<3;i++){
        map.addItem('oxygen50');
      }
      for(let i=0;i<2;i++){
        map.addItem('oxygen100');
      }
      map.addItem('oxygen200');
      map.addItem('spear');
    },
  },
  { // level 2
    generateTiles: cave(0.65),
    generateEntities(map) {
      for (let i = 0; i < 3; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.squid);
      }
      for (let i = 0; i < 5; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.fish);
      }
      for(let i=0;i<3;i++){
        map.addItem('oxygen50');
      }
      for(let i=0;i<2;i++){
        map.addItem('oxygen100');
      }
      map.addItem('oxygen200');
      map.addItem('harpoon');
      map.addItem('chainvest');
    },
  },
  { // level 3
    generateTiles: cave(0.65),
    generateEntities(map) {
      for (let i = 0; i < 5; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.squid);
      }
      for (let i = 0; i < 3; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.snake);
      }
      for(let i=0;i<2;i++){
        map.addItem('oxygen50');
      }
      for(let i=0;i<1;i++){
        map.addItem('oxygen100');
      }
      map.addItem('oxygen200');

      map.addItem('divingsuit');
    },
  },
  { // level 4
    generateTiles: cave(0.65),
    generateEntities(map) {
      for (let i = 0; i < 1; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.shark);
      }
      for (let i = 0; i < 5; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.squid);
      }
      for (let i = 0; i < 5; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.snake);
      }
      for(let i=0;i<3;i++){
        map.addItem('oxygen50');
      }
      for(let i=0;i<2;i++){
        map.addItem('oxygen100');
      }
      map.addItem('lance');
    },
  },
  { // level 5
    generateTiles: cave(0.5),
    generateEntities(map) {
      for (let i = 0; i < 1; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.giantsquid);
      }
      for (let i = 0; i < 1; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.shark);
      }
      for (let i = 0; i < 5; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.squid);
      }
      for(let i=0;i<3;i++){
        map.addItem('oxygen50');
      }
      for(let i=0;i<1;i++){
        map.addItem('oxygen100');
      }
    },
    lightRadius: 30,
  },
  { // level 6
    generateTiles: dungeon(),
    generateEntities(map) {
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.giantsquid);
      }
      for (let i = 0; i < 8; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.snake);
      }
      for(let i=0;i<3;i++){
        map.addItem('oxygen50');
      }
      for(let i=0;i<1;i++){
        map.addItem('oxygen100');
      }
    },
    lightRadius: 27,
  }
];
