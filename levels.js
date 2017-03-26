
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
        map.map[key]='=';
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
  };
};

var maze = function(){
  return function(map){
    var diggerMap = new ROT.Map.DividedMaze(map.width-2, map.height-2);
    var mapCallback = function(x,y,value){
      var key = x+','+y;
      if (value == 1) {
        map.map[key]='#';
      } else {
        map.map[key]='.';
        map.freeCells.push(key);
      }
    };
    diggerMap.create(mapCallback.bind(map));
    map.generateStairs();
  };
};

var finalLevel = function(){
  return function(map){
    const createPillar = (cx, cy) => {
      for (let y = cy-2; y <= cy+2; y++) {
        for (let x = cx-2; x <= cx+2; x++) {
          var key = x+','+y;
          map.map[key]='#';
        }
      }
    };
    createPillar(Math.floor(map.width / 4), Math.floor(map.height / 4));
    createPillar(Math.ceil(3 * map.width / 4), Math.floor(map.height / 4));
    createPillar(Math.floor(map.width / 4), Math.ceil(3 * map.height / 4));
    createPillar(Math.ceil(3 * map.width / 4), Math.ceil(3 * map.height / 4));
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        var key = x+','+y;
        var isInside = (x > 3 && x < map.width - 3 && y > 3 && y < map.height - 3);
        if (!isInside) {
          map.map[key]='#';
        }
        if (map.map[key]!='#') {
          map.map[key]=(Math.random() < 0.01 ? '%' : '.');
          var isInsideMiddle = (x > 7 && x < map.width - 7 && y > 7 && y < map.height - 7);
          if (isInsideMiddle) {
            map.freeCells.push(key);
          }
        }
      }
    }
    map.generateUpStairs();
  };
};

// all levels should have an object:
// generateTiles(map): define map.map, map.freeCells
// generateEntities(map): create entities and items

// Level 1-6 = ocean
// Level 7-9 = Atlantis (dungeon)
// Level 10 = Atlantis (maze)
// Level 11 = Final floor, boss? get best items

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
      map.addItem('defense stone');
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

      map.addItem('defense gem');
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
      for (let i = 0; i < 4; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.crab);
      }
      for(let i=0;i<3;i++){
        map.addItem('oxygen50');
      }
      for(let i=0;i<2;i++){
        map.addItem('oxygen100');
      }
      map.addItem('defense crystal');
    },
    lightRadius: 30,
  },
  { // level 6
    generateTiles: cave(0.45),
    generateEntities(map) {
      for (let i = 0; i < 1; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.giantsquid);
      }
      for (let i = 0; i < 1; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.giantcrab);
      }
      for (let i = 0; i < 5; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.crab);
      }
      for(let i=0;i<3;i++){
        map.addItem('oxygen50');
      }
      for(let i=0;i<1;i++){
        map.addItem('oxygen100');
      }
    },
    lightRadius: 27,
  },
  { // level 7
    generateTiles: dungeon(),
    generateEntities(map) {
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteanwarrior);
      }
      for (let i = 0; i < 8; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.crab);
      }
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.giantcrab);
      }
      for(let i=0;i<3;i++){
        map.addItem('oxygen50');
      }
      for(let i=0;i<1;i++){
        map.addItem('oxygen100');
      }
      map.addItem('charm of warding');
    },
    lightRadius: 24,
  },
  { // level 8
    generateTiles: dungeon(),
    generateEntities(map) {
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteanwarrior);
      }
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteanguard);
      }
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.giantcrab);
      }
      for(let i=0;i<3;i++){
        map.addItem('oxygen50');
      }
      for(let i=0;i<2;i++){
        map.addItem('oxygen100');
      }
      map.addItem('oxygen200');
        map.addItem('awl pike');
    },
    lightRadius: 21,
  },
  { // level 9
    generateTiles: dungeon(),
    generateEntities(map) {
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteanwarrior);
      }
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteanguard);
      }
      for (let i = 0; i < 1; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteandestroyer);
      }
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteanchaser);
      }
      for(let i=0;i<2;i++){
        map.addItem('oxygen50');
      }
      for(let i=0;i<1;i++){
        map.addItem('oxygen100');
      }
      map.addItem('oxygen300');
      map.addItem('orb of protection');
    },
    lightRadius: 18,
  },
  { // level 10
    generateTiles: maze(),
    generateEntities(map) {
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteanwarrior);
      }
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteanguard);
      }
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteandestroyer);
      }
      for (let i = 0; i < 3; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteanchaser);
      }
      for(let i=0;i<5;i++){
        map.addItem('oxygen50');
      }
      for(let i=0;i<4;i++){
        map.addItem('oxygen100');
      }
    },
    lightRadius: 15,
  },
  { // level 11
    generateTiles: finalLevel(),
    generateEntities(map) {
      map.addItem('shining trapezohedron');
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteanwarrior);
      }
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteanguard);
      }
      for (let i = 0; i < 2; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteandestroyer);
      }
      for (let i = 0; i < 3; i++) {
        map.createEntityAtFreeCell(Enemy, enemies.atlanteanchaser);
      }
      for(let i=0;i<5;i++){
        map.addItem('oxygen500');
      }
      for(let i=0;i<4;i++){
        map.addItem('oxygen100');
      }
    },
    lightRadius: 10,
  }
];
