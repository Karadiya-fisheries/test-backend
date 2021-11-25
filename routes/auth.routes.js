const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.get("/confirmation/:token", async (req, res) => {
    try {
      jwt.verify(req.params.token, config.email_secret, (err, decoded) => {
        if (err) {
          console.log(err);
        }
        const id = decoded.id;

        User.update({ confirm: true }, { where: { uid: id } })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
            res.status(304).json({ message: err });
          });
      });

      res.redirect("https://karadiya.web.app/login");
      res.end();
    } catch (e) {
      console.log(e);
      res.status(404).json({ error: e });
    }
  });
};
