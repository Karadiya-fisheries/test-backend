const router = require("express").Router();
const { owner } = require("../models");
const db = require("../models");
const User = db.user;

router.post("/:id", async (req, res) => {
  User.update(
    { profileUrl: req.body.ProfileUrl },
    { where: { uid: req.params.id } }
  )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err });
    });
});

router.get("/:id", async (req, res) => {
  User.findOne({
    where: {
      uid: req.params.id,
    },
  }).then((user) => {
    res.send(user.profileUrl);
  });
});

module.exports = router;
