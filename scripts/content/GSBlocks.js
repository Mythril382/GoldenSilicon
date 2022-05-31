const {OnetimeTransformBlock} = require("world/blocks/misc/OnetimeTransformBlock");

exports.load = function() {
  const onetimeTransformer = new OnetimeTransformBlock("onetime-transformer", {
    health: 1000,
    buildVisibility: BuildVisibility.sandboxOnly,
    category: Category.effect
  });
};
