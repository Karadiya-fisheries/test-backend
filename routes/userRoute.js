const router = require("express").Router();
const inserttable = require("../models/insert");
const querytable = require("../models/query");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const gernerateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

router.post("/signup", async (req, res, next) => {
  let { fullname, email, phone, nic, pass } = req.body;
  const password = gernerateHash(pass);
  var text = "SELECT * FROM users WHERE email = $1";
  var values = [email];
  querytable(text, values).then((results) => {
    console.log(results);

    if (results.length > 0) {
      return res
        .status(404)
        .json({ register: "register", message: "Email already registered" });
    } else {
      const text =
        "INSERT INTO users(fullname ,email, phone , nic , pass) VALUES($1, $2, $3 , $4, $5) RETURNING *";
      const values = [fullname, email, phone, nic, password];
      return inserttable(text, values).then((result) => {
        newUser = result.rows[0];
        passport.authenticate("local", {
          successRedirect: "/",
          failureRedirect: "/signup",
          failureFlash: true,
        })(req, res, next);
      });
    }
  });
});

module.exports = router;
