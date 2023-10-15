const { sequelize, DataTypes } = require("./sequelize");
const Step = sequelize.define(
  "step",
  {
    direction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Step;
