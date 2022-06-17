module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileUrl: { type: DataTypes.STRING },
    confirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return User;
};
