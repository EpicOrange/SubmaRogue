class Player extends Entity {
  constructor(){
    super(0, 0,
      {
        char: '@',
        color: 'yellow',
        hp: 30,
        speed: 100,
        atk:3,
        def:1
      });
    this.items = {
      weapon: new Item(0, 0, 'stick'),
      armor: new Item(0, 0, 'suit'),
    };
    this.oxygen = 100;
    this.lightRange = 1000; // TODO change according to items?
  }
  damage(dmg){
    dmg = super.damage(dmg);
    Game.log.add(`you took ${-1*dmg} damage.`);
  }
  die() {
    Game.log.add(`You have died. Press R to restart.`);
    console.log("kill player");
  }

  act(){
    this.oxygen-=1;
    if(this.oxygen<=0){
      Game.log.add('You have drowned.');
      this.die();
    }
    Game.map.revealMapAroundPlayer();
    Game.status.update();
    Game.log.update();
    Game.engine.lock();
    Game.log.clearHighlight();
    /* wait for user input; do stuff when user hits a key */
    window.addEventListener('keydown', this);
  }

  handleEvent(e){
    var keyMap = {};

    if (this.isDead()) {
      keyMap[82] = 'r';
    } else {
      //hjklyubn   arrow keys   numpad
      keyMap[75] = keyMap[38] = keyMap[56] = 0; // top
      keyMap[85] =              keyMap[57] = 1; // top right
      keyMap[76] = keyMap[39] = keyMap[54] = 2; // right
      keyMap[78] =              keyMap[51] = 3; // bottom right
      keyMap[74] = keyMap[40] = keyMap[50] = 4; // bottom
      keyMap[66] =              keyMap[49] = 5; // bottom left
      keyMap[72] = keyMap[37] = keyMap[52] = 6; // left
      keyMap[89] =              keyMap[55] = 7; // top left
      keyMap[190] = keyMap[32] = keyMap[53] = '.'; // wait
      keyMap[71] = keyMap[188] = 'g';
      if (e.shiftKey) {
        keyMap[188] = '<';
        keyMap[190] = '>';
      }
    }

    var code = e.keyCode;
    e.preventDefault(); // prevent e.g. arrow keys from scrolling the page
    switch(keyMap[code]) {
    case 'r': // restart
      window.removeEventListener('keydown', this);
      Game.restart();
      break;
    case 'g': // get items
      var item = Game.map.getItem(this.x,this.y);
      if(item){
        switch(item.type) {
        case 'weapon':
          Game.map.dropItem(this.items.weapon,this.x,this.y);
          this.items.weapon=item;
          this.atk=item.value;
          Game.log.add('You pick up ' + item.name+'.');
          break;
        case 'armor':
          Game.map.dropItem(this.items.armor,this.x,this.y);
          this.items.armor=item;
          this.def=item.value;
          Game.log.add('You pick up ' + item.name +'.');
          break;
        case 'oxygen':
          this.oxygen+=item.value;
          Game.map.removeItem(this.x,this.y);
          Game.log.add(`You pick up ${item.value} units of oxygen.`);
          break;
        default:
          console.error(`Unknown item type ${item.type}: item = ${JSON.stringify(item)}`);
        }
        console.log('picked up ' +item.name);
      }else{
        console.log('no item');
      }
      break;
    case '<':
      if (Game.map.at(Game.player.x, Game.player.y) == "<") {
        Game.ascendStairs();
      }
      break;
    case '>':
      if (Game.map.at(Game.player.x, Game.player.y) == ">") {
        Game.descendStairs();
      }
      break;
    case '.': // wait and do nothing
      break;
    case 0: case 1: case 2: case 3:
    case 4: case 5: case 6: case 7:
      var diff = ROT.DIRS[8][keyMap[code]];
      var newX = this.x + diff[0];
      var newY = this.y + diff[1];
      var newKey = newX + ',' + newY;
      var entity = Game.map.getEntity(newX, newY);
      if (!Game.map.isPassable(newX, newY)) {
        return;
      } else if (entity) {
        Game.log.add(`You dealt ${-1*entity.damage(this.atk)} damage to ${entity.name}.`);
      } else {
        this.moveTo(newX,newY);
      }
      break;
    default:
      if (this.isDead()) {
        Game.log.add(`You have died. Press R to restart.`);
      } else if (code in keyMap) {
        console.error(`Keymap includes ${code} = ${keyMap[code]} but we don't handle it`);
      }
    }
    if (code in keyMap && !this.isDead()) {
      window.removeEventListener('keydown', this);
      Game.engine.unlock();
    }
  }
}
