const router = require("express").Router();

const text = "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *";
const values = ["brianc", "brian.m.carlson@gmail.com"];

router.get("/", (req, res) => {
  res.status(200).send("<h1>Fishermen</h1>");
});

module.exports = router;
