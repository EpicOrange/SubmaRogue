
var width = 60;
var height = 45;
var Game = {
  log: new Log(width),
  status: new Status(width),
  player: null,
  scheduler: null,
  engine: null,
  maps: [],
  map: null, // current map
  level: null, // level 1 means we're using maps[0] right now
  init() {
    this.display = new ROT.Display({
      width: width,
      height: height,
      forceSquareRatio: true
    });
    document.body.appendChild(this.log.display.getContainer());
    document.body.appendChild(this.display.getContainer());
    document.body.appendChild(this.status.display.getContainer());

    this.player = new Player();

    this.scheduler = new ROT.Scheduler.Speed();
    this.engine = new ROT.Engine(this.scheduler);

    this.switchToMap(1, true);

    this.engine.start();
  },
  addNewMap() {
    const map = new Map(width, height);
    const level = levels[this.level];
    level.generateTiles(map);
    level.generateEntities(map);
    this.maps.push(map);
  },
  switchToMap(level, atUpStairs) {
    this.level = level;
    const index = level - 1;
    if (this.map) {
      this.map.removePlayerEntity(this.player);
      this.map.removeEnemiesFromScheduler();
    }
    if (index >= this.maps.length) {
      this.addNewMap();
    } else if (index < 0) {
      return;
    }
    this.map = this.maps[index];
    const playerPosKey = (atUpStairs ? this.map.upStairsKey : this.map.downStairsKey);
    this.map.placePlayerEntity(this.player, playerPosKey);
    this.map.addEnemiesToScheduler();
    this.display.clear();
    this.map.drawAll();
  },
  addActor(actor){
    this.scheduler.add(actor,true);
  },
  removeActor(actor){
    this.scheduler.remove(actor);
  },
  addEvent(event){
    this.scheduler.add(event,false);
  },
  ascendStairs() {
    console.log("up to level " + (this.level - 1));
    if (this.level > 1) {
      this.switchToMap(this.level - 1, false);
      this.log.add("You ascend the stairs.");
    } else {
      this.log.add("The abyss stares into you. You find that you cannot leave.");
    }
  },
  descendStairs() {
    console.log("down to level " + (this.level + 1));
    this.switchToMap(this.level + 1, true);
    this.log.add("You descend the stairs.");
  }
};
