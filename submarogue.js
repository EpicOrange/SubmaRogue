
var Game = {
  width: 50,
  height: 50,
  entities: {},//two entities cannot have the same position
  items: {},//items can have the same position, so they can stack on top of each other
  player: null,
  fish: null,
  scheduler: null,
  engine: null,
  init: function() {
      this.display = new ROT.Display({width:this.width,height:this.height});
      document.body.appendChild(this.display.getContainer());
      this.map = new Map(this.width, this.height);
      this.map.drawAll();
      this.player = this.map.addEntity(Player);

      this.scheduler = new ROT.Scheduler.Speed();
      this.engine = new ROT.Engine(this.scheduler);
      this.addActor(this.player);
      this.fish = this.map.addEntity(Enemy, {
        char: "F",
        color: "orange",
        maxHp: 10,
        damage: 1,
        speed: 200,
        pathfinder: ROT.Path.AStar
      });
      this.addActor(this.fish);
      this.engine.start();
  },
  addActor: function(actor){
    this.scheduler.add(actor,true);
  },
  addEvent: function(event){
    this.scheduler.add(event,false);
  }
}
