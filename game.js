
const fish_options = {
  char: "F",
  color: "orange",
  hp: 10,
  damage: 1,
  speed: 200,
  pathfinder: ROT.Path.AStar
};

var Game = {
  width: 50,
  height: 50,
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
      this.engine.start();

      this.map.addItem({color:'green',char:'X',name:'test',type:'weapon',value:10});

      this.map.generateEnemies();

      this.fish = this.map.addEntity(Enemy, fish_options);
      this.addActor(this.fish);
  },
  addActor: function(actor){
    this.scheduler.add(actor,true);
  },
  addEvent: function(event){
    this.scheduler.add(event,false);
  }
}
