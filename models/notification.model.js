module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("notification", {
    NotificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    NotificationTitle: {
      type: DataTypes.STRING,
    },
    NotificationDSC: {
      type: DataTypes.STRING,
    },
    NotificationType: {
      type: DataTypes.STRING,
    },
  });

  return Notification;
};
