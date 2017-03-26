// pathfinders take an enemy as an argument and returns path
var pathfinders = {
  go_straight_towards: function(enemy) {
    var playerX = Game.player.x;
    var playerY = Game.player.y;
    var isPassable = Game.map.isPassable.bind(Game.map);
    var path = [];
    var pathfinder = new ROT.Path.AStar(playerX, playerY, isPassable, {topology: 8});

    pathfinder.compute(enemy.x, enemy.y, (x, y) => {path.push([x, y]);});
    path.shift(); // remove first element, our own position
    return path;
  },
  wander: function(enemy) {
    var possiblePositions = [];
    for (let i = 0; i < 8; i++) {
      var diff = ROT.DIRS[8][i];
      var pos = [enemy.x + diff[0], enemy.y + diff[1]];
      if (Game.map.isPassable(...pos)) {
        possiblePositions.push(pos);
      }
    }
    if (possiblePositions.length == 0) {
      return [];
    } else {
      var index = Math.floor(ROT.RNG.getUniform() * possiblePositions.length);
      return [possiblePositions[index]];
    }
  },
  wander_until_near: function(enemy) {
    var path = this.go_straight_towards(enemy);
    if (path.length > 10) {
      return this.wander(enemy);
    }
    return path;
  },
};
var enemies = {
  "fish":{
    "char": "α",
    "color": "orange",
    "hp": 3,
    "atk": 2,
    "def": 0,
    "speed": 120,
    "pathfinder": "wander",
    "name": "fish"
  },
  "shark":{
    "char":"ᐈ",
    "color":"#85B8C9",
    "hp":8,
    "atk":4,
    "def":1,
    "speed":150,
    "pathfinder": "go_straight_towards",
    "name":"shark"
  },
  "squid":{
    "char":"A",
    "color":"red",
    "hp":6,
    "atk":2,
    "def":1,
    "speed":80,
    "pathfinder":"wander_until_near",
    "name":"squid"
  },
  "giantsquid":{
    "char":"A",
    "color":"#7D290F",
    "hp":8,
    "atk":5,
    "def":3,
    "speed":70,
    "pathfinder":"wander_until_near",
    "name":"giantsquid"
  },
  "snake":{
    "char":"S",
    "color":"orange",
    "hp":4,
    "atk":5,
    "def":0,
    "speed":150,
    "pathfinder":"wander_until_near",
    "name":"snake"
  },
  "crab":{
    "char":"c",
    "color":"orange",
    "hp":10,
    "atk":4,
    "def":4,
    "speed":60,
    "pathfinder":"wander_until_near",
    "name":"crab"
  },
  "giantcrab":{
    "char":"C",
    "color":"brown",
    "hp":15,
    "atk":7,
    "def":4,
    "speed":40,
    "pathfinder":"wander_until_near",
    "name":"giant crab"
  },
  "atlanteanwarrior":{
    "char":"♆",
    "color":"cyan",
    "hp":15,
    "atk":8,
    "def":3,
    "speed":120,
    "pathfinder":"wander_until_near",
    "name":"atlantean warrior",
  },
  "atlanteanguard":{
    "char":"⛢",
    "color":"cyan",
    "hp":20,
    "atk":6,
    "def":5,
    "speed":80,
    "pathfinder":"wander_until_near",
    "name":"atlantean guard",
  },
  "atlanteandestroyer":{
    "char":"♅",
    "color":"cyan",
    "hp":20,
    "atk":10,
    "def":5,
    "speed":100,
    "pathfinder":"wander_until_near",
    "name":"atlantean destroyer",
  },
  "atlanteanchaser":{
    "char":"☿",
    "color":"cyan",
    "hp":10,
    "atk":10,
    "def":0,
    "speed":250,
    "pathfinder":"go_straight_towards",
    "name":"atlantean chaser",
  }
};
