const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {
  console.log(sequelize.models);
  const {
    tag,
    ingredient,
    category,
    recipeIngredient,
    measuringUtensil,
    recipe,
    step,
    user,
  } = sequelize.models;

  //-----one-to-many-----
  user.hasMany(recipe, { onDelete: "CASCADE" });
  recipe.belongsTo(user);

  recipe.hasMany(step, { onDelete: "CASCADE" });
  step.belongsTo(recipe);

  recipeIngredient.belongsTo(measuringUtensil);
  measuringUtensil.hasMany(recipeIngredient, { onDelete: "CASCADE" });

  recipeIngredient.belongsTo(ingredient);
  ingredient.hasMany(recipeIngredient, { onDelete: "CASCADE" });

  //-----many-to-many-----
  recipe.hasMany(recipeIngredient, { onDelete: "CASCADE" });
  recipeIngredient.belongsTo(recipe);

  recipe.belongsToMany(category, { through: "recipeCategory" });
  category.belongsToMany(recipe, { through: "recipeCategory" });

  recipe.belongsToMany(tag, { through: "recipeTag" });
  tag.belongsToMany(recipe, { through: "recipeTag" });
};

module.exports = { applyExtraSetup };
