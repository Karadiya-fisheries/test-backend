const router = require("express").Router();
const { user } = require("../models");
const db = require("../models");
const Fishermen = db.fishermen;

router.get("/user/:id", async (req, res) => {
  Fishermen.findAll({
    where: {
      FishermenId: req.params.id,
    },
    include: user,
  })
    .then((fishermen) => {
      res.json(fishermen);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/", async (req, res) => {
  Fishermen.findAll({
    include: user,
  })
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
    userUid: req.body.uid,
    FIDivision: req.body.FIDivision,
    GNDivision: req.body.GNDivision,
    DSDivision: req.body.DSDivision,
    FDistrict: req.body.FDistrict,
    Surname: req.body.Surname,
    OtherNames: req.body.OtherNames,
    NicNo: req.body.NicNo,
    FZone: req.body.FZone,
    Occupation: req.body.Occupation,
    BoatCat: req.body.BoatCat,
    NumofBoats: req.body.NumofBoats,
    OccuType: req.body.OccuType,
    FOpType: req.body.FOpType,
    AssocAct: req.body.AssocAct,
    LInsuaranceNo: req.body.LInsuaranceNo,
    MemberOfSoc: req.body.MemberOfSoc,
    MemberNo: req.body.MemberNo,
    Children: req.body.Children,
    Dependent: req.body.Dependent,
    Photo: req.body.Photo,
    Sign: req.body.Sign,
  })
    .then((newfishermen) => {
      res.status(201).json(newfishermen);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
        request: err.request,
        response: err.response,
      });
    });
});

//update a fishermen

router.patch("/:id", async (req, res) => {
  Fishermen.findByPk(req.params.id)
    .then((fishermen) => {
      fishermen.userUid = req.body.uid;
      fishermen.FIDivision = req.body.FIDivision;
      fishermen.GNDivision = req.body.GNDivision;
      fishermen.DSDivision = req.body.DSDivision;
      fishermen.FDistrict = req.body.FDistrict;
      fishermen.Surname = req.body.Surname;
      fishermen.OtherNames = req.body.OtherNames;
      fishermen.NicNo = req.body.NicNo;
      fishermen.FZone = req.body.FZone;
      fishermen.Occupation = req.body.Occupation;
      fishermen.BoatCat = req.body.BoatCat;
      fishermen.NumofBoats = req.body.NumofBoats;
      fishermen.OccuType = req.body.OccuType;
      fishermen.FOpType = req.body.FOpType;
      fishermen.AssocAct = req.body.AssocAct;
      fishermen.LInsuaranceNo = req.body.LInsuaranceNo;
      fishermen.MemberOfSoc = req.body.MemberOfSoc;
      fishermen.MemberNo = req.body.MemberNo;
      fishermen.Children = req.body.Children;
      fishermen.Dependent = req.body.Dependent;
      fishermen.Photo = req.body.Photo;
      fishermen.Sign = req.body.Sign;
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

router.get("/get/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const result = await Fishermen.findOne({
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
