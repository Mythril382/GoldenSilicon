//evaporates almost any bullet for ammo
function BulletAmmoType(object) {
  return extend(AmmoType, Object.assign({
    range: 85,
    ammoColor: Pal.ammo,
    
    icon() {
      return "";
    },
    
    color() {
      return this.ammoColor;
    },
    
    barColor() {
      return Pal.ammo;
    },
    
    resupply(unit) {
      const range = unit.hitSize + this.range;
      const bulletConsumer = bullet => {
        if (bullet.team != unit.team && bullet.type.absorbable && bullet.within(unit, range)) {
          this.ammoColor = bullet.type.backColor;
          unit.ammo = Math.min(unit.ammo + bullet.type.width, unit.type.ammoCapacity);
          bullet.absorb();
        }
      };
      
      Groups.bullet.intersect(unit.x - range, unit.y - range, range * 2, range * 2, bulletConsumer);
    },
    
    toString() {
      return "GoldenSilicon.type.ammo.BulletAmmoType";
    }
  }, object));
}

module.exports = {
  BulletAmmoType: BulletAmmoType
};
