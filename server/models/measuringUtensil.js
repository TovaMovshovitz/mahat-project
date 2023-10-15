const { sequelize, DataTypes } = require("./sequelize");
const MeasuringUtensil = sequelize.define(
  "measuringUtensil",
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
module.exports = MeasuringUtensil;
