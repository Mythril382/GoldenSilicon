const GSBlocks = require("content/GSBlocks");
const GSUnitTypes = require("content/GSUnitTypes");
const GSAchievements = require("content/GSAchievements");
const GSSettings = require("content/GSSettings");
const GSVars = require("GSVars");

require("game/AchievementHandler");

GSBlocks.load();
GSUnitTypes.load();
GSVars.load();

Events.on(ClientLoadEvent, () => {
  GSAchievements.load();
  GSSettings.load();
});
