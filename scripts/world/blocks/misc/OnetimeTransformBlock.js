const GSVars = require("GSVars");

function OnetimeTransformBlock(name, object) {
  const block = extend(Block, name, Object.assign({
    update: true,
    solid: true,
    size: 1,
    deatructible: true,
    configurable: true,
    saveConfig: false,
    transformEffect: Fx.blastExplosion,
    failEffect: Fx.unitEnvKill
  }, object));
  
  block.buildType = () => extend(Building, {
    buildConfiguration(table) {
      table.button(Icon.pencil, Styles.cleari, () => {
        //totally didn't steal from MessageBlock.java
        const dialog = new BaseDialog("@transformto");
        dialog.setFillParent(false);
        const a = dialog.cont.add(new TextArea("")).size(380, 160).get();
        dialog.cont.row();
        dialog.buttons.button("@ok", () => {
          if (a.getText() == "OnetimeTransformer Code Enable") {
            GSVars.enableCodeOTT = true;
          }
          const blockTransform = Vars.content.block(a.getText());
          if (blockTransform == null) {
            block.failEffect.at(this);
          }else{
            block.transformEffect.at(this);
            Vars.world.tile(this.tile.x, this.tile.y).setNet(blockTransform, this.team, this.rotation);
          }
          dialog.hide();
        }).size(130, 60);
        dialog.update(() => {
          if (this.tile.build != this) {
            dialog.hide();
          }
        });
        dialog.closeOnBack();
        dialog.show();
        this.deselect();
      }).size(40);
    },
    
    onConfigureBuildTapped(other) {
      if (this == other) {
        this.deselect();
        return false;
      }
      
      return true;
    }
  });
  
  return block;
}

module.exports = {
  OnetimeTransformBlock: OnetimeTransformBlock
};
