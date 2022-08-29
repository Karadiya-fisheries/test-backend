const router = require("express").Router();
const { owner, role } = require("../models");
const db = require("../models");
const Catch = db.catch;
const TripLog = db.triplog;
const User = db.user;
const Owner = db.owner;
const Fishermen = db.fishermen;
const Departure = db.departure;
const Boat = db.boat;
const { Op } = require("sequelize");
router.get("/daily/catch", async (req, res) => {
  Catch.findAll({
    where: {
      createdAt: {
        [Op.lte]: new Date(),
        [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000),
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

router.get("/catch/count", async (req, res) => {
  Catch.count()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/user", async (req, res) => {
  User.findAll({ include: role })
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/user/:id", async (req, res) => {
  User.findOne({
    where: {
      uid: req.params.id,
    },
  })
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

// router.delete("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const userDeleted = await User.destroy({
//       where: {
//         uid: id,
//       },
//     });
//     res.status(201).json(userDeleted);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

router.post("/user/:id", async (req, res) => {
  User.update({ confirm: req.body.confirm }, { where: { uid: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err });
    });
});

router.get("/user/count", async (req, res) => {
  User.count()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/fishermen/count", async (req, res) => {
  Fishermen.count()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/boat/count", async (req, res) => {
  Boat.count()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/triplog/count", async (req, res) => {
  TripLog.count()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/departure/count", async (req, res) => {
  Departure.count()
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

module.exports = router;
