class Log {
  constructor(width) {
    this.logHeight = 8;
    this.width = width;
    this.display = new ROT.Display({
      width: this.width,
      height: this.logHeight + 1,
      forceSquareRatio: true
    });
    this.messages = [];
    this.numHighlightedMessages = 0;
  }
  update() {
    this.display.clear();
    for (let i = 0; i < this.messages.length; i++) {
      if (i < this.numHighlightedMessages) {
        this.display.drawText(0, this.logHeight - i - 1, this.messages[i]);
      } else {
        this.display.drawText(0, this.logHeight - i - 1, `%c{gray}${this.messages[i]}%c{}`);
      }
    }
    this.display.drawText(0, this.logHeight, "-".repeat(this.width));
  }
  add(message) {
    this.messages.unshift(message); // add to front
    this.numHighlightedMessages += 1;
    if (this.messages.length > this.logHeight) {
      this.messages.pop(); // remove from back
    }
    this.update();
  }
  clearHighlight() {
    this.numHighlightedMessages = 0;
  }
  clear() {
    this.messages = [];
  }
  printStory(level){
    switch(level) {
    case 1:
      this.clear();
      var actions = ["reading newspaper clippings", "listening to sonar", "intense meditation", "exploring fake dungeons"];
      var index = Math.floor(ROT.RNG.getUniform() * actions.length);
      this.add(`After months of ${actions[index]}, you and`);
      this.add("...your crew have finally arrived at the location of");
      this.add("...the mythical Atlantis.");
      this.add("A shark attack had devoured your friends,");
      this.add("...but you are undeterred.");
      this.add("You descend in pursuit of the fabled treasure of Atlantis");
      this.add("...and vengeance against those who doubted your insanity.");
      break;
    case 2:
      this.clear();
      this.add(""); // TODO
    }
  }
}
