const { sequelize, DataTypes } = require("./sequelize");
const Recipe = sequelize.define(
  "recipe",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    preperingTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    loves: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serves: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Recipe;
