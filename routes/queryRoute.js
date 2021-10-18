const router = require("express").Router();
const querytable = require("../models/query");

router.get("/fishermen", async (req, res) => {
  const text = "SELECT * FROM fishermen WHERE " + req.body.col1 + " = $1";
  const values = [req.body.val1];
  try {
    const results = await querytable(text, values);
    res.json(results);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/boats", async (req, res) => {
  const text = "SELECT * FROM boat WHERE " + req.body.col1 + " = $1";
  const values = [req.body.val1];
  try {
    const results = await querytable(text, values);
    res.json(results);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
