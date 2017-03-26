
class MapGenerator {
  static cave(map) {
    // '.' tiles
    var cellMap = new ROT.Map.Cellular(map.width,map.height,{
      connected:true
    });
    cellMap.randomize(0.5);
    var mapCallback = function(x,y,value){
      if(!value)return;
      var key = x+','+y;
      map.map[key]='.';
      map.freeCells.push(key);
    };
    for(var i=0; i<10;i++)cellMap.create();
    cellMap.connect(mapCallback.bind(map),1);
    map.generateStairs(); // stairs
  }
}

// all levels should have an object:
// generateTiles(map): define map.map, map.freeCells
// generateEntities(map): create entities and items

var levels = [
  null, // level 0, should never be referenced
  { // level 1
    generateTiles: MapGenerator.cave,
    generateEntities(map) {
      for (let i = 0; i < 3; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.fish);
      }
      map.addItem('test');
      map.addItem('armor i guess');
    },
  },
  { // level 2
    generateTiles: MapGenerator.cave,
    generateEntities(map) {
      for (let i = 0; i < 5; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.squid);
      }
      map.addItem('test');
      map.addItem('armor i guess');
    },
  },
  { // level 3
    generateTiles: MapGenerator.cave,
    generateEntities(map) {
      for (let i = 0; i < 7; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.squid);
      }
      map.addItem('test');
      map.addItem('armor i guess');
    },
  },
];