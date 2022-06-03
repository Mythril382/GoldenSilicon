//purely visual weapon, doesn't help with mine speed.
function MineWeapon(name, object) {
  return extend(Weapon, name, Object.assign({
    rotate: true,
    bullet: extend(BulletType, {}),
    beamWidth: 0.75,
    
    hasStats() {
      return false;
    },
    
    update(unit, mount) {
      mount.shoot = false;
      mount.rotate = true;
      
      if (unit.mineTile != null && !unit.activelyBuilding()) {
        mount.aimX = unit.mineTile.worldx();
        mount.aimY = unit.mineTile.worldy();
      }else{
        const weaponRotation = unit.rotation - 90;
        mount.aimX = unit.x + Angles.trnsx(unit.rotation - 90, this.x, this.y) + Angles.trnsx(weaponRotation, this.shootX, this.shootY);
        mount.aimY = unit.y + Angles.trnsy(unit.rotation - 90, this.x, this.y) + Angles.trnsy(weaponRotation, this.shootX, this.shootY);
      }
      
      this.super$update(unit, mount);
    },
    
    draw(unit, mount) {
      this.super$draw(unit, mount);
      
      if (unit.mineTile != null && !unit.activelyBuilding()) {
        const swingScl = 12, swingMag = Vars.tilesize / 8;
        const flashScl = 0.3;
        
        const rotation = unit.rotation - 90;
        const weaponRotation = rotation + (this.rotate ? mount.rotation : 0);
        const wx = unit.x + Angles.trnsx(rotation, this.x, this.y) + Angles.trnsx(weaponRotation, 0, -mount.recoil);
        const wy = unit.y + Angles.trnsy(rotation, this.x, this.y) + Angles.trnsy(weaponRotation, 0, -mount.recoil);
        const px = wx + Angles.trnsx(weaponRotation, this.shootX, this.shootY + Mathf.absin(Time.time, 1.1, 0.25));
        const py = wy + Angles.trnsy(weaponRotation, this.shootX, this.shootY + Mathf.absin(Time.time, 1.1, 0.25));
        
        const ex = unit.mineTile.worldx() + Mathf.sin(Time.time + 48, swingScl, swingMag);
        const ey = unit.mineTile.worldy() + Mathf.sin(Time.time + 48, swingScl + 2, swingMag);
        
        Draw.z(Layer.flyingUnit + 0.1);
        Draw.color(Color.lightGray, Color.white, 1 - flashScl + Mathf.absin(Time.time, 0.5, flashScl));
        Drawf.laser(Core.atlas.find("minelaser"), Core.atlas.find("minelaser-end"), px, py, ex, ey, 0.75);
        Draw.color();
      }
    }
  }, object));
}

module.exports = {
  MineWeapon: MineWeapon
};
