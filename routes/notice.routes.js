const router = require("express").Router();
const { user } = require("../models");
const db = require("../models");
const Notice = db.notice;
const User = db.user;

router.get("/", async (req, res) => {
  Notice.findAll({ include: user })
    .then((notice) => {
      res.json(notice);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

router.get("/:id", async (req, res) => {
  Notice.findOne({
    where: {
      NoticeId: req.params.id,
    },
    include: user,
  })
    .then((notice) => {
      res.json(notice);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

router.post("/view/:id", async (req, res) => {
  Notice.update(
    { NoticeView: req.body.NoticeView },
    { where: { NoticeId: req.params.id } }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err });
    });
});

router.post("/cover/:id", async (req, res) => {
  Notice.update(
    { NoticeCover: req.body.NoticeCover },
    { where: { NoticeId: req.params.id } }
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
  Notice.findOne({
    where: {
      NoticeId: req.params.id,
    },
  }).then((notice) => {
    res.send(notice.NoticeCover);
  });
});

// create notice
router.post("/", (req, res) => {
  const uid = req.body.uid;
  User.findOne({
    where: {
      uid: uid,
    },
  })
    .then((user) => {
      Notice.create({
        userUid: user.uid,
        NoticeTitle: req.body.NoticeTitle,
        NoticeCover: req.body.NoticeCover,
        NoticeCat: req.body.NoticeCat,
        NoticeText: req.body.NoticeText,
        NoticeView: req.body.NoticeView,
      })
        .then((newnotice) => {
          res.status(201).json(newnotice);
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//update a notice

router.patch("/:id", async (req, res) => {
  Notice.findByPk(req.params.id)
    .then((notice) => {
      notice.name = req.body.name;
      notice.ownerOwnerID = req.body.ownerID;

      notice.save().then((updatenotice) => {
        res.json(updatenotice);
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//delete a notice

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletednotice = await Notice.destroy({
      where: {
        NoticeId: id,
      },
    });
    res.status(201).json(deletednotice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get a notice

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Notice.findByPk(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
