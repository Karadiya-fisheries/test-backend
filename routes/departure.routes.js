const router = require("express").Router();
const db = require("../models");
const Departure = db.departure;
const Boat = db.boat;
router.get("/", async (req, res) => {
  Departure.findAll({ order: [["DepartureId"]] })
    .then((departure) => {
      res.json(departure);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

// create departure
router.post("/", (req, res) => {
  Boat.findOne({
    boatId: req.body.BoatId,
  }).then((boat) => {
    Departure.create({
      boatBoatId: boat.boatId,
      Imul: req.body.Imul,
      OwnerName: req.body.OwnerName,
      PhNum: req.body.PhNum,
      Email: req.body.Email,
      SkipperName: req.body.SkipperName,
      SkipperNic: req.body.SkipperNic,
      SkipperNum: req.body.SkipperNum,
      DepartingPort: req.body.DepartingPort,
      FishingZone: req.body.FishingZone,
      MLength: req.body.MLength,
      NoThrons: req.body.NoThrons,
      CNetLength: req.body.CNetLength,
      CEyeSize: req.body.CEyeSize,
      NettingLength: req.body.NettingLength,
      NetEyeSize: req.body.NetEyeSize,
      CrewDetails: req.body.CrewDetails,
      LocalOpLicense: req.body.LocalOpLicense,
      InterOpLicense: req.body.InterOpLicense,
      RadioStation: req.body.RadioStation,
      Frequency: req.body.Frequency,
      VMS: req.body.VMS,
    })
      .then((newDeparture) => {
        res.status(201).json(newDeparture);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  });
});

// //update a departure

router.put("/:id", async (req, res) => {
  Departure.findByPk(req.params.id)
    .then((departure) => {
      (departure.imulNumber = req.body.imulNumber),
        (departure.fullName = req.body.fullName),
        (departure.phone = req.body.phone),
        (departure.email = req.body.email),
        (departure.boatId = req.body.boatId);

      departure.save().then((updateDeparture) => {
        res.json(updateDeparture);
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

// //delete a departure

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDeparture = await Departure.destroy({
      where: {
        departureId: id,
      },
    });
    res.status(201).json(deletedDeparture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get a departure

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Departure.findByPk(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/get/:departureId", async (req, res) => {
  const departureId = req.params.departureId;
  try {
    const result = await Departure.findOne({
      where: {
        departureId: departureId,
      },
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
