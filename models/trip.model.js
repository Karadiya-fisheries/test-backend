module.exports = (sequelize, DataTypes) => {
  const TripLog = sequelize.define("triplog", {
    tripId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    SkipperID: {
      type: DataTypes.STRING,
    },
    WesselID: {
      type: DataTypes.STRING,
    },
    Harbor: {
      type: DataTypes.STRING,
    },
    DepartureDate: {
      type: DataTypes.DATEONLY,
    },
    DepartureTime: {
      type: DataTypes.TIME,
    },
    GearType: {
      type: DataTypes.STRING,
    },
    MainLine: {
      type: DataTypes.STRING,
    },
    BranchLine: {
      type: DataTypes.STRING,
    },
    HookNo: {
      type: DataTypes.STRING,
    },
    HookType: {
      type: DataTypes.STRING,
    },
    Depth: {
      type: DataTypes.STRING,
    },
    Bait: {
      type: DataTypes.STRING,
    },
    confirm: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return TripLog;
};
