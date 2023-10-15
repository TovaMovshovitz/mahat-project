const { sequelize, DataTypes } = require("./sequelize");
const Tag = sequelize.define(
  "tag",
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
module.exports = Tag;
