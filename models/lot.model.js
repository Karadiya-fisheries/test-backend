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
      type: DataTypes.DECIMAL(10, 2),
    },
    LotSize: {
      type: DataTypes.DECIMAL(10, 2),
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
    FishLoadIndex: {
      type: DataTypes.INTEGER,
    },
  });

  return Lot;
};
