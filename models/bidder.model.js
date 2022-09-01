module.exports = (sequelize, DataTypes) => {
  const Bidder = sequelize.define("bidder", {
    BidderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    NIC: {
      type: DataTypes.STRING,
    },
    GNDivision: {
      type: DataTypes.STRING,
    },
    District: {
      type: DataTypes.STRING,
    },
    TypeOfBusiness: {
      type: DataTypes.STRING,
    },
    BusinessName: {
      type: DataTypes.STRING,
    },
    BusinessURL: {
      type: DataTypes.STRING,
    },
  });
  return Bidder;
};
