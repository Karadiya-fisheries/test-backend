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

isBidder = (req, res, next) => {
  User.findByPk(req.userId)
    .then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "bidder") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Bidder Role!",
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

getOwnerID = (req, res, next) => {
  owner
    .findOne({
      where: {
        userUid: req.userId,
      },
    })
    .then((Owner) => {
      req.OwnerId = Owner.OwnerId;
      next();
    })
    .catch((error) => {
      res.status(403).json("message :" + error);
    });
};

isOwnerOrBidder = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user
      .getRoles()
      .then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "owner") {
            next();
            return;
          }

          if (roles[i].name === "bidder") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Owner or Bidder Role!",
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
  isOwnerOrBidder: isOwnerOrBidder,
  getOwnerID: getOwnerID,
};
module.exports = authJwt;
