const router = require("express").Router();
const inserttable = require("../models/insert");
const readtable = require("../models/read");
const deletetable = require("../models/delete");
const querytable = require("../models/query");

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

//update a todo

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fishermen_id } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE fishermen_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const text = "DELETE FROM fishermen WHERE user_id = $1 Returning *";
  const values = [id];
  try {
    const deletedFishermen = await deletetable(text, values);
    res.status(201).json(deletedFishermen.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = ("SELECT * FROM todo WHERE todo_id = $1", [id]);
  try {
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
