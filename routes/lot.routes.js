const router = require("express").Router();
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const db = require("../models");
const Lot = db.lot;
const User = db.user;
const io = require("../index");
const { Op } = require("sequelize");
const Catch = db.catch;
const Owner = db.owner;

router.get("/weekly", async (req, res) => {
  Lot.findAll({
    where: {
      createdAt: {
        [Op.lte]: new Date(),
        [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  })
    .then((record) => {
      res.json(record);
    })
    .catch((error) => {
      res.status(400).json("message : " + error);
    });
});

router.get("/", async (req, res) => {
  Lot.findAll()
    .then((Lot) => {
      res.json(Lot);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/:id", async (req, res) => {
  Lot.findOne({
    where: {
      LotId: req.params.id,
    },
    include: [Owner, Catch],
  })
    .then((Lot) => {
      res.json(Lot);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

router.post("/cover/:id", async (req, res) => {
  Lot.update(
    { LotCover: req.body.LotCover },
    { where: { LotId: req.params.id } }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err });
    });
});

router.get("/cover/:id", async (req, res) => {
  Lot.findOne({
    where: {
      LotId: req.params.id,
    },
  }).then((Lot) => {
    res.send(Lot.LotCover);
  });
});

// create Lot
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isOwner, authJwt.getOwnerID],
  (req, res) => {
    Lot.create({
      LotTitle: req.body.LotTitle,
      LotCover: req.body.LotCover,
      LotUnitPrice: req.body.LotUnitPrice,
      LotSize: req.body.LotSize,
      CurrentBid: req.body.CurrentBid,
      LotStartDate: req.body.LotStartDate,
      LotEndDate: req.body.LotEndDate,
      CatchRecordCatchId: req.body.CatchId,
      ownerOwnerID: req.OwnerId,
    })
      .then((newLot) => {
        res.status(201).json(newLot);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  }
);

//update a Lot

router.patch("/:id", async (req, res) => {
  Lot.findByPk(req.params.id)
    .then((Lot) => {
      Lot.name = req.body.name;
      Lot.ownerOwnerID = req.body.ownerID;

      Lot.save().then((updateLot) => {
        res.json(updateLot);
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//delete a Lot

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLot = await Lot.destroy({
      where: {
        LotId: id,
      },
    });
    res.status(201).json(deletedLot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get a Lot

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Lot.findByPk(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
