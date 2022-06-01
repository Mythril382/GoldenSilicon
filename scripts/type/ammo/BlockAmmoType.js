function BlockAmmoType(block, ammoPerDamage, object) {
  return extend(AmmoType, Object.assign({
    range: 85,
    ammoPerDamage: ammoPerDamage,
    healthTaken: ammoPerDamage,
    block: block,
    
    icon() {
      return this.block.emoji();
    },
    
    color() {
      return Pal.ammo;
    },
    
    barColor() {
      return Pal.ammo;
    },
    
    resupply(unit) {
      if (unit.type.ammoCapacity - unit.ammo < this.ammoPerDamage) return;
      
      const range = unit.hitSize + this.range;
      
      const build = Units.closestBuilding(unit.team, unit.x, unit.y, range, u => u.block == this.block && !u.dead);
      
      if (build != null) {
        Fx.itemTransfer.at(build.x, build.y, this.ammoPerDamage / 2, Pal.ammo, unit);
        unit.ammo = Math.min(unit.ammo + this.ammoPerDamage, unit.type.ammoCapacity);
        build.damage(unit.team, this.healthTaken);
      }
    },
    
    toString() {
      return "GoldenSilicon.type.ammo.BlockAmmoType";
    }
  }, object));
}

module.exports = {
  BlockAmmoType: BlockAmmoType
};