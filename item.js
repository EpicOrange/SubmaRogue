class Item{
  constructor(x,y,options){
    this.x = x;
    this.y = y;
    this.color = options.color;
    this.char = options.char;
    this.name = options.name;
    this.type = options.type;//oxygen, armor, weapon, etc
    this.value = options.value;//amount of oxygen, defense value of armor, attack of weapon, etc
  }
}
