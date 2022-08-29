module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("chat", {
    ChatId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    ChatSend: {
      type: DataTypes.STRING,
    },
    ChatReci: {
      type: DataTypes.STRING,
    },
    ChatMes: {
      type: DataTypes.STRING,
    },
  });

  return Chat;
};
