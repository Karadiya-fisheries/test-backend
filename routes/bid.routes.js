const router = require("express").Router();
const { user, lot, bidder } = require("../models");
const db = require("../models");
const Bidder = db.bidder;
const User = db.user;
const io = require("../index");
const { Op } = require("sequelize");
const bids = db.bid;

router.get("/weekly", async (req, res) => {
  Bidder.findAll({
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
  Bidder.findAll({ include: user })
    .then((Bidder) => {
      res.json(Bidder);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/:id", async (req, res) => {
  Bidder.findOne({
    where: {
      BidderId: req.params.id,
    },
    include: user,
  })
    .then((Bidder) => {
      res.json(Bidder);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// create Bidder
router.post("/", (req, res) => {
  const uid = req.body.uid;
  User.findOne({
    where: {
      uid: uid,
    },
  })
    .then((user) => {
      Bidder.create({
        userUid: user.uid,
        NIC: req.body.nic,
        GNDivision: req.body.GNDivision,
        District: req.body.District,
        TypeOfBusiness: req.body.TypeOfBusiness,
        BusinessName: req.body.BusinessName,
        BusinessURL: req.body.BusinessURL,
      })
        .then((newBidder) => {
          res.status(201).json(newBidder);
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

router.post("/bid", async (req, res) => {
  const lotId = req.body.lotId;
  const bidderId = req.body.bidderId;
  const BidPrice = req.body.bidPrice;

  const lot1 = await lot.findOne({ where: { LotId: lotId } });
  const bidder1 = await bidder.findOne({ where: { BidderId: bidderId } });
  lot1.addBidder(bidder1, { through: { BidPrice: BidPrice } }).then((bid) => {
    lot1.CurrentBid = BidPrice;
    lot1.save().then((updateBidder) => {
      res.json(updateBidder);
    });
  });
});

//update a Bidder

router.patch("/:id", async (req, res) => {
  Bidder.findByPk(req.params.id)
    .then((Bidder) => {
      Bidder.NIC = req.body.nic;
      Bidder.ownerOwnerID = req.body.ownerID;

      Bidder.save().then((updateBidder) => {
        res.json(updateBidder);
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//delete a Bidder

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBidder = await Bidder.destroy({
      where: {
        BidderId: id,
      },
    });
    res.status(201).json(deletedBidder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get a Bidder

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Bidder.findByPk(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
