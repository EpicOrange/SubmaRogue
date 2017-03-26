
var items = {
  suit: {
    color:'blue',
    char:'V',
    name:'suit',
    type:'armor',
    value:1
  },
  stick: {
    color:'brown',
    char:'/',
    name:'stick',
    type:'weapon',
    value: 3
  },
  test: {
    color:'green',
    char:'X',
    name:'test',
    type:'weapon',
    value:10
  },
  'armor i guess': {
    color:'gray',
    char:'#',
    name:'armor i guess',
    type:'armor',
    value:10
  },
  oxygen100: {
    color:'blue',
    char:'8',
    name:'100 units of oxygen',
    type:'oxygen',
    value: 100
  },
  oxygen200: {
    color:'blue',
    char:'8',
    name:'200 units of oxygen',
    type:'oxygen',
    value: 200
  },
};

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
