module.exports = (sequelize, DataTypes) => {
    const Departure = sequelize.define("departure", {
        departureId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      imulNumber : {
            type : DataTypes.STRING,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
     
    });
    return Departure;
  };
  