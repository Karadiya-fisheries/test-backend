module.exports = (sequelize, DataTypes) => {
  const Owner = sequelize.define("owner", {
    OwnerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    FIDivision: {
      type: DataTypes.STRING,
    },
    GNDivision: {
      type: DataTypes.STRING,
    },
    DSDivision: {
      type: DataTypes.STRING,
    },
    FDistrict: {
      type: DataTypes.STRING,
    },
    Surname: {
      type: DataTypes.STRING,
    },
    OtherNames: {
      type: DataTypes.STRING,
    },
    NicNo: {
      type: DataTypes.STRING,
    },
    FZone: {
      type: DataTypes.STRING,
    },
    BoatCat: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    NumOfBoats: {
      type: DataTypes.STRING,
    },
    OccuType: {
      type: DataTypes.STRING,
    },
    FOpType: {
      type: DataTypes.STRING,
    },
    AssocAct: {
      type: DataTypes.STRING,
    },
  });
  return Owner;
};
