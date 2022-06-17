const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isOfficer = (req, res, next) => {
  User.findByPk(req.userId)
    .then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "officer") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Officer Role!",
        });
        return;
      });
    })
    .catch((err) => {
      res.status(444).json({ message: err });
    });
};

isOwner = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "owner") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Owner Role!",
      });
    });
  });
};

isOwnerOrOfficer = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user
      .getRoles()
      .then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "owner") {
            next();
            return;
          }

          if (roles[i].name === "officer") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Owner or Officer Role!",
        });
      })
      .catch((err) => {
        res.status(444).json({ message: err });
      });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isOfficer: isOfficer,
  isOwner: isOwner,
  isOwnerOrOfficer: isOwnerOrOfficer,
};
module.exports = authJwt;
