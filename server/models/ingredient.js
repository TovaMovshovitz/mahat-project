const { sequelize, DataTypes } = require("./sequelize");
const Ingredient = sequelize.define(
  "ingredient",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    img: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Ingredient;
