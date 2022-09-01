module.exports = (sequelize, DataTypes) => {
  const Bid = sequelize.define("bid", {
    BidId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    BidPrice: {
      type: DataTypes.STRING,
    },
  });

  return Bid;
};
