const router = require("express").Router();
const db = require("../models");
const Chat = db.chat;

const { Op } = require("sequelize");
router.post("/", async (req, res) => {
  const sid = req.body.sid.toString();
  const rid = req.body.rid;
  Chat.findAll({
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            {
              ChatReci: sid,
            },
            {
              ChatSend: rid,
            },
          ],
        },
        {
          [Op.and]: [
            {
              ChatReci: rid,
            },
            {
              ChatSend: sid,
            },
          ],
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
