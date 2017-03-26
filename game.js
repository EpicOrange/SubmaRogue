
var Game = {
  width: 50,
  height: 50,
  player: null,
  scheduler: null,
  engine: null,
  init: function() {
    this.display = new ROT.Display({width:this.width,height:this.height});
    document.body.appendChild(this.display.getContainer());
    this.scheduler = new ROT.Scheduler.Speed();

    this.map = new Map(this.width, this.height);
    this.map.generateTiles();
    this.map.generateEntities(this);
    this.map.drawAll();

    this.map.addItem({color:'green',char:'X',name:'test',type:'weapon',value:10});

    this.engine = new ROT.Engine(this.scheduler);
    this.engine.start();
  },
  addActor: function(actor){
    this.scheduler.add(actor,true);
  },
  addEvent: function(event){
    this.scheduler.add(event,false);
  }
};
