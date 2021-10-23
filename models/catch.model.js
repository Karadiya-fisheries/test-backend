module.exports = (sequelize, DataTypes) => {
  const Catch = sequelize.define("catch", {
    catchId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    departurePort: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fishType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    harvest: {
      type: DataTypes.INTEGER,
    },
  });

  return Catch;
};
