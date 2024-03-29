const config = require("../config/db.config.js");
const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");
const { DB } = require("../config/db.config.js");
const triplog = require("./trip.model.js");

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
db.boat = require("./boat.model.js")(sequelize, DataTypes);
db.fishermen = require("./fishermen.model.js")(sequelize, DataTypes);
db.triplog = require("./trip.model.js")(sequelize, DataTypes);
db.departure = require("./departure.model.js")(sequelize, DataTypes);
db.owner = require("./owner.model.js")(sequelize, DataTypes);
db.catch = require("./catch.model")(sequelize, DataTypes);
db.notice = require("./notice.model")(sequelize, DataTypes);
db.activity = require("./activity.model")(sequelize, DataTypes);
db.chat = require("./chat.model")(sequelize, DataTypes);
db.lot = require("./lot.model")(sequelize, DataTypes);
db.bidder = require("./bidder.model")(sequelize, DataTypes);
db.bid = require("./bids.model")(sequelize, DataTypes);
db.notification = require("./notification.model")(sequelize, DataTypes);

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

db.bidder.belongsToMany(db.lot, {
  through: db.bid,
  foreignKey: "bidderId",
  otherKey: "lotId",
});
db.lot.belongsToMany(db.bidder, {
  through: db.bid,
  foreignKey: "lotId",
  otherKey: "bidderId",
});

db.user.hasOne(db.fishermen);
db.fishermen.belongsTo(db.user);

db.user.hasOne(db.owner);
db.owner.belongsTo(db.user);

db.user.hasOne(db.bidder);
db.bidder.belongsTo(db.user);

db.owner.hasMany(db.boat);
db.boat.belongsTo(db.owner);

db.boat.hasMany(db.triplog);
db.triplog.belongsTo(db.boat);

db.triplog.hasMany(db.catch);
db.catch.belongsTo(db.triplog);

db.boat.hasMany(db.departure);
db.departure.belongsTo(db.boat);

db.user.hasMany(db.notice);
db.notice.belongsTo(db.user);

db.user.hasMany(db.activity);
db.activity.belongsTo(db.user);

db.catch.hasMany(db.lot);
db.lot.belongsTo(db.catch);

db.owner.hasMany(db.lot);
db.lot.belongsTo(db.owner);

db.ROLES = ["user", "owner", "officer", "bidder"];

module.exports = db;
