module.exports = (sequelize, DataTypes) => {
  const Boat = sequelize.define("boat", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });

  return Boat;
};
