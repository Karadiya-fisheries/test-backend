module.exports = (sequelize, DataTypes) => {
  const Notice = sequelize.define("notice", {
    NoticeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    NoticeTitle: {
      type: DataTypes.STRING,
    },
    NoticeCover: {
      type: DataTypes.STRING,
    },
    NoticeView: {
      type: DataTypes.STRING,
    },
    NoticeCat: {
      type: DataTypes.STRING,
    },
    NoticeText: {
      type: DataTypes.TEXT,
    },
  });

  return Notice;
};
