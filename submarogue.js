
var Game = {
  width: 50,
  height: 50,
  entities: {},//two entities cannot have the same position
  items: {},//items can have the same position, so they can stack on top of each other
  init: function() {
      this.display = new ROT.Display({width:this.width,height:this.height});
      document.body.appendChild(this.display.getContainer());
      this.map = new Map(this.width, this.height);
      this.map.draw();
  },
}