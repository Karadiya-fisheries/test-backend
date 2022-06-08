const router = require("express").Router();
const db = require("../models");
const Departure = db.departure;
const TripLog = db.triplog;

router.get("/pending/triplog", async (req, res) => {
  TripLog.findAll({
    where: {
      confirm: 0,
    },
  })
    .then((record) => {
      res.json(record);
    })
    .catch((error) => {
      res.status(400).json("message : " + error);
    });
});

router.get("/pending/triplog/count", async (req, res) => {
  TripLog.count({
    where: {
      confirm: 0,
    },
  })
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message : " + error);
    });
});

router.get("/pending/departure", async (req, res) => {
  Departure.findAll({
    where: {
      confirm: 0,
    },
  })
    .then((record) => {
      res.json(record);
    })
    .catch((error) => {
      res.status(400).json("message : " + error);
    });
});

router.get("/pending/departure/count", async (req, res) => {
  Departure.count({
    where: {
      confirm: 0,
    },
  })
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message : " + error);
    });
});

module.exports = router;
