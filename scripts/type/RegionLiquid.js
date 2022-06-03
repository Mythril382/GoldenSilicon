function RegionLiquid(name, color, object) {
  return extend(Liquid, name, color, Object.assign({
    region: "dagger",
    
    drawPuddle(puddle) {
      const amount = puddle.amount, x = puddle.x, y = puddle.y, id = puddle.id;
      const f = Mathf.clamp(amount / (Puddles.maxLiquid / 1.5));
      const smag = puddle.tile.floor().isLiquid ? 0.8 : 0, sscl = 25;
      const length = f * 6;
      
      Draw.color(Tmp.c1.set(this.color).shiftValue(-0.05));
      Draw.rect(Core.atlas.find(this.region), x + Mathf.sin(Time.time + id * 532, sscl, smag), y + Mathf.sin(Time.time + id * 53, sscl, smag), f * 8, f * 8);
      
      Mathf.rand.setSeed(id);
      for (var i = 0; i < 3; i++) {
        Tmp.v1.trns(Mathf.rand.random(360), Mathf.rand.random(length));
        const vx = x + Tmp.v1.x, vy = y + Tmp.v1.y;
        Draw.rect(Core.atlas.find(this.region),
        vx + Mathf.sin(Time.time + i * 532, sscl, smag),
        vy + Mathf.sin(Time.time + i * 53, sscl, smag),
        f * 5, f * 5);
      }
      
      Draw.color();
      
      if (this.lightColor.a > 0.001 && f > 0) {
        Drawf.light(x, y, 30 * f, this.lightColor, this.color.a * f * 0.8);
      }
    }
  }, object));
}

module.exports = {
  RegionLiquid: RegionLiquid
};
