const router = require("express").Router();
const db = require("../models");
const Op = require("sequelize");
const Departure = db.departure;
const TripLog = db.triplog;
const User = db.user;
const Catch = db.catch;

router.get("/user/:id", async (req, res) => {
  User.findByPk(req.params.id).then((user) => {
    user.getRoles().then((roles) => {
      if (!roles[1]) {
        res.status(403).send(false);
        return;
      }
      if (roles[1].name === "owner") {
        res.status(200).send(true);
      } else {
        res.status(403).send(false);
      }
    });
  });
});

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
