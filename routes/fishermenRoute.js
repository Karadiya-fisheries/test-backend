const router = require("express").Router();
const inserttable = require("../models/insert");
const readtable = require("../models/read");
const deletetable = require("../models/delete");
const querytable = require("../models/query");
const updatetable = require("../models/update");

router.get("/", async (req, res) => {
  const query = `SELECT * FROM fishermen`;
  try {
  } catch (error) {
    res.status(400).json("message :" + error);
  }
  const rows = await readtable(query);
  res.json(rows);
});

// create fishermen
router.post("/", async (req, res) => {
  const text =
    "INSERT INTO fishermen(user_id ,fishermen_id ,lastname, age) VALUES($1, $2, $3, $4) RETURNING *";
  const values = [
    req.body.user_id,
    req.body.fishermen_id,
    req.body.lastname,
    req.body.age,
  ];

  try {
    const newfishermen = await inserttable(text, values);
    res.status(201).json(newfishermen.rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update a fishermen

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { fishermen_id, lastname, age } = req.body;
  const text =
    "UPDATE fishermen SET fishermen_id = $1,lastname = $2,age = $3 WHERE user_id = $4 RETURNING *";
  const values = [fishermen_id, lastname, age, id];
  try {
    const updateFishermen = await updatetable(text, values);
    res.json(updateFishermen.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a fishermen

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const text = "DELETE FROM fishermen WHERE user_id = $1 RETURNING *";
  const values = [id];
  try {
    const deletedFishermen = await deletetable(text, values);
    res.status(201).json(deletedFishermen.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a fishermen

router.get("/:id", async (req, res) => {
  const values = [req.params.id];
  const text = "SELECT * FROM fishermen WHERE user_id = $1";
  try {
    const result = await querytable(text, values);
    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
