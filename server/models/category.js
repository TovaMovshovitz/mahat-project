const { sequelize, DataTypes } = require("./sequelize");
const Category = sequelize.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Category;
