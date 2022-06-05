function TeleportBulletType(speed, damage, object) {
  return extend(BasicBulletType, speed, damage, Object.assign({
    xRange: 10,
    yRange: 10,
    rotationRange: 45,
    teleportInterval: 15,
    teleportEffect: Fx.none,
    teleportEffectColor: Color.white,
    
    update(b) {
      this.super$update(b);
      
      b.fdata += Time.delta;
      
      if (b.fdata >= this.teleportInterval) {
        this.teleportEffect.at(b.x, b.y, this.teleportEffectColor);
        b.set(b.x + Mathf.random(-this.xRange, this.xRange), b.y + Mathf.random(-this.yRange, this.yRange));
        b.rotation(b.rotation() + Mathf.random(-this.rotationRange, this.rotationRange));
        
        b.fdata = 0;
      }
    }
  }, object));
}

module.exports = {
  TeleportBulletType: TeleportBulletType
};
