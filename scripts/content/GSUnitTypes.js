const {BulletAmmoType} = require("type/ammo/BulletAmmoType");
const {BlockAmmoType} = require("type/ammo/BlockAmmoType");
const {MineWeapon} = require("type/weapons/MineWeapon");
const {TeleportBulletType} = require("entities/bullet/TeleportBulletType");

exports.load = function() {
  //vanilla unit modifiers
  UnitTypes.reign.ammoType = new BulletAmmoType({});
  UnitTypes.dagger.ammoType = new BlockAmmoType(Blocks.copperWall, 15, {});
  UnitTypes.dagger.weapons.each(w => {
    w.bullet = new TeleportBulletType(2.5, 9, {
      width: 7,
      height: 9,
      lifetime: 120
    });
  });
  UnitTypes.flare.ammoType = new BlockAmmoType(Blocks.copperWall, 15, {});
  UnitTypes.mega.weapons.add(new MineWeapon("repair-beam-weapon-center", {
    shootY: 6
  }));
};