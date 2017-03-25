class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.map = {};
    this.generate();
  }
  generate() {
    var cellMap = new ROT.Map.Cellular(this.width,this.height,{
      born:[5,6,7,8],
      survive:[3,4,5,6,7]
    });
    cellMap.randomize(0.5);
    var mapCallback = function(x,y,value){
      if(value)return;
      var key = x+','+y;
      this.map[key]='.';
    }
    cellMap.create(mapCallback.bind(this));
  }
  draw() {
    for (var key in this.map) {
      var parts = key.split(",");
      var x = parseInt(parts[0]);
      var y = parseInt(parts[1]);
      Game.display.draw(x, y, this.map[key]);
    }
  }
}