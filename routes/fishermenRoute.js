const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("<h1>fishermen</h1");
});

module.exports = router;
