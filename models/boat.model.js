module.exports = (sequelize, DataTypes) => {
  const Boat = sequelize.define("boat", {
    boatId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    BoatName: {
      type: DataTypes.STRING,
    },
    BoatRg: {
      type: DataTypes.STRING,
    },
    BoatType: {
      type: DataTypes.STRING,
    },
    InsuaranceNO: {
      type: DataTypes.STRING,
    },
    FOpType: {
      type: DataTypes.STRING,
    },
  });

  return Boat;
};
