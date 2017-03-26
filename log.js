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
      this.add("A shark attack had devoured your friends.");
      this.add("You are undeterred. You grab a stick from the wreckage.");
      this.add("You descend in pursuit of the fabled treasure of Atlantis");
      this.add("...and vengeance against those who doubted your insanity.");
      break;
    case 2:
      this.clear();
      this.add("The water here seems denser. Must be the higher pressure.");
      break;
    case 3:
      this.clear();
      this.add("These fish all seem to be out to kill you.");
      this.add("That's probably why no one's ever found the treasure alive.");
      break;
    case 4:
      this.clear();
      this.add("More sharks appear as you dive.");
      this.add("You are certain that you are approaching Atlantis.");
      break;
    case 5:
      this.clear();
      this.add("The sunlight from above is fading away as you dive deeper.");
      break;
    case 6:
      this.clear();
      this.add("You see a brief outline of ruins... it must be Atlantis!");
      break;
    case 7:
      this.clear();
      this.add("You were right all along!");
      this.add("You find yourself in the dim, pressurized halls of Atlantis.");
      break;
    case 8:
      this.clear();
      this.add("There are no treasures to be found, besides your equipment.");
      this.add("Perhaps the legendary treasure is deeper.");
      break;
    case 9:
      this.clear();
      this.add("The stonework here looks more faded...");
      this.add("You feel this is the last of the grand halls of Atlantis.");
      break;
    case 10:
      this.clear();
      this.add("The labyrinth of Atlantis greets you.");
      this.add("You knew it wasn't going to be easy.");
      this.add("At least there is plenty of oxygen.");
      break;
    case 11:
      this.clear();
      this.add("You arrive at the temple room. What is that?");
      this.add("A non-Euclidean object greets you in the sanctum center.");
      this.add("It sparkles with an eerie glow. This must be the treasure!");
      break;
    case 0:
      this.clear();
      this.add(`You crawl out of the watery labyrinth with spear in hand.`);
      this.add(`The people shriek as you emerge from the water.`);
      this.add(`'Cthulhu! Cthulhu!'.`);
      this.add(`You must destroy them. They must not know.`);
      break;
    }
    // this is the char limit
    //this.add("You find yourself in the dim, pressurized halls of Atlantis.");
  }
}
