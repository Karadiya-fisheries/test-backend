const router = require("express").Router();
const { owner } = require("../models");
const db = require("../models");
const Catch = db.catch;
const TripLog = db.triplog;
const User = db.user;
const Owner = db.owner;
const Fishermen = db.fishermen;
const Departure = db.departure;
const Boat = db.boat;

router.get("/catch/count", async (req, res) => {
  Catch.count()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/user", async (req, res) => {
  User.findAll()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/user/count", async (req, res) => {
  User.count()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/fishermen/count", async (req, res) => {
  Fishermen.count()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/boat/count", async (req, res) => {
  Boat.count()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/triplog/count", async (req, res) => {
  TripLog.count()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/departure/count", async (req, res) => {
  Departure.count()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

module.exports = router;
