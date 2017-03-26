class Player extends Entity {
  constructor(x, y){
    super(x, y,
      {
        char: '@',
        color: 'yellow',
        hp: 10,
        speed: 100,
        atk:3,
        def:0
      });
    this.items = {
      armor:'none',
      weapon:new Item(0,0,{
        color:'brown',
        char:'/',
        name:'stick',
        type:'weapon',
        value: 3
      })
    };
  }
  die() {
    console.log("kill player");
  }

  act(){
    Game.engine.lock();
    /* wait for user input; do stuff when user hits a key */
    window.addEventListener('keydown', this);
  }

  handleEvent(e){
    var keyMap = {};

    //hjklyubn   arrow keys   numpad
    keyMap[75] = keyMap[38] = keyMap[56] = 0; // top
    keyMap[85] =              keyMap[57] = 1; // top right
    keyMap[76] = keyMap[39] = keyMap[54] = 2; // right
    keyMap[78] =              keyMap[51] = 3; // bottom right
    keyMap[74] = keyMap[40] = keyMap[50] = 4; // bottom
    keyMap[66] =              keyMap[49] = 5; // bottom left
    keyMap[72] = keyMap[37] = keyMap[52] = 6; // left
    keyMap[89] =              keyMap[55] = 7; // top left
    //todo 71 (G) 188 (,) for picking up items
    keyMap[71] = keyMap[188] = 'i';//check items
    var code = e.keyCode;
    e.preventDefault(); // prevent e.g. arrow keys from scrolling the page

    if(!(code in keyMap))return;

    if(keyMap[code]=='i'){
      var item = Game.map.getItem(this.x,this.y);
      if(item){
        if(item.type=='weapon'){
          Game.map.dropItem(this.items.weapon,this.x,this.y);
          this.items.weapon=item;
          this.atk=item.value;
          console.log('picked up ' +item.name);
        }
      }else{
        console.log('no item');
      }
    }else{
      var diff = ROT.DIRS[8][keyMap[code]];
      var newX = this.x + diff[0];
      var newY = this.y + diff[1];
    }

    var newKey = newX + ',' + newY;
    var entity = Game.map.getEntity(newX, newY);
    if (!Game.map.isPassable(newX, newY)) {
      return;
    } else if (entity) {
      entity.damage(this.atk);
    } else {
      this.moveTo(newX,newY);
    }
    window.removeEventListener('keydown', this);
    Game.engine.unlock();
  }

}