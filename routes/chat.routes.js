const router = require("express").Router();
const db = require("../models");
const Chat = db.chat;

const { Op } = require("sequelize");
router.post("/", async (req, res) => {
  const sid = req.body.sid.toString();
  Chat.findAll({
    where: {
      [Op.and]: [
        {
          ChatReci: {
            [Op.or]: [sid, req.body.rid],
          },
        },
        {
          ChatSend: {
            [Op.or]: [sid, req.body.rid],
          },
        },
      ],
    },
  })
    .then((count) => {
      res.json(count);
    })
    .catch((error) => {
      res.status(400).json("message :" + error);
    });
});

module.exports = router;
