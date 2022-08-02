module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define("activity", {
    ActivityId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    ActivityTitle: {
      type: DataTypes.STRING,
    },
  });

  return Activity;
};
