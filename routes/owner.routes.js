const router = require("express").Router();
const { boat } = require("../models");
const db = require("../models");
const Owner = db.owner;

router.get("/boat/:id", async (req, res) => {
  Owner.findAll({
    where: {
      OwnerId: req.params.id,
    },
    include: boat,
  })
    .then((Owner) => {
      res.json(Owner);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/", async (req, res) => {
  Owner.findAll()
    .then((Owner) => {
      res.json(Owner);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

// create Owner
router.post("/", (req, res) => {
  Owner.create({
    userUid: req.body.uid,
    FDivision: req.body.FIDivision,
    GNDivision: req.body.GNDivision,
    DSDivision: req.body.DSDivision,
    FDistrict: req.body.FDistrict,
    Surname: req.body.Surname,
    OtherNames: req.body.OtherNames,
    NicNo: req.body.NicNo,
    FZone: req.body.FZone,
    BoatCat: req.body.BoatCat,
    NumofBoats: req.body.NumofBoats,
    OccuType: req.body.OccuType,
    FOpType: req.body.FOpType,
    AssocAct: req.body.AssocAct,
  })
    .then((newOwner) => {
      res.status(201).json(newOwner);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//update a Owner

router.patch("/:id", async (req, res) => {
  Owner.findByPk(req.params.id)
    .then((Owner) => {
      Owner.userUid = req.body.uid;
      Owner.FIDivision = req.body.FIDivision;
      Owner.GNDivision = req.body.GNDivision;
      Owner.DSDivision = req.body.DSDivision;
      Owner.FDistrict = req.body.FDistrict;
      Owner.Surname = req.body.Surname;
      Owner.OtherNames = req.body.OtherNames;
      Owner.NicNo = req.body.NicNo;
      Owner.FZone = req.body.FZone;
      Owner.BoatCat = req.body.BoatCat;
      Owner.NumofBoats = req.body.NumofBoats;
      Owner.OccuType = req.body.OccuType;
      Owner.FOpType = req.body.FOpType;
      Owner.AssocAct = req.body.AssocAct;
      Owner.save().then((updateOwner) => {
        res.json(updateOwner);
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//delete a Owner

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOwner = await Owner.destroy({
      where: {
        OwnerId: id,
      },
    });
    res.status(201).json(deletedOwner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get a Owner

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Owner.findByPk(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/get/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const result = await Owner.findOne({
      where: {
        userUid: uid,
      },
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
