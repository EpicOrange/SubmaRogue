class Player extends Entity {
  constructor(x, y){
    super(x, y, {
        char: '@',
        color: 'yellow',
        hp: 10,
        speed: 100,
      });
    this.items = {};
  }

  act(){
    Game.engine.lock();
    /* wait for user input; do stuff when user hits a key */
    window.addEventListener('keydown', this);
  }

  handleEvent(e){
    var keyMap = {};

    keyMap[75] = keyMap[38] = keyMap[56] = 0; // top
    keyMap[73] =              keyMap[57] = 1; // top right
    keyMap[76] = keyMap[39] = keyMap[54] = 2; // right
    keyMap[78] =              keyMap[51] = 3; // bottom right
    keyMap[74] = keyMap[40] = keyMap[50] = 4; // bottom
    keyMap[66] =              keyMap[49] = 5; // bottom left
    keyMap[72] = keyMap[37] = keyMap[52] = 6; // left
    keyMap[89] =              keyMap[55] = 7; // top left

    var code = e.keyCode;
    if(!(code in keyMap))return;

    e.preventDefault(); // prevent e.g. arrow keys from scrolling the page

    var diff = ROT.DIRS[8][keyMap[code]];
    var newX = this.x + diff[0];
    var newY = this.y + diff[1];

    var newKey = newX + ',' + newY;
    if(!Game.map.isPassable(newX,newY))return;
    this.moveTo(newX,newY);
    window.removeEventListener('keydown', this);
    Game.engine.unlock();
  }

}
