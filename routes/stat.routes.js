const router = require("express").Router();
const db = require("../models");
const Catch = db.catch;
const TripLog = db.triplog;
const User = db.user;
const Owner = db.owner;
const Fishermen = db.fishermen;

router.get("/", async (req, res) => {
  Catch.findAll()
    .then((record) => {
      res.json(record);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

module.exports = router;
