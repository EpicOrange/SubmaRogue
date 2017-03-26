class Log {
  constructor(width) {
    this.logHeight = 5;
    this.width = width;
    this.msgnum=0;
    this.display = new ROT.Display({
      width: this.width,
      height: this.logHeight + 1,
      forceSquareRatio: true
    });
    this.messages = [];
  }
  update() {
    this.display.clear();
    for (let i = 0; i < this.messages.length; i++) {
      this.display.drawText(0, this.logHeight - i - 1,this.messages[i]);
    }
    this.display.drawText(0, this.logHeight, "-".repeat(this.width));
  }
  add(message) {
    message = `[${this.msgnum}]`+message;
    this.msgnum+=1;
    this.messages.unshift(message); // add to front
    if (this.messages.length > this.logHeight) {
      this.messages.pop(); // remove from back
    }
    this.update();
  }
}
