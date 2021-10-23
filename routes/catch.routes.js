const router = require("express").Router();
const db = require("../models");
const Catch = db.catch;

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
  Catch.create({
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

//update a catch

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
        fishermenId: id,
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
