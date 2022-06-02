//definitely didn't take from BaseShield class
function AntiSocialFieldAbility(object) {
  return extend(Ability, Object.assign({
    radius: 200,
    sides: 24,
    
    update(unit) {
      this.super$update(unit);
      
      const bulletConsumer = bullet => {
        if (bullet.team != unit.team && bullet.type.absorbable && bullet.within(unit, this.radius)) {
          bullet.absorb();
        }
      };
      
      const unitConsumer = u => {
        const overlapDst = (u.hitSize/2 + this.radius) - u.dst(unit);
        
        if (overlapDst > 0) {
          if (overlapDst > u.hitSize * 1.5) {
            u.kill();
          }else{
            u.vel.setZero();
            
            u.move(Tmp.v1.set(u).sub(unit).setLength(overlapDst + 0.01));
            
            if (Mathf.chanceDelta(0.12 * Time.delta)) {
              Fx.circleColorSpark.at(u.x, u.y, unit.team.color);
            }
          }
        }
      };
      
      Groups.bullet.intersect(unit.x - this.radius, unit.y - this.radius, this.radius * 2, this.radius * 2, bulletConsumer);
      Units.nearbyEnemies(unit.team, unit.x, unit.y, this.radius + 10, unitConsumer);
    },
    
    draw(unit) {
      Draw.z(Layer.shields);
      
      Draw.color(unit.team.color, Color.white, Mathf.clamp(0));
      
      if (Vars.renderer.animateShields) {
        Fill.poly(unit.x, unit.y, this.sides, this.radius);
      }else{
        Lines.stroke(1.5);
        Draw.alpha(0.09 + Mathf.clamp(0));
        Fill.poly(unit.x, unit.y, this.sides, this.radius);
        Draw.alpha(1);
        Lines.poly(unit.x, unit.y, this.sides, this.radius);
        Draw.reset();
      }
      
      Draw.reset();
    },
    
    localized() {
      return Core.bundle.format("ability.antisocialfield", this.radius / Vars.tilesize);
    }
  }, object));
}

module.exports = {
  AntiSocialFieldAbility: AntiSocialFieldAbility
};
