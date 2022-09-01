module.exports = (sequelize, DataTypes) => {
  const Lot = sequelize.define("lot", {
    LotId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    LotTitle: {
      type: DataTypes.STRING,
    },
    LotCover: {
      type: DataTypes.STRING,
    },
    LotUnitPrice: {
      type: DataTypes.STRING,
    },
    LotSize: {
      type: DataTypes.STRING,
    },
    CurrentBid: {
      type: DataTypes.INTEGER,
    },
    LotStartDate: {
      type: DataTypes.DATE,
    },
    LotEndDate: {
      type: DataTypes.DATE,
    },
  });

  return Lot;
};
