function GSAchievement(name) {
  this.name = name;
  this.localizedName = Core.bundle.get("achievement.golden-silicon-" + this.name + ".name");
  this.description = Core.bundle.get("achievement.golden-silicon-" + this.name + ".description");
  this.icon = Core.atlas.find("golden-silicon-" + this.name);
  this.complete = Core.settings.getBool("golden-silicon-" + this.name + "-completed", false);
}

GSAchievement.prototype.isCompleted = function() {
  return Core.settings.getBool("golden-silicon-" + this.name + "-completed", false);
};

GSAchievement.prototype.completeNow = function() {
  if (!this.isCompleted()) {
    this.complete = true;
    Core.settings.put("golden-silicon-" + this.name + "-completed", true);
    
    Vars.ui.hudfrag.showToast(Core.bundle.format("achievement.golden-silicon-complete", this.localizedName));
  }
};

GSAchievement.prototype.uncompleteNow = function() {
  if (this.isCompleted()) {
    this.complete = false;
    Core.settings.put("golden-silicon-" + this.name + "-completed", false);
  }
};

var nameArray = new Seq([
  "copper-wall",
  "drowned",
  "block-of-mystery"
]);

var array = new Seq();

exports.load = function() {
  nameArray.each(a => {
    array.add(new GSAchievement(a));
  });
  
  exports.array = array.copy();
};