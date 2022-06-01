const {BulletAmmoType} = require("type/ammo/BulletAmmoType");
const {BlockAmmoType} = require("type/ammo/BlockAmmoType");

exports.load = function() {
  UnitTypes.reign.ammoType = new BulletAmmoType({});
  UnitTypes.dagger.ammoType = new BlockAmmoType(Blocks.copperWall, 15, {});
  UnitTypes.flare.ammoType = new BlockAmmoType(Blocks.copperWall, 15, {});
};