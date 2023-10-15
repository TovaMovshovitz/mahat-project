const { Sequelize } = require("sequelize");
const { sequelize } = require("./sequelize");
const { applyExtraSetup } = require("./extra-setup");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//********************MODELS*************************//
db.tag = require("./tag");
db.ingredient = require("./ingredient");
db.category = require("./category");
db.recipeIngredient = require("./recipeIngredient");
db.measuringUtensil = require("./measuringUtensil");
db.recipe = require("./recipe");
db.step = require("./step");
db.user = require("./user");
//********************END MODELS*********************//
applyExtraSetup();

db.sequelize
  .sync({ alter: false })
  // db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("yes re-sync done!");
  });
module.exports = db;
