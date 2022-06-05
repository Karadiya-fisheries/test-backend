const router = require("express").Router();
const db = require("../models");
const TripLog = db.triplog;
const Boat = db.boat;

router.get("/", async (req, res) => {
  TripLog.findAll()
    .then((record) => {
      res.json(record);
    })
    .TripLog((error) => {
      res.status(400).json("message :" + error);
    });
});

// create TripLog
router.post("/", (req, res) => {
  Boat.findOne({
    boatId: req.body.boatID,
  }).then((boat) => {
    TripLog.create({
      boatBoatId: boat.boatId,
      WesselID: req.body.WesselID,
      SkipperID: req.body.SkipperID,
      Harbor: req.body.Harbor,
      DepartureDate: req.body.DepartureDate,
      DepartureTime: req.body.DepartureTime,
      GearType: req.body.GearType,
      MainLine: req.body.MainLine,
      BranchLine: req.body.BranchLine,
      HookNo: req.body.HookNo,
      HookTypes: req.body.HookTypes,
      Depth: req.body.Depth,
      Bait: req.body.Bait,
    })
      .then((newboat) => {
        res.status(201).json(newboat);
      })
      .TripLog((err) => {
        res.status(400).json({ message: err.message });
      });
  });
});

//update a

router.patch("/:id", async (req, res) => {
  TripLog.findByPk(req.params.id)
    .then((record) => {
      record.name = req.body.name;
      record.FishermenID = req.body.ownerID;

      record.save().then((updatetriplog) => {
        res.json(updatetriplog);
      });
    })
    .TripLog((err) => {
      res.status(400).json({ message: err.message });
    });
});

//delete a TripLog

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedboat = await TripLog.destroy({
      where: {
        fishermenId: id,
      },
    });
    res.status(201).json(deletedboat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get a TripLog

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await TripLog.findByPk(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
