const GSBlocks = require("content/GSBlocks");
const GSUnitTypes = require("content/GSUnitTypes");
const GSAchievements = require("content/GSAchievements");
const GSSettings = require("content/GSSettings");

require("game/AchievementHandler");

GSBlocks.load();
GSUnitTypes.load();

Events.on(ClientLoadEvent, () => {
  GSAchievements.load();
  GSSettings.load();
});