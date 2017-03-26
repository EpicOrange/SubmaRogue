var enemies = {
  "fish":{
    "char": "α",
    "color": "orange",
    "hp": 3,
    "atk": 1,
    "def": 0,
    "speed": 120,
    "pathfinder": ROT.Path.AStar,
    "name": "fish"
  },
  "shark":{
    "char":"ᐈ",
    "color":"#85B8C9",
    "hp":10,
    "atk":3,
    "def":1,
    "speed":150,
    "pathfinder": ROT.Path.AStar,
    "name":"shark"
  },
  "squid":{
    "char":"☄ ",
    "color":"red",
    "hp":6,
    "atk":2,
    "def":1,
    "speed":80,
    "pathfinder":ROT.Path.AStar,
    "name":"squid"
  },
  "giantsquid":{
    "char":"☄ ",
    "color":"#7D290F",
    "hp":10,
    "atk":4,
    "def":3,
    "speed":90,
    "pathfinder":ROT.Path.AStar,
    "name":"giantsquid"
  }
}
