const {AntiSocialFieldAbility} = require("entities/abilities/AntiSocialFieldAbility");
const GSAchievements = require("content/GSAchievements");
const GSVars = require("GSVars");

exports.load = function() {
  var ability1 = new AntiSocialFieldAbility({
    radius: 100
  });
  
  var invalidDialog = new Dialog();
  invalidDialog.cont.add("@code.invalid").row();
  invalidDialog.buttons.button("@ok", () => {
    invalidDialog.hide();
  });
  
  var successDialog = new Dialog();
  successDialog.cont.add("@code.success").row();
  successDialog.buttons.button("@ok", () => {
    successDialog.hide();
  });
  
  var appExitDialog = new Dialog();
  appExitDialog.cont.add("@code.appexit").row();
  appExitDialog.buttons.button("@ok", () => {
    appExitDialog.hide();
    Core.app.exit();
  });
  
  var berylliusDialog = new Dialog();
  berylliusDialog.cont.add("@code.beryllius").row();
  berylliusDialog.buttons.button("@the", () => {
    berylliusDialog.hide();
  }).width(80);
  
  Vars.ui.settings.addCategory("@setting.golden-silicon", "golden-silicon-golden-silicon", t => {
    t.areaTextPref("golden-silicon-enter-code", "", s => {
      switch(s) {
        case "what is quit":
          appExitDialog.show();
          break;
        case "gamma anti-social real":
          UnitTypes.gamma.abilities.add(ability1);
          successDialog.show();
          break;
        case "beryllius":
          Core.atlas.getRegions().each(r => r.set(Core.atlas.find("item-beryllium")));
          berylliusDialog.show();
          break;
        case "access the balls":
          Vars.content.planets().each(p => p.alwaysUnlocked = true);
          successDialog.show();
          break;
        case "codeOTTAchieve":
          if (GSVars.enableCodeOTT && Vars.state.isCampaign()) {
            GSAchievements.array.get(2).completeNow();
          }else{
            invalidDialog.show();
          }
          break;
        default:
          invalidDialog.show();
      }
    });
    
    t.pref(extend(SettingsMenuDialog.SettingsTable.Setting, "golden-silicon-achievements", {
      add(table) {
        this.addDesc(table.button("@setting.golden-silicon-achievements.name", () => {
          const dialogA = new BaseDialog("@setting.golden-silicon-achievements.name");
          GSAchievements.array.each(a => {
            dialogA.buttons.button(a.isCompleted() ? a.localizedName : "[lightgray]???", a.isCompleted() ? Icon.lockOpen : Icon.lock, () => {
              const dialogB = new BaseDialog(a.isCompleted() ? a.localizedName : "???");
              dialogB.cont.image(a.isCompleted() ? a.icon : Core.atlas.find("alpha-bg")).row();
              dialogB.cont.add(a.isCompleted() ? "[accent]" + a.localizedName : "[lightgray]???").row();
              dialogB.cont.add(a.isCompleted() ? a.description : "[lightgray]???");
              dialogB.addCloseButton();
              dialogB.show();
            }).growX().row();
          });
          dialogA.buttons.button("@achievement.golden-silicon-reset", () => {
            const dialogB = new Dialog();
            dialogB.cont.add("@achievement.golden-silicon-confirm-reset").row();
            dialogB.buttons.button("@yes", Icon.ok, () => {
              GSAchievements.array.each(a => a.uncompleteNow());
              dialogB.hide();
              dialogA.hide();
            }).width(150);
            dialogB.buttons.button("@no", Icon.cancel, () => {
              dialogB.hide();
            }).width(150);
            dialogB.show();
          }).growX().row();
          dialogA.addCloseButton();
          dialogA.show();
        }).width(180).get());
      }
    }));
  });
};
