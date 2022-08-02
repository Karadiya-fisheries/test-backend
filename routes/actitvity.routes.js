const router = require("express").Router();
const { user } = require("../models");
const db = require("../models");
const Activity = db.activity;
const User = db.user;

router.get("/", async (req, res) => {
  Activity.findAll({ include: user })
    .then((activity) => {
      res.json(activity);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/:id", async (req, res) => {
  Activity.findAll({
    where: {
      userUid: req.params.id,
    },
  })
    .then((Activity) => {
      res.json(Activity);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// create Activity
router.post("/", (req, res) => {
  const uid = req.body.uid;
  User.findOne({
    where: {
      uid: uid,
    },
  })
    .then((user) => {
      Activity.create({
        userUid: user.uid,
        ActivityTitle: req.body.ActivityTitle,
      })
        .then((newActivity) => {
          res.status(201).json(newActivity);
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//update a Activity

router.patch("/:id", async (req, res) => {
  Activity.findByPk(req.params.id)
    .then((Activity) => {
      Activity.name = req.body.name;
      Activity.ownerOwnerID = req.body.ownerID;

      Activity.save().then((updateActivity) => {
        res.json(updateActivity);
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//delete a Activity

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedActivity = await Activity.destroy({
      where: {
        ActivityId: id,
      },
    });
    res.status(201).json(deletedActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get a Activity

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Activity.findByPk(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
