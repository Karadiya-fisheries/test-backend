const db = require("../models");
const Catch = db.catch;

exports.createCatchRecord = (req, res) => {
  Catch.create({
    vesselID: req.body.vesselID,
    skipperID: req.body.skipperID,
    departurePort: req.body.port,
    Date: req.body.date,
    fishType: req.body.fishType,
    harvest: req.body.harvest,
  })
    .then((record) => {
      res.json(record);
    })
    .catch((err) => {
      if (err instanceof Sequelize.ForeignKeyConstraintError) {
        res.status(444).json("Foreign key violated\n" + err);
      }
      if (err instanceof Sequelize.DatabaseError) {
        res.status(444).json("Database Error \n" + err);
      }
    });
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
