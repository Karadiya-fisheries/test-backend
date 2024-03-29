const router = require("express").Router();
const { owner } = require("../models");
const db = require("../models");
const Boat = db.boat;
const Owner = db.owner;

router.get("/", async (req, res) => {
  Boat.findAll()
    .then((boat) => {
      res.json(boat);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/owner/:id", async (req, res) => {
  Boat.findAll({
    where: {
      ownerOwnerId: req.params.id,
    },
  })
    .then((boat) => {
      res.json(boat);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

// create boat
router.post("/", (req, res) => {
  const owner_id = req.body.owner_id;
  Owner.findOne({
    where: {
      OwnerId: owner_id,
    },
  })
    .then((owner) => {
      Boat.create({
        ownerOwnerId: owner.OwnerId,
        BoatName: req.body.BoatName,
        BoatRg: req.body.BoatRg,
        BoatType: req.body.BoatType,
        InsuaranceNO: req.body.InsuaranceNO,
        FOpType: req.body.FOpType,
      })
        .then((newboat) => {
          res.status(201).json(newboat);
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//update a boat

router.patch("/:id", async (req, res) => {
  Boat.findByPk(req.params.id)
    .then((boat) => {
      boat.name = req.body.name;
      boat.ownerOwnerID = req.body.ownerID;

      boat.save().then((updateboat) => {
        res.json(updateboat);
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//delete a boat

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedboat = await Boat.destroy({
      where: {
        boatId: id,
      },
    });
    res.status(201).json(deletedboat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get a boat

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Boat.findByPk(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
