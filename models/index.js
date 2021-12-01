const config = require("../config/db.config.js");
const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const { DB } = require("../config/db.config.js");

// const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
//   host: config.HOST,
//   dialect: config.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: config.pool.max,
//     min: config.pool.min,
//     acquire: config.pool.acquire,
//     idle: config.pool.idle,
//   },
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  ssl: true,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.role = require("./role.model.js")(sequelize, DataTypes);
db.boat = require("./boat.model")(sequelize, DataTypes);
db.fishermen = require("./fishermen.model")(sequelize, DataTypes);
db.catch = require("./catch.model")(sequelize, DataTypes);
db.departure = require("./departure.model")(sequelize, DataTypes);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.user.hasOne(db.fishermen, {
  foreignKey: "uid",
});

db.fishermen.belongsTo(db.user, {
  foreignKey: "uid",
});

db.fishermen.hasMany(db.boat, {
  foreignKey: "FishermenID",
});

db.boat.belongsTo(db.fishermen, {
  foreignKey: "FishermenID",
});

db.catch.belongsTo(db.boat);
db.fishermen.hasMany(db.catch);
db.catch.belongsTo(db.fishermen);
db.boat.hasMany(db.catch);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
