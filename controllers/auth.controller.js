const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const { user } = require("../models");

exports.signup = (req, res) => {
  // Save User to Database
  // async email

  User.create({
    fullname: req.body.fullname,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      jwt.sign(
        {
          id: user.uid,
        },
        config.email_secret,
        {
          expiresIn: "1d",
        },
        (err, emailToken) => {
          const url = `http://localhost:5000/confirmation/${emailToken}`;

          config.transporter.sendMail(
            {
              from: "7tharindugalle@gmail.com",
              to: user.email,
              subject: "Confirm Email - Karadiya",
              html: `
              <h2>E-Mail account confirmation</h2>
              <p>This email was sent because you signed up for Karadya fisheires. Before you signed in, you need to confirm the email address you 've given us in your registration</p>
              Please click this link to confirm your email: <a href="${url}">${url}</a>
              `,
            },
            (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log("Message %s sent: %s", info.messageId, info.response);
            }
          );
        }
      );
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (!user.confirm) {
        return res
          .status(404)
          .send({ message: "Please Confirm email before login" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          uid: user.uid,
          phone: user.phone,
          fullname: user.fullname,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
