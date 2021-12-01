const router = require("express").Router();
const db = require("../models");
const Departure = db.departure;

router.get("/", async (req, res) => {
    Departure.findAll(
      {order: [ 
        ['departureId']
      ]}
    )
    .then((departure) => {
      res.json(departure);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

// create departure
router.post("/", (req, res) => {
  Departure.create({
    
    imulNumber:req.body.imulNumber,
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    boatId: req.body.boatId
    
  })
    .then((newDeparture) => {
      res.status(201).json(newDeparture);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

// //update a departure

router.put("/:id", async (req, res) => {
  Departure.findByPk(req.params.id)
    .then((departure) => {
      departure.imulNumber = req.body.imulNumber,
      departure.fullName = req.body.fullName,
      departure.phone = req.body.phone,
      departure.email =  req.body.email,
      departure.boatId =  req.body.boatId
      

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