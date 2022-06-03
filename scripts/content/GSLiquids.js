const {RegionLiquid} = require("type/RegionLiquid");

exports.load = function() {
  exports.ohnoWater = new RegionLiquid("ohno-water", Color.valueOf("596ab8"), {
    region: "error",
    heatCapacity: 0.4,
    effect: StatusEffects.wet,
    boilPoint: 0.5,
    gasColor: Color.grays(0.9)
  });
};