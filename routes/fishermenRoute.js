const router = require("express").Router();
const inserttable = require("../models/insert");
const readtable = require("../models/read");

router.get("/", async (req, res) => {
  const query = `SELECT * FROM users`;
  const rows = await readtable(query);
  res.json(rows);
});

router.post("/", (req, res) => {
  const text =
    "INSERT INTO users(user_id ,fishermen_id ,lastname, age) VALUES($1, $2, $3, $4) RETURNING *";
  const values = [
    req.body.user_id,
    req.body.fishermen_id,
    req.body.lastname,
    req.body.age,
  ];
  try {
    inserttable(text, values);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
