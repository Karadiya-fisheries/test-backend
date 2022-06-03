module.exports = (sequelize, DataTypes) => {
  const CatchRecord = sequelize.define("CatchRecord", {
    CatchId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    FishingDate: {
      type: DataTypes.DATEONLY,
    },
    FishingTime: {
      type: DataTypes.TIME,
    },
    GPSPoint: {
      type: DataTypes.JSONB,
    },
    Catch: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
    },
  });

  return CatchRecord;
};
