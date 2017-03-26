
var width = 60;
var height = 45;
var Game = {
  log: new Log(width),
  player: null,
  scheduler: null,
  engine: null,
  init: function() {
    this.display = new ROT.Display({
      width: width,
      height: height,
      forceSquareRatio: true
    });
    document.body.appendChild(this.log.display.getContainer());
    document.body.appendChild(this.display.getContainer());

    this.scheduler = new ROT.Scheduler.Speed();

    this.map = new Map(width, height);
    this.map.generateTiles();
    this.map.generateEntities(this);
    this.map.drawAll();
    this.map.addItem({color:'green',char:'X',name:'test',type:'weapon',value:10});
    this.map.addItem({color:'gray',char:'#',name:'armor i guess',type:'armor',value:10});
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
