var Game = {
  width: 50,
  height: 50,
  map: {},
  entities: {},//two entities cannot have the same position
  items: {},//items can have the same position, so they can stack on top of each other
  init: function() {
      this.display = new ROT.Display({width:this.width,height:this.height});
      document.body.appendChild(this.display.getContainer());
      this.generateMap();
      this.drawMap();
  },

  generateMap: function() {
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
  },

  drawMap: function(){
    for (var key in this.map) {
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        this.display.draw(x, y, this.map[key]);
    }
  }
}
