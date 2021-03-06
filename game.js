
var width = 60;
var height = 45;
var Game = {
  log: null,
  status: null,
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
    this.log = new Log(width);
    this.status = new Status(width);
    document.body.appendChild(this.log.display.getContainer());
    document.body.appendChild(this.display.getContainer());
    document.body.appendChild(this.status.display.getContainer());
    this.restart();
  },
  restart() {
    this.display.clear();
    this.log.clear();
    this.status.clear();
    this.player = new Player();

    this.scheduler = new ROT.Scheduler.Speed();
    this.engine = new ROT.Engine(this.scheduler);

    this.maps = [false];
    this.switchToMap(1, true);

    this.engine.start();
  },
  addNewMap(index) {
    const map = new Map(width, height);
    const level = levels[this.level];
    level.generateTiles(map);
    level.generateEntities(map);
    map.lightRadius = level.lightRadius || 900; // defaults to 900
    if (index == this.maps.length) {
      this.maps.push(map);
    } else {
      this.maps[index] = map;
    }
  },
  switchToMap(level, atUpStairs) {
    this.level = level;
    if (this.map) {
      this.map.removePlayerEntity(this.player);
      this.map.removeEnemiesFromScheduler();
    }
    if (level >= this.maps.length || !this.maps[level]) {
      this.addNewMap(level);
      this.log.printStory(level);
    } else if (level < 0) {
      return;
    }
    this.map = this.maps[level];
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
      if (this.player.hasTreasure) {
        this.switchToMap(0, false);
      } else {
        this.log.add("The abyss stares into you. You find that you cannot leave.");
      }
    }
  },
  descendStairs() {
    if (this.level < levels.length) {
      console.log("down to level " + (this.level + 1));
      this.switchToMap(this.level + 1, true);
      this.log.add("You descend the stairs.");
    } else {
      this.log.add("You try to descend, but the pressure is too great.");
    }
  },
  generateMilitary() {
    difficulty = 3; // # to spawn
    for (let i = 9; i >= 0; i--) { // levels 1-10
      const map = this.maps[i];
      for (let j = 0; j < difficulty; j++) {
        map.createEntityAtFreeCell(Enemy, enemies.military);
      }
      difficulty += Math.ceil(difficulty / 5) + 1;
    }
  },
  winGame() {
    this.engine.lock();
    this.log.add("As you kill the last, a sense of dread overcomes you.");
    this.log.add("You have acquired immense wealth and power, but");
    this.log.add("...is this how you will live out the rest of your days?");
    this.log.add("== The end ==");
  },
};
