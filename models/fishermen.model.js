module.exports = (sequelize, DataTypes) => {
  const Fishermen = sequelize.define("fishermen", {
    FishermenId: {
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
    Occupation: {
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
    LInsuaracneNo: {
      type: DataTypes.STRING,
    },
    MemberOfSoc: {
      type: DataTypes.BOOLEAN,
    },
    MemberNo: {
      type: DataTypes.STRING,
    },
    Children: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    Dependent: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    Sign: {
      type: DataTypes.STRING,
    },
  });
  return Fishermen;
};
