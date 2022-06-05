module.exports = (sequelize, DataTypes) => {
  const Departure = sequelize.define("departure", {
    DepartureId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Imul: {
      type: DataTypes.STRING,
    },
    OwnerName: {
      type: DataTypes.STRING,
    },
    TelNo: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    SkipperName: {
      type: DataTypes.STRING,
    },
    SkipperNic: {
      type: DataTypes.STRING,
    },
    SkipperNo: {
      type: DataTypes.STRING,
    },
    DepartingPort: {
      type: DataTypes.STRING,
    },
    FishingZone: {
      type: DataTypes.STRING,
    },
    MLength: {
      type: DataTypes.STRING,
    },
    NoThrons: {
      type: DataTypes.STRING,
    },
    CNetLength: {
      type: DataTypes.STRING,
    },
    CEyeSize: {
      type: DataTypes.STRING,
    },
    NettingLength: {
      type: DataTypes.STRING,
    },
    NetEyeSize: {
      type: DataTypes.STRING,
    },
    CrewDetails: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    LocalOpLicense: {
      type: DataTypes.STRING,
    },
    InterOpLicense: {
      type: DataTypes.STRING,
    },
    RadioStation: {
      type: DataTypes.STRING,
    },
    Frequency: {
      type: DataTypes.STRING,
    },
    Vms: {
      type: DataTypes.BOOLEAN,
    },
    confirm: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  return Departure;
};
