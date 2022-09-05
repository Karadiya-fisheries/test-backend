const router = require("express").Router();
const db = require("../models");
const Catch = db.catch;
const TripLog = db.triplog;

router.get("/", async (req, res) => {
  Catch.findAll()
    .then((record) => {
      res.json(record);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

// create catch
router.post("/", (req, res) => {
  TripLog.findOne({
    where: { tripId: req.body.tripId },
  }).then((log) => {
    Catch.create({
      triplogTripId: log.tripId,
      FishingDate: req.body.FishingDate,
      FishingTime: req.body.FishingTime,
      GPSPoint: req.body.GPSPoint,
      Catch: req.body.Catch,
    })
      .then((newlog) => {
        res.status(201).json(newlog);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  });
});

//update a

router.patch("/:id", async (req, res) => {
  Catch.findByPk(req.params.id)
    .then((record) => {
      record.name = req.body.name;
      record.FishermenID = req.body.ownerID;

      record.save().then((updatecatch) => {
        res.json(updatecatch);
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//delete a catch

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedboat = await Catch.destroy({
      where: {
        CatchId: id,
      },
    });
    res.status(201).json(deletedboat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get a catch

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Catch.findByPk(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
