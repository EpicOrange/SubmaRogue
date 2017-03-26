
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
      map.addItem('spear');
    },
  },
  { // level 2
    generateTiles: MapGenerator.cave,
    generateEntities(map) {
      for (let i = 0; i < 1; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.shark);
      }
      for (let i = 0; i < 5; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.squid);
      }
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.snake);
      }
      for(let i=0;i<2;i++){
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
    generateTiles: MapGenerator.cave,
    generateEntities(map) {
      for (let i = 0; i < 1; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.shark);
      }
      for (let i = 0; i < 5; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.squid);
      }
      for (let i = 0; i < 1; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.giantsquid);
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
];
