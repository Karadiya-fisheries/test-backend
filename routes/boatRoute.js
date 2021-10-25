const router = require("express").Router();
const db = require("../models");
const Boat = db.boat;
const Fishermen = db.fishermen;
router.get("/", async (req, res) => {
  Boat.findAll()
    .then((boat) => {
      res.json(boat);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

// create boat
router.post("/", (req, res) => {
  Boat.create({
    name: req.body.name,
    FishermenID: req.body.ownerID,
  })
    .then((newboat) => {
      res.status(201).json(newboat);
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
      boat.FishermenID = req.body.ownerID;

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
