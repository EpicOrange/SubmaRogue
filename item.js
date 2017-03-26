class Item{
  constructor(x,y,name){
    this.x = x;
    this.y = y;
    this.color = items[name].color;
    this.char = items[name].char;
    this.name = items[name].name;
    this.type = items[name].type;//oxygen, armor, weapon, etc
    this.value = items[name].value;//amount of oxygen, defense value of armor, attack of weapon, etc
  }
}
