const router = require("express").Router();
const db = require("../models");
const Fishermen = db.fishermen;

router.get("/", async (req, res) => {
  Fishermen.findAll()
    .then((fishermen) => {
      res.json(fishermen);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

// create fishermen
router.post("/", (req, res) => {
  Fishermen.create({
    fullname: req.body.fullname,
    address: req.body.address,
    age: req.body.age,
    nic: req.body.nic,
    role: req.body.role,
  })
    .then((newfishermen) => {
      res.status(201).json(newfishermen);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//update a fishermen

router.patch("/:id", async (req, res) => {
  Fishermen.findByPk(req.params.id)
    .then((fishermen) => {
      fishermen.fullname = req.body.fullname;
      fishermen.address = req.body.address;
      fishermen.age = req.body.age;
      fishermen.nic = req.body.nic;
      fishermen.role = req.body.role;

      fishermen.save().then((updateFishermen) => {
        res.json(updateFishermen);
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//delete a fishermen

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFishermen = await Fishermen.destroy({
      where: {
        fishermenId: id,
      },
    });
    res.status(201).json(deletedFishermen);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get a fishermen

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Fishermen.findByPk(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
