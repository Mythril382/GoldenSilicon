//simple achievements are updated here
const GSAchievements = require("content/GSAchievements");

Events.on(BlockBuildEndEvent, event => {
  if (event.unit.isPlayer() && event.tile.build.block == Blocks.copperWall) {
    GSAchievements.array.get(0).completeNow();
  }
});

Events.on(UnitDrownEvent, event => {
  if (event.unit.isPlayer()) {
    GSAchievements.array.get(1).completeNow();
  }
});
