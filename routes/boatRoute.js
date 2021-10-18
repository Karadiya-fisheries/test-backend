const router = require("express").Router();
const inserttable = require("../models/insert");
const readtable = require("../models/read");
const deletetable = require("../models/delete");
const querytable = require("../models/query");
const updatetable = require("../models/update");

router.get("/", async (req, res) => {
  const query = `SELECT * FROM boat`;
  try {
  } catch (error) {
    res.status(400).json("message :" + error);
  }
  const rows = await readtable(query);
  res.json(rows);
});

// create boat
router.post("/", async (req, res) => {
  const text =
    "INSERT INTO boat(owner_id, boat_id ,name, reg_data) VALUES($1, $2, $3, $4) RETURNING *";
  const values = [
    req.body.owner_id,
    req.body.boat_id,
    req.body.name,
    req.body.reg_data,
  ];

  try {
    const newboat = await inserttable(text, values);
    res.status(201).json(newboat.rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update a boat

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { owner_id, name, reg_data } = req.body;
  const text =
    "UPDATE boat SET owner_id = $1,name = $2,reg_data = $3 WHERE boat_id = $4 RETURNING *";
  const values = [owner_id, name, reg_data, id];
  try {
    const updateboat = await updatetable(text, values);
    res.json(updateboat.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a boat

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const text = "DELETE FROM boat WHERE boat_id = $1 RETURNING *";
  const values = [id];
  try {
    const deletedboat = await deletetable(text, values);
    res.status(201).json(deletedboat.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a boat

router.get("/:id", async (req, res) => {
  const values = [req.params.id];
  const text = "SELECT * FROM boat WHERE boat_id = $1";
  try {
    const result = await querytable(text, values);
    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
