class Player{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.char = '@';
    this.color = 'yellow';
    this.draw();
    this.speed = 100;
  }
  draw(){
    Game.map.drawEntity(this);
  }
  moveTo(x,y){
    console.log('move');
    this.x = x;
    this.y = y;
    this.draw();
  }
  act(){
    Game.engine.lock();
    console.log('player act');
    /* wait for user input; do stuff when user hits a key */
    window.addEventListener("keydown", this);
  }

  getSpeed(){
    return this.speed;
  }

  handleEvent(e){
    var keyMap = {};
    //0 is top left, then goes clockwise
    keyMap[55] = 0;
    keyMap[52] = 1;
    keyMap[49] = 2;
    keyMap[50] = 3;
    keyMap[51] = 4;
    keyMap[54] = 5;
    keyMap[57] = 6;
    keyMap[56] = 7;

    var code = e.keyCode;
    console.log(code);
    if(!(code in keyMap))return;
    var diff = ROT.DIRS[8][keyMap[code]];
    var newX = this._x + diff[0];
    var newY = this._y + diff[1];

    var newKey = newX + "," + newY;
    if(!Game.map.isPassable(newX,newY))return;
    this.moveTo(newX,newY);
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
  }

}
