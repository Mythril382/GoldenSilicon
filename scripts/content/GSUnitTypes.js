const {BulletAmmoType} = require("type/ammo/BulletAmmoType");
const {BlockAmmoType} = require("type/ammo/BlockAmmoType");
const {MineWeapon} = require("type/weapons/MineWeapon");

exports.load = function() {
  //vanilla unit modifiers
  UnitTypes.reign.ammoType = new BulletAmmoType({});
  UnitTypes.dagger.ammoType = new BlockAmmoType(Blocks.copperWall, 15, {});
  UnitTypes.flare.ammoType = new BlockAmmoType(Blocks.copperWall, 15, {});
  UnitTypes.mega.weapons.add(new MineWeapon("repair-beam-weapon-center", {
    shootY: 6
  }));
};