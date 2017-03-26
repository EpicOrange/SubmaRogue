class Player{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.char = '@';
    this.color = 'yellow';
    this.speed = 100;
    this.draw();
  }
  draw() {
    Game.map.drawEntity(this);
  }
  moveTo(x,y){
    Game.map.drawTile(this.x, this.y); // draw map tile
    this.x = x;
    this.y = y;
    this.draw();
  }
  act(){
    Game.engine.lock();
    /* wait for user input; do stuff when user hits a key */
    window.addEventListener("keydown", this);
  }

  getSpeed(){
    return this.speed;
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

    var newKey = newX + "," + newY;
    if(!Game.map.isPassable(newX,newY))return;
    this.moveTo(newX,newY);
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
  }

}
